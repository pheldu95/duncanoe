import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Draggable } from 'react-beautiful-dnd'
import { Button, Icon, Table, Ref, Checkbox } from 'semantic-ui-react'

class PackingListItem extends Component {

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })
  handleCheck = (have, id) =>{
      
      console.log(have);
      //the new boolean have value that will be sent to the db
      //is set to the opposite of whatever the current have value is for the item
      let newHaveValue = !have;
      //now we will send it in a dispatch with the corresponding item id
      this.props.dispatch({type: 'CHECK_ITEM', payload: {have: newHaveValue, item_id: id, trip_id: this.props.reduxState.trip.id}});

  }
  removeItem = (id) =>{
    this.props.dispatch({type: 'REMOVE_ITEM', payload: {item_id: id, trip_id: this.props.reduxState.trip.id}})
  }
  changeQuantity = (quantity, id, operator) => {
    if(operator === '+'){
       quantity++;
    }else if(operator === '-'){
        quantity--;
    }
    
    this.props.dispatch(
        {
            type: 'CHANGE_QUANTITY', 
            payload: {
                    item_id: id, 
                    quantity: quantity, 
                    trip_id: this.props.reduxState.trip.id
                }
        });


  }
  
  render() {
      //props coming from IndividualPackingList
    let item = this.props.item;
    let idx = this.props.idx
    return (
        <Draggable draggableId={item.id.toString()} index={idx} key = {item.id}>
            {(provided, snapshot) =>(
                <Ref innerRef={provided.innerRef}>
                <Table.Row
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={this.getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                    key={item.id}
                >
                    
                    <Table.Cell className="itemNameCell">
                        {item.name}
                    </Table.Cell>
                    <Table.Cell className='quantityCell'>
                        <div className='quantity'>
                            {item.quantity}
                        </div>
                        <Button.Group vertical className='quantityButtons'>
                            <Button icon onClick = {()=>this.changeQuantity(item.quantity, item.id, '+')} size='mini'><Icon name='caret up'/></Button>
                            <Button icon onClick = {()=>this.changeQuantity(item.quantity, item.id, '-')} size='mini'><Icon name='caret down'/></Button>
                        </Button.Group>
                            
                        
                    </Table.Cell>
                    <Table.Cell>
                        <Checkbox checked={item.have} onChange = {()=>this.handleCheck(item.have, item.id)}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Button color = 'red' content = 'remove' onClick = {()=>this.removeItem(item.id)}/>
                    </Table.Cell>
                </Table.Row>
                </Ref>
            )}
        </Draggable>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(PackingListItem);