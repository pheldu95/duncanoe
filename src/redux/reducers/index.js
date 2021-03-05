import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import trip from './tripReducer';
import allTrips from './allTripsReducer';
import entryPoints from './entryPointsReducer';
import pageOne from './pageOneReducer';
import members from './membersReducer';
import packingList from './packingListReducer';
import groupPackingList from './groupPackingListReducer';
import rentals from './rentalsReducer';
import days from './tripLengthReducer';
import meals from './mealsReducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  trip, //will hold the trip that the user is making or looking at
  allTrips, //will hold all the user's trips
  pageOne, // will hold the data from newtrip page 1
  entryPoints, //will hold all entry points from db
  members, //will hold all members of current trip that the user is looking at
  packingList, //holds the member packing list
  groupPackingList, //holds the group packing list
  rentals, //holds all the rentals for the trip
  days, //holds how long the trip is in days
  meals //holds all the meals for the trip
});

export default rootReducer;
