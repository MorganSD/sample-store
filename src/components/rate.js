import React, { Component } from "react";
import lightstar from "../Icon Simplestore/star.png";
import darkstar from "../Icon Simplestore/star (1).png";

function Rate(props) {
  if (props.product.rate === 0) {
    return (
      <React.Fragment>
        {props.product.ratings_count ?
        <sup>({ props.product.ratings_count} )</sup>
          : null}
        <img src={lightstar} />
        <img src={lightstar} />
        <img src={lightstar} />
        <img src={lightstar} />
        <img src={lightstar} />
      </React.Fragment>
    );
  } else if (props.product.rate === 1) {
    return (
      <React.Fragment>
 {props.product.ratings_count ?
        <sup>({ props.product.ratings_count} )</sup>
          : null}        <img src={darkstar} />
        <img src={lightstar} />
        <img src={lightstar} />
        <img src={lightstar} />
        <img src={lightstar} />
      </React.Fragment>
    );
  } else if (props.product.rate === 2) {
    return (
      <React.Fragment>
 {props.product.ratings_count ?
        <sup>({ props.product.ratings_count} )</sup>
          : null}        <img src={darkstar} />
        <img src={darkstar} />
        <img src={lightstar} />
        <img src={lightstar} />
        <img src={lightstar} />
      </React.Fragment>
    );
  } else if (props.product.rate === 3) {
    return (
      <React.Fragment>
 {props.product.ratings_count ?
        <sup>({ props.product.ratings_count} )</sup>
          : null}        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={lightstar} />
        <img src={lightstar} />
      </React.Fragment>
    );
  } else if (props.product.rate === 4) {
    return (
      <React.Fragment>
 {props.product.ratings_count ?
        <sup>({ props.product.ratings_count})</sup>
          : null}        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={lightstar} />
      </React.Fragment>
    );
  } else if (props.product.rate === 5) {
    return (
      <React.Fragment>
 {props.product.ratings_count ?
        <sup>({ props.product.ratings_count} )</sup>
          : null}        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
      </React.Fragment>
    );
  } else {
    return <span />;
  }
}
export default Rate;
