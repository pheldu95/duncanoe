import React, { Component } from 'react';
import { connect } from 'react-redux';


class EntryPoint extends Component {

    
    render() {
        let ep = this.props.ep;
        
        return (
            // stringify the ep so that we can send the whole object as a string. 
            // It doesnt let us set the value of an option to an object, so we turn it into a string
            //then we will parse it in NewTrip2, turning it back into an object
           <option value={JSON.stringify(ep)}>
               {ep.number}--{ep.name}
           </option>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(EntryPoint);