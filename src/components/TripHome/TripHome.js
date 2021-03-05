import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import Member from '../Member/Member';
import EntryPoint from '../EntryPoint/EntryPoint';
import { Button, List, Input } from "semantic-ui-react";
import './TripHome.css'

//function we will use to calculate paddle info
import {paddleInfoCalculator} from './paddleInfoCalculator';
import axios from 'axios';

class TripHome extends Component {
    state = {
        //addMember is for conditional rendering
        addMember: false,
        editMode: false,
        newMember:{
            firstName: '',
            lastName: '',
            age: 0,
            email: ''
        },
        paddleInfo: 0,
        entry_point: {
            number: 0,
            name: '',
            link: '',
            address: '',
            difficutly: ''
        },
        startDate: this.props.reduxState.trip.start_date,
        endDate: this.props.reduxState.trip.end_date,
        // edits:{
        //     start_date: this.props.reduxState.trip.start_date,
        //     end_date: this.props.reduxState.trip.end_date,
        //     entry_point: this.props.reduxState.entry_point
        // }

    }
   componentDidMount(){
       this.getMembers();
       this.getAllPackingLists();
       this.calculatePaddleInfo();
       this.getEntryPointInfo();

   }

   //wait until the trip reducer has been updated with the entry point.
   //once it has, we can run getEntryPointInfo because we will have the entry point number
   componentDidUpdate = (prevProps) =>{
        if (this.props.reduxState.trip.entry_point !== prevProps.reduxState.trip.entry_point) {
            console.log('getting entry pointsbhfahjksfkjhsdfhkjas', this.props.reduxState.trip);
            
            this.getEntryPointInfo();
        }
        if(this.props.reduxState.members !== prevProps.reduxState.members){
            this.calculatePaddleInfo();

        }
    }

