import React, { Component } from 'react';
import {connect} from 'react-redux';
import {init_selected_payment} from '../../actions/costumerInfo'
class Payment extends Component{

    selectPayment =( e , slug) =>{
        if(e.target.checked){
            this.props.select_method(slug)
        }else{
           return null
        }
    }

render(){
    let cart = this.props.cart
    return(

        <div id='shipping'>
            <h2>روش پرداخت</h2>
            <div>
                {cart.payment_methods ? 
                cart.payment_methods.map(method => (
                    <div className='method'>
                        <input type='radio' name='shipping' onChange={e =>{this.selectPayment(e , method.slug)}}/>
                        <label>{method.title}</label>
                    </div>
                )
                )
                : null
                }
            </div>
        </div>
    )
}

}
const mapStateToProps = state => {
    return {
      cart : state.InitUserReducer.card.cart
    };
  };
  const mapDispatchToProps = {
    select_method : init_selected_payment
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Payment);
