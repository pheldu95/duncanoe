import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
//this will be just for getting all the users trips
function* getEntryPoints(){
    console.log('get entry points');
    let response = yield axios({
       method: 'GET',
       url: `/api/entryPoints`,
    })
    
    yield put({type: 'SET_ENTRY_POINTS', payload: response.data});
    
}
function* putEntryPoint(action){
  console.log('put entry point');
  
  console.log('new entry point. in entry point saga:', action.payload);
  
  try {
    yield axios({
        method: 'PUT',
        url: `/api/entryPoints/${action.payload.trip}`,
        data: action.payload
    })
    } catch (error) {
        console.log(error);
    }  
}



function* entryPointsSaga() {
  yield takeLatest('GET_ENTRY_POINTS', getEntryPoints);
  yield takeLatest('PUT_ENTRY_POINT', putEntryPoint);
}

export default entryPointsSaga;
