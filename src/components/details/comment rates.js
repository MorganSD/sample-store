import React from 'react';
import darkstar from "../../Icon Simplestore/star (1).png";
import halfStar from "../../Icon Simplestore/Group 771.png";

const CommentRate = (props) => {
    if (props.product.rate >= 0 && props.product.rate < 1) {
      return (
        <React.Fragment>
          <p>از ۵ </p>
          <img src={halfStar} />
        </React.Fragment>
      );
    } else if (props.product.rate >= 1 && props.product.rate < 2) {
      return (
        <React.Fragment>
          <p>از ۵ </p>
          <img src={darkstar} />
        </React.Fragment>
      );
    } else if (props.product.rate >= 2 && props.product.rate < 3) {
      return (
        <React.Fragment>
          <p>از ۵ </p>
          <img src={darkstar} />
          <img src={darkstar} />
        </React.Fragment>
      );
    } else if (props.product.rate >= 3 && props.product.rate < 4) {
      return (
        <React.Fragment>
          <span>از ۵ </span>
          <img src={darkstar} />
          <img src={darkstar} />
          <img src={darkstar} />
        </React.Fragment>
      );
    } else if (props.product.rate >= 4 && props.product.rate < 5) {
      return (
        <React.Fragment>
          <p>از ۵ </p>
          <img src={darkstar} />
          <img src={darkstar} />
          <img src={darkstar} />
          <img src={darkstar} />
        </React.Fragment>
      );
    } else if (props.product.rate === 5) {
      return (
        <React.Fragment>
          <p>از ۵ </p>
          <img src={darkstar} />
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
  export default CommentRate;