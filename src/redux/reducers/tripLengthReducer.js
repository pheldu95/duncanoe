const tripLengthReducer = (state = {}, action) => {
    //holds the trip days length
    switch (action.type) {
        case 'SET_LENGTH':
            return action.payload;
        default:
            return state;
    }
};


export default tripLengthReducer;

