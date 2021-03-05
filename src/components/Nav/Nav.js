import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

class Nav extends Component {
  state={
    activeTab: ''
  }
  setActive=(tab)=>{
    this.setState({
      activeTab: tab
    });
  }
  render(){
    let activeTab=this.state.activeTab;
    if(window.location === '/home'){
      console.log('asdsasdsasadasdasdassdadsadasdas');
      
    }
    return(
      <div id='cssmenu'>
        <Link onClick={()=>this.setActive('home')} className="navLink" to="/home">
          <h2 >Duncanoe</h2>
        </Link>
        <ul>
          {activeTab==='home'
            ?<li class='active'><a href='#'>
              <Link onClick={() => this.setActive('home')} className="navLink" to="/home">Home</Link>
            </a></li>
            :<li><a href='#'>
              <Link onClick={() => this.setActive('home')} className="navLink" to="/home">Home</Link>
            </a></li>
          }
          {this.props.user.id && (
            <>
              {activeTab === 'info'
                ?<li class='active'><a href='#'>
                  <Link onClick={() => this.setActive('info')} className="navLink" to="/info">Info</Link>
                </a></li>
                :<li><a href='#'>
                  <Link onClick={() => this.setActive('info')} className="navLink" to="/info">Info</Link>
                </a></li>
              }
              <li onClick={() => this.props.dispatch({ type: 'LOGOUT' })}><a href='#'>
                <LogOutButton onClick={() => this.setActive('')} className="navLink" onClick={() => window.location.reload(false)}/>
              </a></li>
            </>
          )}
          {activeTab === 'about'
            ?<li class='active'><a href='#'>
              <Link onClick={() => this.setActive('about')} className="navLink" to="/about">About</Link>
            </a></li>
            :<li><a href='#'>
              <Link onClick={() => this.setActive('about')} className="navLink" to="/about">About</Link>
            </a></li>
          }
        </ul>
      </div>
    )
  }
}
  // <div className="nav">
  //   <Link to="/home">
  //     <h2 className="nav-title">Duncanoe</h2>
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
  //         <Link className="nav-link" to="/info">
  //           Info Page
  //         </Link>
  //         <LogOutButton onClick={()=>window.location.reload(false)} className="nav-link"/>
  //       </>
  //     )}
  //     {/* Always show this link since the about page is not protected */}
  //     <Link className="nav-link" to="/about">
  //       About
  //     </Link>
  //   </div>
  // </div>


// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
