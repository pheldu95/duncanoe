const mealsReducer = (state = [], action) => {
    //will hold all the meals
    switch (action.type) {
        case 'SET_MEALS':
            return action.payload;
        default:
            return state;
    }
};


export default mealsReducer;
