import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { Button, Input, List} from "semantic-ui-react";
import './NewTrip1.css';

class NewTrip1 extends Component {

    state = {
        title: this.props.reduxState.pageOne.title,
        userId: this.props.reduxState.user.id,
        //hard coding some dates so i don't have to type trhem in for testing
        startDate: '0022-02-22',
        endDate: '0022-02-22',
        difficulty: this.props.reduxState.pageOne.difficulty,
        experience: this.props.reduxState.pageOne.experience,
        area: this.props.reduxState.pageOne.area,
        newMember:{
            firstName: '',
            lastName: '',
            age: 0,
            email: ''
        },
        members: this.props.reduxState.pageOne.members
    //the trip id is held in tripReducer so we dont need it in the local state
    }
    
    //capture the changes made in the inputs
    inputChange = (event, type) =>{
        this.setState({
            [type]: event.target.value
        })        
        console.log(this.state.endDate);
        
        
    }
    //capture changes made in new member form
    memberInputsChange = (event, type) =>{
        this.setState({
            newMember:{
                ...this.state.newMember,
                [type]: event.target.value
            }
        })    
    }
    //adds the new member to the area in the state
    addMember = () => {
        this.setState({
            members: [...this.state.members, this.state.newMember]
        })
        
    }
    cancelNewTrip = () => {
        //send dispatch to newTripSaga to delete trip entry from table
        this.props.dispatch({type: 'DELETE_TRIP', payload: this.props.reduxState.trip.id});
        //go back to the home page
        this.props.history.push('/home');
    }
    nextPage = () => {
        let pageOneData = this.state
        console.log(pageOneData);
        
        //give the object the trip_id
        pageOneData.trip_id = this.props.reduxState.trip.id
        //send it to pageOneReducer to be held before the user hits the final submit
        //this is so they can go back and edit if they want
        this.props.dispatch({type:'HOLD_PAGE_1', payload: pageOneData});
        //go to the next page of the new trip form
        this.props.history.push('/newtrip2');
    }
    render() {
        let trip = this.props.reduxState.trip
        return (
            <div className="newTrip1">
                <Nav/>
                <div className="newTrip1Content">
                    <h3>New Trip</h3>
                    <p>step 1/2</p>
                    {/* <p>{this.state.trip_id}</p> */}
                    <form>
                        <label>Trip title:</label>
                        <Input size='mini' className="genericInput" value={this.state.title} onChange={(event)=>this.inputChange(event, 'title')} placeholder='title'/>
                        <br/>
                        <label>trip start date:</label>
                        <Input size='mini' className="genericInput" onChange={(event)=>this.inputChange(event, 'startDate')} type= 'date'/>
                        <label>trip end date:</label>
                        <Input size='mini' className="genericInput" onChange={(event)=>this.inputChange(event, 'endDate')} type = 'date'/>
                        <br/>
                        <label>Trip Difficulty Level:</label>
                        <select value={this.state.difficulty} onChange={(event)=>this.inputChange(event, 'difficulty')}>
                            <option value={1}>Easy</option>
                            <option value={2}>Intermediate</option>
                            <option value={3}>Challenging</option>
                        </select>
                        <div className="experienceSelector">
                            <label>Approximate Outdoor Experience:</label>
                            <select value={this.state.experience} onChange={(event)=>this.inputChange(event, 'experience')}>
                                <option value={1}>Our group is not very experienced in the outdoors</option>
                                <option value={2}>Our group has some experience in the outdoors</option>
                                <option value={3}>Our group is very experienced in the outdoors</option>
                            </select>
                        </div>
                        <br/>
                        <label>Which side of the BWCA would you like to go to?</label>
                        <select value={this.state.area} onChange={(event)=>this.inputChange(event, 'area')}>
                            <option value='either'>Either</option>
                            <option value='east'>East</option>
                            <option value='west'>West</option>
                        </select>
                    </form>
                    <h3>Members</h3>
                    <List>
                        {this.state.members.map((member)=>{
                            return(
                                <List.Item>
                                    {member.firstName} {member.lastName} {member.email}
                                </List.Item>
                            )
                        })}
                    </List>
                    <Input size='mini' className="genericInput" onChange={(event)=>this.memberInputsChange(event, 'firstName')} placeholder='first name'/>
                    <Input size='mini' className="genericInput" onChange={(event)=>this.memberInputsChange(event, 'lastName')} placeholder='last name'/>
                    <Input size='mini' className="genericInput" onChange={(event)=>this.memberInputsChange(event, 'age')} type='number' placeholder='age'/>
                    <Input size='mini' className="genericInput" onChange={(event)=>this.memberInputsChange(event, 'email')} placeholder='email'/>
                    <Button size='mini' onClick={this.addMember}>Add</Button>
                    <br/>
                    <Button onClick={this.cancelNewTrip}>Cancel</Button>
                    <Button style={{marginBottom:'20px'}} onClick={this.nextPage}>Next</Button>
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(NewTrip1);