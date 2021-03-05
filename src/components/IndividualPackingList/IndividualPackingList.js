import React, { Component } from "react";
import { connect } from "react-redux";
import TripNav from "../TripNav/TripNav";
import PackingListItem from "./PackingListItem";
import { Button, Icon, Table, Flag, Ref, Tab } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';

class IndividualPackingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packingItems: this.props.reduxState.packingList,
            reorderEnabled: false,
            selectedRowIds: [],
            draggingRowId: null,
            addItemToggle: false,
            newItem: {
                name: "",
                quantity: 0
            }
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    //so that when we change quantity, or add an item, the item array in the state updates along with the redux state
    componentDidUpdate = (prevProps) => {
        if (this.props.reduxState.packingList !== prevProps.reduxState.packingList) {
            this.setState({
                packingItems: this.props.reduxState.packingList
            })
        }
    }
    onDragEnd = (result) => {
        const { destination, source, reason } = result;

        if (!destination || reason === "CANCEL") {
            this.setState({
                draggingRowId: null
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

        console.log("id of item dragged:", packingItem.id);

        //where the dragged item is ending up
        console.log("destination.index:", destination.index);

        let itemInfo = {
            idOfDraggedItem: packingItem.id,
            indexOfDestination: destination.index
        };
        this.props.dispatch({ type: "DRAG_ITEM", payload: itemInfo });
        this.setState({
            packingItems
        });
    };

    addItemToggle = () => {
        this.setState({
            addItemToggle: !this.state.addItemToggle
        });
    };

    handleItemInputChange = (event, type) => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [type]: event.target.value
            }
        });
    };

    addItem = () => {
        //send the new item to packingListSaga
        this.props.dispatch({
            type: "ADD_ITEM",
            payload: {
                newItem: this.state.newItem,
                trip_id: this.props.reduxState.trip.id
            }
        });
        //reset the values so the inputs get emptied
        this.setState({
            newItem: {
                name: "",
                quantity: 0
            }
        });
    };
    sendList = () =>{
        let members = this.props.reduxState.members
        let packingList = this.props.reduxState.packingList;
        let packingListString = '<ul>';
        for(let i = 0; i < packingList.length; i++){
            packingListString = packingListString + `<li>${packingList[i].name}: ${packingList[i].quantity}</li>`
        }
        packingListString = packingListString + '</ul>';
        for(let i =0; i< members.length; i++){
            axios({
                method: 'POST',
                url: '/api/send',
                data: {
                    name: members[i].name,
                    email: members[i].email,
                    message: packingListString
                }
            }).then((response) => {
                if (response.data.msg === 'success') {
                    console.log("Message Sent.");
                    
                } else if (response.data.msg === 'fail') {
                    console.log("Message failed to send.");
                }
            })
        }
        alert("Packing List Sent.")
    }

    render() {
        const { packingItems, selectedRowIds, reorderEnabled } = this.state;
        let addItem;
        if (this.state.addItemToggle) {
            addItem = (
                <div>
                    <input
                        value={this.state.newItem.name}
                        onChange={event => this.handleItemInputChange(event, "name")}
                        placeholder="item name"
                    />
                    <input
                        value={this.state.newItem.quantity}
                        type="number"
                        onChange={event => this.handleItemInputChange(event, "quantity")}
                        placeholder="quantity"
                    />
                    <Button
                        onClick={this.addItem}
                        color="light green"
                        content="add item"
                    />
                    <Button color="red" content="cancel" onClick={this.addItemToggle} />
                </div>
            );
        } else {
            addItem = (
                <Button color="light green" content="+" onClick={this.addItemToggle} />
            );
        }
        return (
            <div>
                <TripNav />
                <div style={{display:'flex'}}>
                    <h3>Packing List</h3> <Button style={{marginLeft:'20px'}} onClick={this.sendList}>email to trip members</Button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                {reorderEnabled && <Table.HeaderCell />}
                                <Table.HeaderCell> Name </Table.HeaderCell>
                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                                <Table.HeaderCell>Have</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Droppable droppableId="table">
                            {(provided, snapshot) =>
                                <Ref innerRef={provided.innerRef}>
                                    <Table.Body {...provided.droppableProps}>
                                        {this.props.reduxState.packingList &&
                                            this.state.packingItems.map((item, idx) => {
                                                return <PackingListItem item={item} idx={idx} />;
                                            })}
                                    </Table.Body>
                                </Ref>}
                        </Droppable>
                    </Table>
                    {addItem}
                </DragDropContext>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(IndividualPackingList);
