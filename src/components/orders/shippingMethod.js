import React, { Component } from 'react';
import ShippingDate from './shippingDate';

class ShippingMethod extends Component{
    constructor(){
        super();
        this.state={
            isDate : false
        }
    }
    onChanging = (e , method) =>{
        console.log(method.slug,'method')
        if(e.target.checked){
            this.props.selectShipping(method);
            this.setState({
                isDate : true
              })
        }else{
            this.setState({
                isDate : false
              })
        }
       
    }
    render(){
        return(
            <div className="method">
            <input
            id={this.props.methods.slug}
              type="radio"
              name="shipping"
              onChange={e => {
                this.onChanging(e , this.props.methods)
              }}
            />
            <label for={this.props.methods.slug}>{this.props.methods.title}</label>
            {this.props.methods.accepts_shipping_interval ? (
              <div className="shipping_interval">
                {this.props.cart.shipping_time_choices.map(choice => (
                  this.state.isDate ?(
                    <ShippingDate choices={choice} />
                  ):null
              
                ))}
              </div>
            ) : null}
          </div>
        )
    }
}
export default ShippingMethod