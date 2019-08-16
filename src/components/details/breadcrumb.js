import React from 'react';
import breadcrumbIcon from "../../Icon Simplestore/apple-keyboard-control-3.png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Breadcrumb = (props) => {

// return null
    if (props.product) {
      if(props.product.length === 0 ){
        return null;
      }else{
       
      
        if (props.product.categories) {
          if(props.product.categories.length != 0 )
         { return (
            props.product.categories.map(cat=> (
            <li>
              <Link to ={`/${cat.address}`}>{cat.title}</Link>
              <img src={breadcrumbIcon} />
            </li>
            ))
          )
        }else{return null}
        }else{return null}
      }
      
    }else{
      return null;
    }
   
  }
  export default Breadcrumb;
  
  