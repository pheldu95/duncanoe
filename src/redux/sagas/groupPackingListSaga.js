import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postGroupItems(action){
  console.log('items to post for group packing list:', action.payload);
  let itemArray = action.payload.itemArray;
  for(let i = 0; i < itemArray.length; i++){
    console.log('posting item:', itemArray[i]);
    
    try {
      yield axios({
          method: 'POST',
          url: `/api/groupPackingList/${action.payload.trip_id}`,
          data: itemArray[i]
      })
    } catch (error) {
        console.log('error adding packing list items', error);
    }
  }
}

function* getGroupPackingList(action){
    console.log('getting packing list. trip id:', action.payload);
  //the payload is the trip id
  let response = yield axios({
    method: 'GET',
    url: `/api/groupPackingList/${action.payload}`
  })
  console.log('packing list coming back from server:', response.data);
  yield put({type: 'SET_GROUP_PACKING_LIST', payload: response.data});
  
}

function* getRentals(action){
    let response = yield axios({
        method: 'GET',
        url: `/api/groupPackingList/rentals/${action.payload}`
    })
    console.log('rentals list coming back from server:', response.data);
    yield put({
        type: 'SET_RENTALS',
        payload: response.data
    });
}
function* checkItem(action){
 
    //send the item id with its boolean value to the packingList router
    try {
        
       yield axios({
            method: 'PUT',
            url: `/api/groupPackingList/have/${action.payload.item_id}`,
            data: action.payload
        })
        
        yield put({
            type:'GET_GROUP_PACKING_LIST',
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
            url: `/api/groupPackingList/${action.payload.item_id}`,
        })
        yield put({
            type:'GET_GROUP_PACKING_LIST',
            payload: action.payload.trip_id
        })
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };   
    
}

function* addGroupItem(action){
    try {
        yield axios({
            method: 'POST',
            url: `/api/groupPackingList/${action.payload.trip_id}`,
            data: action.payload.newItem
        })
        yield put({
            type:'GET_GROUP_PACKING_LIST',
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
            url: `/api/groupPackingList/quantity/${action.payload.item_id}`,
            data: {quantity: action.payload.quantity}
        })
        
        yield put({
            type:'GET_GROUP_PACKING_LIST',
            payload: action.payload.trip_id
        })
    } catch (error) {
        console.log(error);
    } 
}

function* changeRentalStatus(action){
    try {
        
       yield axios({
            method: 'PUT',
            url: `/api/groupPackingList/rental/${action.payload.item_id}`,
            data: {rentalStatus: action.payload.rentalStatus}
        })
        
        yield put({
            type:'GET_GROUP_PACKING_LIST',
            payload: action.payload.trip_id
        })
    } catch (error) {
        console.log(error);
    }   
}

function* groupPackingListSaga() {
    yield takeLatest('POST_GROUP_ITEMS', postGroupItems)
    yield takeLatest('GET_GROUP_PACKING_LIST', getGroupPackingList)
    yield takeLatest('GET_GROUP_PACKING_LIST', getRentals)
    yield takeLatest('CHECK_GROUP_ITEM', checkItem)
    yield takeLatest('REMOVE_GROUP_ITEM', removeItem)
    yield takeLatest('ADD_GROUP_ITEM', addGroupItem)
    yield takeLatest('CHANGE_GROUP_QUANTITY', changeQuantity)
    yield takeLatest('CHANGE_RENTAL_STATUS', changeRentalStatus)
}

export default groupPackingListSaga;
