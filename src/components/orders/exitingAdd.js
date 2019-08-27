import React, { Component } from "react";
import "../../style/formOrder.css";
import PostInfo from '../orders/postInfo';
import Address from '../orders/address';
class ExitingAdd extends Component {
  constructor() {
    super();
    this.state = {
     addAddress : false
    };
  }

isaddAddress = () =>{
  this.setState({
    addAddress : !this.state.addAddress
  })
}
  render() {
    return (
      <div id="exiting-add">
        <h2>آدرس ها</h2>
        <p onClick={()=>{this.setState({addAddress : !this.state.addAddress})}} >افزودن آدرس جدید</p>
        {this.state.addAddress ? (
          <PostInfo changeAddState={()=>{this.props.nextState()}} phone_number={this.props.phone}/>
        ): null
        }
        <div className="address">
          {this.props.address ? (
            this.props.address.map(add => (
              <Address prop={add} addLength={this.props.address.length}/>
            ))
          ) : (
            <h2>ادرسی موجود نیست</h2>
          )}
        </div>
      </div>
    );
  }
}
export default ExitingAdd;
