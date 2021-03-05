import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import NewTrip1 from '../NewTrip1/NewTrip1';
import NewTrip2 from '../NewTrip2/NewTrip2';
import TripHome from '../TripHome/TripHome';
import IndividualPackingList from '../IndividualPackingList/IndividualPackingList';
import GroupPackingList from '../GroupPackingList/GroupPackingList';
import Outfitters from '../Outfitters/Outfitters';
import MealPlan from '../MealPlan/MealPlan';


import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <ProtectedRoute
              exact path = "/newtrip1"
              component={NewTrip1}
            />
            <ProtectedRoute
              exact path = "/newtrip2"
              component={NewTrip2}
            />
            <ProtectedRoute 
              exact path = "/tripHome"
              component={TripHome}
            />
            <ProtectedRoute 
              exact path = "/packingList"
              component={IndividualPackingList}
            />
            <ProtectedRoute 
              exact path = "/groupPackingList"
              component={GroupPackingList}
            />
            <ProtectedRoute 
              exact path = "/outfitters"
              component={Outfitters}
            />
            <ProtectedRoute
              exact path="/mealPlan"
              component={MealPlan}
            />
            {/* I think I have to add triplistItem so it can have access to props.history. props.history was coming back as undefined */}
           
            <Route render={() => <h1>404</h1>} />
          </Switch>
          
        </div>
      </Router>
  )}
}

export default connect()(App);
