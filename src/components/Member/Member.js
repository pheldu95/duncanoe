import React, { Component } from 'react';
import {connect} from 'react-redux';
import { List } from 'semantic-ui-react';

class Member extends Component {
  
  //remove the member from the trip_members table, with the corresponding member id
  removeMember = (id) =>{
    this.props.dispatch({type: 'REMOVE_MEMBER', payload: {member_id: id, trip_id: this.props.reduxState.trip.id}});
  }
  render() {
      //props coming from UserPage
    let member = this.props.member;
    return (
      <List.Item>
        <List.Content>
          <List.Header>{member.first_name} {member.last_name}</List.Header>
          <List.Description>
            {member.email}
           </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(Member);