const allTripsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_TRIPS':
      return action.payload;
    default:
      return state;
  }
};


export default allTripsReducer;
