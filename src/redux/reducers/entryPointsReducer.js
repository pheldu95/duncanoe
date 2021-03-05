const entryPointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ENTRY_POINTS':
      return action.payload;
    default:
      return state;
  }
};


export default entryPointsReducer;
