import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postMemberItems(action){
  console.log('items to post for member packing list:', action.payload);
  let itemArray = action.payload.itemArray;
  for(let i = 0; i < itemArray.length; i++){
    console.log('posting item:', itemArray[i]);
    
    try {
      yield axios({
          method: 'POST',
          url: `/api/packingList/${action.payload.trip_id}`,
          data: itemArray[i]
      })
    } catch (error) {
        console.log('error adding packing list items', error);
    }
  }
}

function* getPackingList(action){
    console.log('getting packing list. trip id:', action.payload);
  //the payload is the trip id
  let response = yield axios({
    method: 'GET',
    url: `/api/packingList/${action.payload}`
  })
  console.log('packing list coming back from server:', response.data);
  yield put({type: 'SET_PACKING_LIST', payload: response.data});
  
}

function* checkItem(action){
 
    //send the item id with its boolean value to the packingList router
    try {
        
       yield axios({
            method: 'PUT',
            url: `/api/packingList/have/${action.payload.item_id}`,
            data: action.payload
        })
        
        yield put({
            type:'GET_PACKING_LIST',
            payload: action.payload.trip_id
        })
    } catch (error) {
        console.log(error);
    } 
    
}
function* removeItem(action){
     try {
        yield axios({
            method: 'DELETE',
            url: `/api/packingList/${action.payload.item_id}`,
        })
        yield put({
            type:'GET_PACKING_LIST',
            payload: action.payload.trip_id
        })
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };   
    
}

function* addItem(action){
    try {
        yield axios({
            method: 'POST',
            url: `/api/packingList/${action.payload.trip_id}`,
            data: action.payload.newItem
        })
        yield put({
            type:'GET_PACKING_LIST',
            payload: action.payload.trip_id
        })
    } catch (error) {
        console.log('error adding packing list items', error);
    }
}
function* changeQuantity(action){
     try {
        
       yield axios({
            method: 'PUT',
            url: `/api/packingList/quantity/${action.payload.item_id}`,
            data: {quantity: action.payload.quantity}
        })
        
        yield put({
            type:'GET_PACKING_LIST',
            payload: action.payload.trip_id
        })
    } catch (error) {
        console.log(error);
    } 
}


function* packingListSaga() {
    yield takeLatest('POST_MEMBER_ITEMS', postMemberItems)
    yield takeLatest('GET_PACKING_LIST', getPackingList)
    yield takeLatest('CHECK_ITEM', checkItem)
    yield takeLatest('REMOVE_ITEM', removeItem)
    yield takeLatest('ADD_ITEM', addItem)
    yield takeLatest('CHANGE_QUANTITY', changeQuantity)
}

export default packingListSaga;
