import React from 'react';
import { Link } from "react-router-dom";
import Addbasket from "../Icon Simplestore/Asset.png";
import Rate from "./rate";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import {connect} from 'react-redux';


const Thumbnail = (props) =>{
    if (props.thumbnail != null) {
      return <img src={props.thumbnail} />;
    } else {
      return <img src={noPhoto} />;
    }
  }
 

const Product = (props) =>{
  var commaNumber = require('comma-number')

    return(
        <div className="itemBox">
              <figure>
                <Link to={`/item/${props.product.address}`}>
                  <Thumbnail thumbnail={props.product.thumbnail} />
                </Link>
                <figcaption>
                  <span>
                    <img src={Addbasket} />
                    افزودن به سبد خرید
                  </span>
                </figcaption>
              </figure>

              <div className="item-summery">
                <p>
                  <Link to={`/item/${props.product.address}`}>{props.product.title}</Link>
                </p>
                <p>{commaNumber(props.product.price)} تومان</p>

                <div className="rate">
                  <Rate product={props.product} />
                </div>
              </div>
            </div>
    )
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart : (item) => {dispatch({type: 'ADD_TO_BASKET', item: item})}
   

  }
}
export default connect(null , mapDispatchToProps)(Product);