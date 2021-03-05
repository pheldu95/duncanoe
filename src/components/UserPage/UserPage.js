import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import TripListItem from '../TripListItem/TripListItem';
import Nav from '../Nav/Nav';
import { Button, List } from 'semantic-ui-react'
import './UserPage.css';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component{
  
  componentDidMount = () =>{
    this.getAllTrips();
    //get all the entry points and put them in the entrypointsReducer. for later use
    this.getEntryPoints();

    //give the pageOneReducer some initial values. so that pageOneReducer isnt undefined
    this.props.dispatch({
      type: 'HOLD_PAGE_1',
      payload: {
        title: '',
        startDate: '0001-01-01',
        endDate: '0001-01-01',
        difficulty: 1,
        experience: 1,
        area: 'either',
        members: []
      }
    });
  }

  //get the user's trips
  getAllTrips = () =>{
    this.props.dispatch({type: 'GET_ALL_TRIPS'});
  }

  //dispatch to entryPointSaga to get all entry points for entryPointsReducer
  getEntryPoints = () =>{
    this.props.dispatch({type: 'GET_ENTRY_POINTS'})
  }

  //need to have the new trip already created when the user gets to new trip page 1.
  //that way, the trip id will already be available so the member table can use it for the reference column
  newTrip = () =>{
    console.log('new trip');
    this.props.dispatch({type: 'CREATE_TRIP', payload: this.props.user.id});
    this.props.history.push('/newtrip1');
  }
  render(){
    
    return(
      <div className="userPage">
        <Nav/>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <div>
          {/* use a conditional to see if the user has any trips */}
          {this.props.state.allTrips.length === 0
                ?<><h2>Looks like you don't have any trips planned.</h2>
                  <h2>Click the "Create New Trip" button to start planning!</h2></>
                :<><h1 style={{ textDecoration: 'underline' }}>Your Trips</h1>
                <List size='big' className="tripsList">
                  {/* here we will map the trips array coming from the database */}
                  {this.props.state.allTrips&&
                    this.props.state.allTrips.map((trip) =>{
                      return(
                        // pass it the trip and history. 
                        //need to pass it history so it can do a this.props.history.push
                        //or else history is undefined
                        <TripListItem trip={trip} history={this.props.history}/>
                      )
                  })}
              
                </List></>
          } 
          <Button className="genericButton" content='Create New Trip' onClick={this.newTrip}/>
        </div>
        
        <LogOutButton className="navLink" />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  state

});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