   calculatePaddleInfo = () =>{
       let trip = this.props.reduxState.trip;
       let groupSize = this.props.reduxState.members.length;
       //calculate the number of days the trip will last
       //convert them to dates that javascript can use
       let start_date = new Date(trip.start_date);
       let end_date = new Date(trip.end_date);
       //find the difference in time in miliseconds
       let differenceInTime = end_date.getTime() - start_date.getTime();
       //turn differenceInTime into days
       let days = differenceInTime / (1000 * 3600 * 24);
       console.log('days', days);
        this.props.dispatch({type: 'SET_LENGTH', payload: days});

       let paddleInfo = paddleInfoCalculator(trip, groupSize, days);
       console.log('paddleInfo', paddleInfo);
       this.setState({
           paddleInfo: paddleInfo
       })


       
   }
   getMembers = () =>{
       //this dispatch will go to allTripsSaga. where axios will get members of the trip
       this.props.dispatch({type: 'GET_MEMBERS', payload: this.props.reduxState.trip.id});
   }
   getAllPackingLists = () =>{
        let trip_id = this.props.reduxState.trip.id;
        this.props.dispatch({type: 'GET_PACKING_LIST', payload: trip_id});
        this.props.dispatch({type:'GET_GROUP_PACKING_LIST', payload: trip_id});

    }
    getEntryPointInfo = () =>{
        console.log(this.props.reduxState.trip);
        
        let ep_number = this.props.reduxState.trip.entry_point;
        console.log('getting ep', ep_number);
        
        axios({
            method: 'GET',
            url: `/api/entryPoints/${ep_number}`
        }).then((response) =>{
            console.log('ep info back from db', response.data);
            //if we dont have this conditional, it will 
            //error out when this function run in componentDidMount
            //because the trip redux state might not have the entry point number yet
            if(response.data[0] !== undefined){
                this.setState({
                    entry_point: response.data[0]
                    
                })
            }
        }).catch((error)=>{
            console.log('error getting ep', error);
            
        })
    }
   toggleAddMember = () =>{
       if(this.state.addMember === false){
           this.setState({
               addMember: true
           })
       }else if(this.state.addMember === true){
           this.setState({
               addMember: false
           })
       }
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
    
    addMember = () => {
        this.props.dispatch({type: 'ADD_MEMBER', payload: {member: this.state.newMember, trip_id: this.props.reduxState.trip.id}})
        this.setState({
            addMember: false
        })
        
    }
    editToggle = () =>{
        this.setState({
            editMode: !this.state.editMode
        })
        this.getEntryPointInfo();
    }
    inputChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        })
        console.log(this.state, this.state.entry_point.number);
    }
    //send changes to redux
    saveChanges = () =>{
        let changes = {trip_id: this.props.reduxState.trip.id, 
                        entry_point: this.state.entry_point, 
                        startDate: this.state.startDate, 
                        endDate: this.state.endDate,
                        title: this.props.reduxState.trip.title,
                        difficulty: this.props.reduxState.trip.difficulty,
                        experience: this.props.reduxState.trip.experience,
                        area: this.props.reduxState.trip.area
                    };
        this.props.dispatch({type: 'EDIT_TRIP_INFO', payload: changes});
        this.editToggle();
    }
    render() {
        let ep = this.state.entry_point;
        let trip = this.props.reduxState.trip
        //conditional rendering
        //if addMember is false, the dom will just have a button asking if the user wants to add a member
        //if the user clicks this button, it will run toggleAddMember, which turns the variable addMember
        //into a div with all of the inputs
        //pressing cancel toggles it back to the "add member?" button
        let addMember
        if(this.state.addMember === false){
            addMember = <Button onClick = {this.toggleAddMember}>Add member?</Button>
        }else if(this.state.addMember === true){
            addMember = <div ><Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'firstName')} placeholder='first name'/>
                <Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'lastName')} placeholder='last name'/>
                <Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'age')} type='number' placeholder='age'/>
                <Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'email')} placeholder='email'/>
                <Button onClick={this.addMember}>Add</Button>
                <Button onClick={()=> this.setState({addMember: false})}>Cancel</Button>
                </div>
        }
        // let start_date = trip.start_date.substring(0, 10);
        // let end_date = trip.end_date.substring(0, 10);
        let start_date = new Date(trip.start_date);
        let end_date = new Date(trip.end_date);
        start_date = start_date.toUTCString()
        end_date = end_date.toUTCString()

        start_date = start_date.substring(0, 16);
        end_date = end_date.substring(0, 16);
        return (
            <div className="tripHome">
                <TripNav/>
                
                <div className="tripHomeContent">
                    <div style={{ display: "flex" }}>
                        <h3>Trip Info</h3> <Button style={{ marginLeft: '20px' }} content='edit' onClick = {this.editToggle}/>
                    </div>
                    <hr className="default_hr"></hr>
                    {this.state.editMode 
                        ? <>

                            <label>Trip start:</label>
                            <Input size='mini' className="genericInput" onChange={(event) => this.inputChange(event, 'startDate')} type='date' />
                            <br/>
                            <label>Trip End:</label>
                            <Input size='mini' className="genericInput" onChange={(event) => this.inputChange(event, 'endDate')} type='date'/>
                            <br/>
                            <label>Entry Point: </label>
                            <select onChange={(event) => this.inputChange(event, 'entry_point')}>
                                {/* wait until this.props.reduxState.entryPoints exists, then do the mapping */}
                                {this.props.reduxState.entryPoints &&
                                    this.props.reduxState.entryPoints.map((ep) => {
                                        return (
                                            <EntryPoint ep={ep} />
                                        )
                                    })
                                }
                            </select>
                            <br/>
                            <br/>
                            <Button color='light green' onClick={this.saveChanges}>Save Changes</Button>
                            <Button color='red' onClick={this.editToggle}>Cancel</Button>

                        </>
                        
                        : <>

                            {/* will wait until the dates are not null, then appear on DOM */}
                            {this.props.reduxState.trip.start_date != null &&
                                <p>
                                    Trip start: {start_date}
                                    <br />
                                    Trip end: {end_date}
                                </p>
                            }
                            <p>
                                Entry Point: {ep.number} -- {ep.name}
                            </p>
                            {this.state.paddleInfo &&
                                <p>Estimated distance per day: {this.state.paddleInfo.distance} miles</p>

                            }
                        </>
                    }
                    <h3>Trip Members</h3>
                    <List relaxed>
                        {this.props.reduxState.members&&
                            this.props.reduxState.members.map((member) => {
                                return(
                                    <Member member={member}/>
                                )
                            })
                        }
                        {addMember}
                    </List>     
                </div>      
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TripHome);