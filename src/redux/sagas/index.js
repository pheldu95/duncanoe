import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import newTripSaga from './newTripSaga';
import allTripsSaga from './allTripsSaga';
import entryPointsSaga from './entryPointsSaga';
import packingListSaga from './packingListSaga';
import membersSaga from './membersSaga';
import groupPackingListSaga from './groupPackingListSaga';
import mealsSaga from './mealsSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    newTripSaga(),
    allTripsSaga(),
    entryPointsSaga(),
    packingListSaga(),
    membersSaga(),
    groupPackingListSaga(),
    mealsSaga()
  ]);
}
