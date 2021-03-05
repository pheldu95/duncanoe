const tripReducer = (state = {}, action) => {
    //holds the trip id so the trip can be edited and updated
  switch (action.type) {
    case 'SET_TRIP':
      if (action.payload != undefined){
        return action.payload;
      }else{
        return state;
      }
    default:
      return state;
  }
};


export default tripReducer;


