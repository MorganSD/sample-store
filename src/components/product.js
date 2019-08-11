// import React from 'react';
import { Link } from "react-router-dom";
import Addbasket from "../Icon Simplestore/Asset.png";
import Rate from "./rate";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import {connect} from 'react-redux';
import React, { Component } from 'react';
import {add_to_card} from '../actions/actions';

const Thumbnail = (props) =>{
    if (props.thumbnail != null) {
      return <img src={props.thumbnail} />;
    } else {
      return <img src={noPhoto} />;
    }
  }
 

class Product extends Component{
  addToCard = (max_order, slug) => {
    let cardStorage = JSON.parse(localStorage.getItem("card"));
    let item = cardStorage.cart_products.find(
      item => item.product.slug === slug
    );
    if (max_order === null) {
      max_order = 999;
    }
    if (item) {
      if (item.count < max_order) {
        this.props.addProductToCart(slug);
      } else {
        alert(`سقف سفارش ${max_order}`);
      }
    } else {
      this.props.addProductToCart(slug);
    }
    console.log("add", item, slug, max_order);
  };
  render(){
    var commaNumber = require('comma-number')

    return(
        <div className="itemBox">
              <figure>
                <Link to={`/item/${this.props.product.address}`}>
                  <Thumbnail thumbnail={this.props.product.thumbnail} />
                </Link>
                <figcaption >

                {this.props.product.in_stock ? (
                    
                  <span onClick={()=>{this.addToCard(this.props.product.max_order_count , this.props.product.slug)}}>
                    <img src={Addbasket} />
                   افزودن به سبد خرید
                  </span>
                ):
                <p>ناموجود</p>
                }
                </figcaption>
              </figure>

              <div className="item-summery">
                <p>
                  <Link to={`/item/${this.props.product.address}`}>{this.props.product.title}</Link>
                </p>
                <p>{commaNumber(this.props.product.price)} تومان</p>

                <div className="rate">
                  <Rate product={this.props.product} />
                </div>
              </div>
            </div>
    )
  }
 
}
const mapDispatchToProps =  {
 
  addProductToCart : add_to_card
   


}
export default connect(null , mapDispatchToProps)(Product);