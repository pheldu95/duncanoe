const packingListReducer = (state = [], action) => {
    //will hold the individual packing list for the current trip
  switch (action.type) {
    case 'SET_PACKING_LIST':
      return action.payload;
    default:
      return state;
  }
};


export default packingListReducer;


