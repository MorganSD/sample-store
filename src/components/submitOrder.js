import React, { Component } from 'react';
import '../style/submitOrder.css';
import OrderCard from './orders/card';

class Order extends Component{


render(){
    return(
        <div id='order'>
            <OrderCard />
        </div>
    )
}

}

export default Order;