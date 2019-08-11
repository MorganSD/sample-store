import React, { Component } from "react";

class ShippingDate extends Component {
    constructor(){
super();
this.state={
    active : {},
    value : ''
}
    }    
    changeStyle = (e ) =>{
        if(!e.target.checked){
            this.setState({
                active : {
                    background : 'white'
                }
            })
        }else{
            this.setState({
                active : {
                    background : '#e1e1ff'
                }
            })
        }
       
    }
  render() {
    return (
      <div style={this.state.active}>
        <input type="radio" name="date_choice" id={this.props.choices.date} onChange={
            e =>{this.changeStyle(e)}
        } />
        <label for={this.props.choices.date}>
          {this.props.choices.date}
          
        </label>
      </div>
    );
  }
}
export default ShippingDate;
