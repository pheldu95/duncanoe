import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Select, Input } from "semantic-ui-react";
import './MealCard.css';

class MealCard extends Component {
    state = {
        fullView: false
    }

    //labels the meal with the correct string
    mealType = (meal) =>{
        if(meal == 1){
            return 'Breakfast: ';
        }else if(meal == 2) {
            return 'Lunch: ';
        } else if (meal == 3) {
            return 'Dinner: ';
        }
    }
    
    //toggle the fullView boolean in the state
    fullViewToggle = () =>{
        this.setState({
            fullView: !this.state.fullView
        })
        
    }

    handleDelete = (id) =>{
        this.props.dispatch({ type: 'DELETE_MEAL', payload: { meal_id: id, trip_id: this.props.reduxState.trip.id}});
    }

    render() {
        let day = this.props.day;
        let moreButton;
        if(!this.state.fullView){
            moreButton = <Button style={{height:'30px'}} onClick={this.fullViewToggle}>More</Button>
        }else{
            moreButton = <Button style={{ height: '30px' }} onClick={this.fullViewToggle}>Less</Button>
        }
        return (
            <Card raised style={{ width: '255px', height: '150px' }}>
                {moreButton}
                <Card.Content>
                    <Card.Header>Day {day[0].day} Meals</Card.Header>
                        {this.state.fullView 
                            ? <Card.Description className="fullViewDiv">
                                {day.map((meal)=>{
                                    return(
                                       <div className="mealUl"> 
                                            <p>{this.mealType(meal.meal)} {meal.name}</p>
                                            <ul>
                                                {meal.ingredients.map((ingredient)=>{
                                                    return(
                                                        <li>
                                                            {ingredient.name}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <Button size='mini'>Edit</Button>
                                        </div>
                                    )
                                })}
                            </Card.Description>
                            : <Card.Description>
                                {day.map((meal)=>{
                                    return(
                                        <p>
                                            {this.mealType(meal.meal)} {meal.name}
                                            <Button style={{marginLeft:'5px'}}size='mini' onClick={() => this.handleDelete(meal.id)}>Delete</Button>
                                        </p>
                                    )
                                })}
                                
                            </Card.Description>
                        }
                </Card.Content>
                
            </Card>
        );
    }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(MealCard);