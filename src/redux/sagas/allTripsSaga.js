import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this will be just for getting all the users trips
function* getAllTrips(){
    console.log('getAllTrips');
    let response = yield axios({
       method: 'GET',
       url: `/api/allTrips`,
    })
    yield put({type: 'SET_ALL_TRIPS', payload: response.data});
    
}

function* deleteTrip(action){
    let trip_id = action.payload; 
    //send the trip id in req.params
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/trip/${trip_id}`,
      })
        yield put({type: 'GET_ALL_TRIPS'});
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };   
}
function* editTrip(action){
    let trip_id = action.payload.trip_id; 
    //send edit to the server
    try{
        yield axios({
            method: 'PUT',
            url: `/api/entryPoints/${trip_id}`,
            data: action.payload.entry_point.number
        })
        yield axios({
            method: 'PUT',
            url: `/api/trip/${trip_id}`,
            data: action.payload
        })
        yield put({type:'GET_TRIP', payload: trip_id});
    }
    catch(error){
        console.log(error);
        alert('unable to update trip');
        
    }
}
function * getTrip(action){
    console.log(action.payload);
    let trip_id = action.payload;
    let response = yield axios({
        method: 'GET',
        url: `/api/trip/${trip_id}`,
    })
    console.log('response after edit', response);
    yield put({type:'SET_TRIP', payload: response.data[0]});
    
}
function* allTripsSaga() {
  yield takeLatest('GET_ALL_TRIPS', getAllTrips); 
  yield takeLatest('DELETE_TRIP', deleteTrip);
  yield takeLatest('EDIT_TRIP_INFO', editTrip);
  yield takeLatest('GET_TRIP', getTrip);

}

export default allTripsSaga;
