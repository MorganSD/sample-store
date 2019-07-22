import React, { Component } from "react";
import "../style/card.css";
import { connect } from "react-redux";
import close from "../Icon Simplestore/close.png";
import plus from "../Icon Simplestore/+.png";
import mines from "../Icon Simplestore/-.png";

class Card extends Component {
    constructor(){
        super();
        this.state = {
            order_products : false
        }
    }
  componentDidMount() {
      if(this.props.cardProduct){
          if(this.props.cardProduct.length != 0){
              this.setState({
                  order_products : true
              })
          }else{
              this.setState({
                  order_products:false
              })
          }
      }
  }
  notDispaly = () => {
    if (this.props.cardDisplay === true) {
      this.props.cardDisplayChange();
    }
  };

  render() {
     
    return (
      <section className="card-popUp">
        
        <div onClick={this.closeCard} />
        <div className="card">
          <img src={close} onClick={this.notDispaly} />
          <div className="card-items">
             
            <div>
            {this.state.order_products ? 
              this.props.cardProduct.map( product =>(
              <div className="items">
                <img src={product.thumbnail} />
                <div className="item-info">
                  <p>{product.title}</p>
                  <p>{product.price} تومان</p>
                  <span>
                    <button>
                      <img src={plus} />
                    </button>
                    <span>1</span>
                    <button>
                      <img src={mines} />
                    </button>
                  </span>
                </div>
              </div>
              )):
              <h3 className="noProduct">محصولی در سبد خرید شما ثبت نشده است</h3>
              }
              {this.state.order_products ?(
                  <>

              <div className="total-price">
                <p>جمع کل :</p>
                <p>{this.props.totalPrice} تومان</p>
              </div>
              <span className="submit-order">
                <a href="#">تکمیل سفارش خرید</a>
              </span>
              </>
              ):null}
            </div>
             
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return { cardDisplay: state.cardDisplay, cardProduct: state.cardProduct , totalPrice : state.totalPrice};
};
const mapDispatchToProps = dispatch => {
  return {
    cardDisplayChange: () => {
      dispatch({ type: "CARD_DISPLAY" });
    }
    //   setUser : () => {dispatch({type : 'INIT_LOGIN_USER'})}
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
