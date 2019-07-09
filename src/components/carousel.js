import React, { Component } from 'react';
import "../style/detail.css";
import arrow from "../Icon Simplestore/apple-keyboard-control-3.png";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import Rate from "./rate";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";



function Thumbnail(props){
    if(props.thumbnail != null){
        return <img src={props.thumbnail} />
    }else{
        return(
            <img src={noPhoto} />
        )
    }
  }
class Carousel extends Component {

constructor(props){
super(props);
this.state ={
    related : props.product,
    translate : 0,
    style1 :{
        width: props.product.length * 300 + "px"
    }    ,
    transition : null
}
this.translateLeft = this.translateLeft.bind(this)
this.translateRight = this.translateRight.bind(this)
  
}
    
  
  
  translateLeft(){
      if(this.state.translate > 0){
          console.log(this.state.transition)
   this.setState({
       translate : this.state.translate + 100,
       transition : 'translateX(' + this.state.translate + 100 + '%)'
   })
}else{
    alert ('tran')
  }
}
    
  translateRight(){
    if(this.state.translate <= this.state.style1.width){
        console.log(this.state.transition)
 this.setState({
    translate : this.state.translate - 100,
    transition : 'translateX(' + this.state.translate - 100 + '%)'
 })
}else{
    alert('noright')
}
}
  render(){
      console.log(this.state.style1.width)
    return (
      <React.Fragment>
        <img src={arrow} className="carouselArrow" onClick={this.translateLeft}/>
        <img src={arrow} className="carouselArrow" onClick={this.translateRight}/>
        <div>
          <p>محصولات مشابه</p>
          <div className="carousel" style={this.state.style1}>
            { this.state.related.map(item => (
            <div className="relatedBox">
              <figure>
                <Link to={`/item/${item.address}`}>
                          <Thumbnail thumbnail={item.thumbnail} />
                </Link>
                <figcaption>                    افزودن به سبد خرید
</figcaption>
              </figure>
              <div>
                <p>{item.title}</p>
                <p>{item.price}</p>
                <span className='related-Rate'> <Rate product={item} /></span>
              </div>
            </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Carousel;