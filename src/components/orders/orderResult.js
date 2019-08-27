import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "../header";

class OrderResult extends Component{
render(){
    return(
        <>
        <Header/>
        <div style={{height:'calc(100vh - 200px)'}}>
        <h1 style={{textAlign : 'center', paddingTop : '200px'}}>خرید موفقیت آمیز </h1>
        <Link to={'/'} > <h5 style={{textAlign : 'center', marginTop:'20px', color:'blue'}}>صفحه اصلی</h5></Link>
        </div>
        </>
    )
}
}export default OrderResult