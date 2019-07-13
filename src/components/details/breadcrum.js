import React from 'react';
import breadcrumbIcon from "../../Icon Simplestore/apple-keyboard-control-3.png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Breadcrum(props) {
    if (props.product.bread_crumb) {
      if(props.product.bread_crumb.length === 0 ){
        return null;
      }else{
        console.log("bread", props.product.bread_crumb.address);
        if(props.product.bread_crumb.parent_category != null){
          return (
            <li>
              <Link to={`/${props.product.bread_crumb.address}`}>
                {props.product.bread_crumb.parent_category}
              </Link>
              <img src={breadcrumbIcon} />
            </li>
          );
        }
      
        if (props.product.bread_crumb.title != null) {
          return (
            <li>
              <a src="#">{props.product.bread_crumb.title}</a>
              <img src={breadcrumbIcon} />
            </li>
          );
        }
      }
      
    }else{
      return null;
    }
   
  }
  export default Breadcrum;
  
  