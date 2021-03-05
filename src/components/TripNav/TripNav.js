import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';


class Nav extends Component {
  
  render() {
    return (
      <div id='cssmenu'>
        <Link  className="navLink" to="/tripHome">
          <h2 className="nav-title">{this.props.state.trip.title}</h2>
        </Link>
        <ul>
          <li><a href='#'>
              <Link  className="navLink" to="/home">Home</Link>
          </a></li>
           
          {this.props.user.id && (
            <>
              {/* had to give the li and href, or else if the user didnt click on the link
                and instead clicked on the li, he would be brought to the home page */}
              <li><a href='#/tripHome'>
                <Link className="navLink" to="/tripHome">Trip Info</Link>
              </a></li>
             

              
              <li><a href='#/packingList'>
                <Link className="navLink" to="/packingList">Packing List</Link>
              </a></li>
            
              

             
              <li><a href='#/groupPackingList'>
                <Link className="navLink" to="/groupPackingList">Group Gear</Link>
              </a></li>
              
              
              <li><a href='#/mealPlan'>
                <Link className="navLink" to="/mealPlan">Meal Planning</Link>
              </a></li>


              <li><a href='#/outfitters'>
                <Link className="navLink" to="/outfitters">Outfitters</Link>
              </a></li>
              
              <li><a href='#'>
                <LogOutButton className="navLink" onClick={() => window.location.reload(false)} />
              </a></li>
            </>
          )}
        </ul>
      </div>
    )
  }
}
// const Nav = (props) => (
  
  // <div className="nav">
  //   <Link to="/tripHome">
  //     <h2 className="nav-title">{props.state.trip.title}</h2>
  //   </Link>
  //   <div className="nav-right">
  //     <Link className="nav-link" to="/home">
  //       {/* Show this link if they are logged in or not,
  //       but call this link 'Home' if they are logged in,
  //       and call this link 'Login / Register' if they are not */}
  //       {props.user.id ? 'Home' : 'Login / Register'}
  //     </Link>
  //     {/* Show the link to the info page and the logout button if the user is logged in */}
  //     {props.user.id && (
  //       <>
  //         <Link className="nav-link" to="/tripHome">
  //           Trip Info
  //         </Link>
  //         <Link className="nav-link" to="/packingList">
  //           Packing List
  //         </Link>
  //         <Link className="nav-link" to="/groupPackingList">
  //           Group Packing List
  //         </Link>
  //         <Link className="nav-link" to="/outfitters">
  //           Outfitters
  //         </Link>
  //         <LogOutButton className="nav-link"/>
  //       </>
  //     )}
      
  //   </div>
  // </div>
// );

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(Nav);
