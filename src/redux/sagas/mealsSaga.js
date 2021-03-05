import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addMeal(action){
    let meal = action.payload.newMeal;
    let trip_id = action.payload.trip_id;
    console.log(action.payload);
    
    try {
        yield axios({
            method: 'POST',
            url: `/api/meals/${trip_id}`,
            data: meal
        })
        yield put({ type: 'GET_MEALS', payload: trip_id });
    }
    catch (error) {
        console.log(error);
    }
}

function* getMeals(action){
    console.log(action.payload);
    
    let trip_id = action.payload;
    let response = yield axios({
        method: 'GET',
        url: `/api/meals/${trip_id}` 
    })
    let meals = [];
    let meal = {};
    let ingredients = [];
    let rows = response.data;
    let sortedMeals;
    console.log(rows);
    if(rows.length > 0){
        let meal_id = rows[0].meal_id;
        for(let i = 0; i < rows.length; i++){
            if(rows[i].meal_id == meal_id){
                // console.log(rows[i].meal_id);
                // console.log(rows[i]);
                ingredients.push({name: rows[i].ingredient, id: rows[i].ingredient_id})
                // console.log(meal.ingredients);
                
                // day: 3
                // ingredient: "Cheese"
                // ingredient_id: 5
                // meal: 3
                // meal_id: 17
                // name: "tacos"
            }
            else{
                //setting the name, id, day, and meal of the meal object
                meal = { 
                            id:rows[i - 1].meal_id,
                            name: rows[i - 1].name,
                            day: rows[i - 1].day,
                            meal: rows[i - 1].meal,
                            ingredients: ingredients
                        }
                console.log(meal);
                //add to meals array
                meals.push(meal);
                //clearing out hte ingredients for the new meal
                ingredients = [];

                meal_id = rows[i].meal_id;
                // console.log(meal_id);
            }
        }
        //make sure to add the final meal to the array
        meal = {
            id: rows[rows.length - 1].meal_id,
            name: rows[rows.length - 1].name,
            day: rows[rows.length - 1].day,
            meal: rows[rows.length - 1].meal,
            ingredients: ingredients
        }
        console.log(meal);
        //add to meals array
        meals.push(meal);
        console.log(meals);

        sortedMeals = mealSorter(meals);
        console.log(sortedMeals);
    }else{
        //if the trip doesn't have any meals planned yet,
        //then we just send an empty array.
        sortedMeals = [];
    }
    yield put ({type:'SET_MEALS', payload: sortedMeals})
}

//this function sorts all of the meals into there specific days
function mealSorter(meals){
    //now loop through meals and sort them into days?
    let meal_day = meals[0].day
    let day = [];
    let sortedMeals = [];
    for (let meal of meals) {
        console.log('day of meal:', meal.day);
        console.log('meal_day:', meal_day);
        if (meal.day == meal_day) {

            day.push(meal);
            console.log('day array after adding:', meal.name, day);

        } else {
            console.log(meal.day);

            sortedMeals.push(day);
            day = [];
            day.push(meal);
            meal_day = meal.day;
            console.log(meal_day);
            
            

        }
    }
    //make sure to push the last day to the sorted array, because it won't be added in the loop.
    sortedMeals.push(day);
    return sortedMeals;
}

function* membersSaga() {
    yield takeLatest('ADD_MEAL', addMeal)
    yield takeLatest('GET_MEALS', getMeals)

}


export default membersSaga;


