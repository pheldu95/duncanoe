const membersReducer = (state = [], action) => {
    //will hold the members of the current trip 
  switch (action.type) {
    case 'SET_MEMBERS':
      return action.payload;
    default:
      return state;
  }
};


export default membersReducer;


