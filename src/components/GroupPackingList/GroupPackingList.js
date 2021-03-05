import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import { Button, Menu, Icon, Table, Flag, Ref, Tab } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import MainPackingList from './MainPackingList/MainPackingList';
import RentalList from './RentalList/RentalList';


class GroupPackingList extends Component {
constructor(props) {
super(props)
this.state = {
    activeItem: 'group gear packing list',
    packingItems: this.props.reduxState.groupPackingList,
    reorderEnabled: false,
    selectedRowIds: [],
    draggingRowId: null,
    addItemToggle: false,
    newItem: {
        name: '',
        quantity: 0
    }
}
this.onDragEnd = this.onDragEnd.bind(this);
}

onDragEnd = result => {
const { destination, source, reason } = result;

if (!destination || reason === 'CANCEL') {
    this.setState({
    draggingRowId: null,
    });
    return;
}

if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
) {
    return;
}

    const packingItems = Object.assign([], this.state.packingItems);
    const packingItem = this.state.packingItems[source.index];
    packingItems.splice(source.index, 1);
    packingItems.splice(destination.index, 0, packingItem);

    console.log('id of item dragged:', packingItem.id);

    //where the dragged item is ending up
    console.log('destination.index:', destination.index);

    let itemInfo = {idOfDraggedItem: packingItem.id, indexOfDestination: destination.index}
    this.props.dispatch({type: 'DRAG_ITEM', payload: itemInfo});
    this.setState({
        packingItems
    });
}
addItemToggle = () =>{
    this.setState({
        addItemToggle: !this.state.addItemToggle
    })
}
handleItemInputChange = (event, type) =>{
    this.setState({
        newItem:{
            ...this.state.newItem,
            [type]: event.target.value
        }
    })
}

addItem = () =>{
    //send the new item to grouppackingListSaga
    this.props.dispatch({type: 'ADD_GROUP_ITEM', payload: {newItem:this.state.newItem, trip_id: this.props.reduxState.trip.id}});
    //reset the values so the inputs get emptied
    this.setState({
        newItem: {
            name: '',
            quantity: 0
        }
    })
}
handleMenuItemClick = (event, {name}) =>{
    this.setState({ activeItem: name })
    
}
render() {
    const { packingItems, selectedRowIds, reorderEnabled } = this.state;
    const activeItem = this.state.activeItem;
    let addItem;
    if(this.state.addItemToggle){
        addItem = <div>
                    <input value={this.state.newItem.name} onChange={(event)=>this.handleItemInputChange(event, 'name')} placeholder='item name'/>
                    <input value={this.state.newItem.quantity} type='number' onChange={(event)=>this.handleItemInputChange(event, 'quantity')} placeholder = 'quantity'/>
                    <Button onClick = {this.addItem} color = 'light green' content = 'add item'/>
                    <Button color = 'red' content = 'cancel' onClick = {this.addItemToggle}/>
                </div>
    }else{
        addItem = <Button color = 'light green' content = '+' onClick = {this.addItemToggle}/>

    }
    return (
        // both tables are getting info from the same database table
        //but the items that are marked as rentals get stored in the rentals reducer
        //and the rest get stored in the groupPackingList reducer
        //each reducer gets mapped to its own table
        <div >
            <TripNav/>
            <Menu tabular>
                <Menu.Item
                    name='group gear packing list'
                    active={activeItem==='group gear packing list'}
                    onClick={this.handleMenuItemClick}
                />
                <Menu.Item
                    name='rental list'
                    active={activeItem === 'rental list'}
                    onClick={this.handleMenuItemClick}
                />
            </Menu>
            {this.state.activeItem === 'group gear packing list'
                ?<MainPackingList/>
                :<RentalList/>
            }
           
                    
                    {/* Rental List
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    {reorderEnabled && (<Table.HeaderCell />)}
                                    < Table.HeaderCell> Name </Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                                <Droppable droppableId="table">
                                {(provided, snapshot) => (
                                    <Ref innerRef={provided.innerRef}>
                                    <Table.Body {...provided.droppableProps}>
                                        {this.props.reduxState.rentals&&
                                            this.props.reduxState.rentals.map((item, idx)=>{
                                                return(
                                                    <GroupPackingListItem item={item} idx = {idx}/>
                                                )
                                            })
                                        }
                                    </Table.Body>
                                    </Ref>
                                )} 
                                </Droppable>
                        </Table>
                        {addItem}
                    </DragDropContext> */}
                                              
        </div>
    );
}
}

const mapReduxStateToProps = (reduxState) => ({
reduxState
});

export default connect(mapReduxStateToProps)(GroupPackingList);