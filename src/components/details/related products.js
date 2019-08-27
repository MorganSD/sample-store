import React from 'react';
import Carousel from './carousel';

const Related = (props) => {
    if (props.related.related_products) {
      let relatedProduct = props.related.related_products.length;
      // console.log("length", relatedProduct);
      if (relatedProduct === 0) {
        return null;
      } else {
        return (
          <div className="related">
            <Carousel product={props.related.related_products} />
          </div>
        );
      }
    } else {
      return null;
    }
  }
  export default Related;