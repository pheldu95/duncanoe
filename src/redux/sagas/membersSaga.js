import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getMembers(action){
  console.log('getting members. trip id:', action.payload);
  //the payload is the trip id
  let response = yield axios({
    method: 'GET',
    url: `/api/members/${action.payload}`
  })
  console.log('members coming back from server:', response.data);
  
  yield put({type: 'SET_MEMBERS', payload: response.data});
  
  
}



//seperate function to post the members
function* postMember(action){
    
    let member = action.payload.member;
    let trip_id = action.payload.trip_id;
    
       
    try {
        yield axios({
        method: 'POST',
        url: `/api/members/${trip_id}`,
        data: member
    })
        yield put({type:'GET_MEMBERS', payload: trip_id});
    } 
    catch (error) {
        console.log(error);
    }
}

function* removeMember(action){
    //id of the member to delete
    let id = action.payload.member_id;
    let trip_id = action.payload.trip_id 
    
    //send the member id in req.params
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/members/${id}`,
        })
        yield put({
            type: 'GET_MEMBERS',
            payload: trip_id
        });
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete member');
    };       
}

function* membersSaga() {
    yield takeLatest('GET_MEMBERS', getMembers);
    yield takeLatest('ADD_MEMBER', postMember);
    yield takeLatest('REMOVE_MEMBER', removeMember)

}


export default membersSaga;
