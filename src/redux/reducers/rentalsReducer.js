const rentalsReducer = (state = [], action) => {
    //will hold the rentals for the current trip
    switch (action.type) {
        case 'SET_RENTALS':
            return action.payload;
        default:
            return state;
    }
};


export default rentalsReducer;
