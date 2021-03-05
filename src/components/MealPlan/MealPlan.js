import React, { Component } from "react";
import { connect } from "react-redux";
import TripNav from "../TripNav/TripNav";
import { Button, Card, Form, Select, Input } from "semantic-ui-react";
import axios from 'axios';
import MealCard from './MealCard';

class MealPlan extends Component {
    state = {
        addMealToggle: false,
        addIngredientToggle: false,
        newMeal:{
            name:'',
            meal: 1,
            ingredients: [],
            day: 1
        },
        newIngredient: '',
        meals: [
            [
                {
                    name: 'pancakes',
                    day: 2,
                    meal: 1,
                    ingredients: ['batter', 'syrup', 'chocolate chips']
                },
                {
                    name: 'tacos',
                    day: 2,
                    meal: 3,
                    ingredients: ['tortillas', 'beans', 'cheese']
                }
                
            ],
            [
                {
                    name: 'waffles',
                    day: 3,
                    meal: 1,
                    ingredients: ['batter', 'syrup', 'chocolate chips']
                },
                {
                    name: 'burritos',
                    day: 3,
                    meal: 3,
                    ingredients: ['tortillas', 'beans', 'cheese']
                }
                
            ]
        ]
    }
    componentDidMount = () =>{
        this.getMeals();
    }
    addMeal = () =>{
        this.props.dispatch({type: 'ADD_MEAL', payload: {newMeal: this.state.newMeal, trip_id: this.props.reduxState.trip.id}})
        this.setState({
            addMealToggle: !this.state.addMealToggle
        });
    }
    addIngredient = () =>{
       this.setState({
           newMeal:{
               ...this.state.newMeal,
               ingredients: [...this.state.newMeal.ingredients, this.state.newIngredient]
           }
       })       
        
    }
    addMealToggle = () => {        
        this.setState({
            addMealToggle: !this.state.addMealToggle
        });
    };
    addIngredientToggle = () => {
        this.setState({
            addIngredientToggle: !this.state.addIngredientToggle
        });
    };
    getMeals = () =>{
        let trip_id = this.props.reduxState.trip.id;
        this.props.dispatch({type: 'GET_MEALS', payload: trip_id})
    }
    handleNewMealChange = (event, type) =>{
        this.setState({
            newMeal:{
                ...this.state.newMeal,
                [type]: event.target.value
            }
        })
    }
    //why does this only work if I pass event? even though I'm not using event
    handleMealSelectChange = (event, {value}) =>{        
        this.setState({
            newMeal:{
                ...this.state.newMeal,
                meal: value
            }
        })
    }
    handleDaySelectChange = (event, { value }) => {
        this.setState({
            newMeal: {
                ...this.state.newMeal,
                day: value
            }
        })
    }
    handleIngredientChange = (event) =>{
        this.setState({
            newIngredient: event.target.value
        })
        console.log(this.state.newIngredient);
        
    }
    render() {
        let addMeal;
        const mealOptions = [
            {key: 'breakfast', text: 'Breakfast', value: 1},
            { key: 'lunch', text: 'Lunch', value: 2 },
            { key: 'dinner', text: 'Dinner', value: 3 }

        ]

        //creating array of objects for our day select to use
        let days = this.props.reduxState.days;
        let daysArray = [];
        for(let i = 0; i < days; i++){
            let day = { key: `day ${i + 1}`, text: `Day ${i + 1}`, value: i + 1 }
            daysArray.push(day)
        }
        const dayOptions = daysArray;
        if (!this.state.addMealToggle){
            addMeal = <Button color="light green" content="Add a New Meal" onClick={this.addMealToggle} />;
        }else{
            addMeal = <div>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-meal-name'
                                    control={Input}
                                    label='Meal Name'
                                    placeholder='Meal Name'
                                    onChange={event=>this.handleNewMealChange(event, 'name')}
                                />
                                <Form.Field
                                    control={Select}
                                    options={mealOptions}
                                    label={{ children: 'Meal', htmlFor: 'form-select-control-meal' }}
                                    placeholder='Meal'
                                    onChange={this.handleMealSelectChange}
                                />
                                <Form.Field
                                    control={Select}
                                    options={dayOptions}
                                    label={{ children: 'Days', htmlFor: 'form-select-control-day' }}
                                    placeholder='Day'
                                    onChange={this.handleDaySelectChange}
                                />
                            </Form.Group>
                            <h3>Ingredients</h3>
                            <Form.Group widths='equal'>
                                {this.state.addIngredientToggle
                                    ? 
                                        <div>
                                            <Form.Field
                                                id='form-input-control-ingredient'
                                                control={Input}
                                                label='Ingredient'
                                                placeholder='Ingredient'
                                                onChange={event=>this.handleIngredientChange(event)}
                                            />
                                            <Button color="light green" content="Add" onClick={this.addIngredient}/>
                                            <Button color="red" content="Cancel" onClick={this.addIngredientToggle} />
                                        </div>
                                    : <Button color="light green" content="Add Ingredient" onClick={this.addIngredientToggle} />

                                }
                            </Form.Group>
                        </Form>
                        <Button color="light green" content="Add Meal to Trip" onClick={this.addMeal} />
                        <Button color="red" content="Cancel" onClick={this.addMealToggle} />
                    </div>
        }
        return (
            <div>
                <TripNav />
                
                <h3>Meal Planning</h3>
                {this.props.reduxState.meals.length < 1 &&
                    <h3 style={{marginBottom:'40px'}}>No meals planned yet.</h3>
                }
                <Card.Group>
                    {this.props.reduxState.meals &&
                        this.props.reduxState.meals.map((day)=>{
                            return(
                                
                                <MealCard day = {day}/>
                            )
                        })}
                </Card.Group>
                {addMeal}
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MealPlan);
