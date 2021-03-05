import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd'
import { Table } from 'semantic-ui-react'
import TripNav from '../TripNav/TripNav';
import axios from 'axios';
import './Outfitters.css';

class Outfitters extends Component {
    state = {
        outfitters: []
    }
    componentDidMount = () =>{
        this.getOutfitters();
    }
    getOutfitters = () =>{
        let ep_number = this.props.reduxState.trip.entry_point
        axios({
            type: 'GET',
            url: `/api/outfitters/${ep_number}`
        }).then((response) => {
            console.log('outfitters back from db', response.data);
            this.setState({
                outfitters: response.data

            })
            
        }).catch((error) => {
            console.log('error getting outfitters', error);

        })
    }
    render() {
       
        return (
            <div>
                <TripNav/>
                <h3>Outfitters</h3>
                <p>Here are some outfitters near your chosen entry point.</p>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            < Table.HeaderCell> Name </Table.HeaderCell>
                            <Table.HeaderCell width={8}>Description</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Address</Table.HeaderCell>
                            <Table.HeaderCell>Phone #</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.outfitters.map((outfitter) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>
                                        {outfitter.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {outfitter.description}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {outfitter.address}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {outfitter.phone}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
            
            // <Draggable draggableId={item.id.toString()} index={idx} key={item.id}>
            //     {(provided, snapshot) => (
            //         <Ref innerRef={provided.innerRef}>
            //             <Table.Row
            //                 {...provided.draggableProps}
            //                 {...provided.dragHandleProps}
            //                 style={this.getItemStyle(
            //                     snapshot.isDragging,
            //                     provided.draggableProps.style
            //                 )}
            //                 key={item.id}
            //             >

            //                 <Table.Cell className="itemNameCell">
            //                     {item.name}
            //                 </Table.Cell>
            //                 <Table.Cell>
            //                     <div className='quantityCell'>
            //                         {item.quantity}

            //                         <Button.Group vertical>
            //                             <Button onClick={() => this.changeQuantity(item.quantity, item.id, '+')} size='mini'>+</Button>
            //                             <Button onClick={() => this.changeQuantity(item.quantity, item.id, '-')} size='mini'>-</Button>
            //                         </Button.Group>

            //                     </div>
            //                 </Table.Cell>
            //                 <Table.Cell>
            //                     <Checkbox checked={item.have} onChange={() => this.handleCheck(item.have, item.id)} />
            //                 </Table.Cell>
            //                 <Table.Cell>
            //                     {button}
            //                 </Table.Cell>
            //                 <Table.Cell>
            //                     <Button color='red' content='remove' onClick={() => this.removeItem(item.id)} />
            //                 </Table.Cell>
            //             </Table.Row>
            //         </Ref>
            //     )}
            // </Draggable>
        );
    }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(Outfitters);