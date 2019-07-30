import React, { Component } from "react";
import { connect } from "react-redux";
import { inc_count, card_dispaly, dec_count ,delete_product} from "../actions/actions";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "../axios";
import Spinner from "../components/details/spinner";

import close from "../Icon Simplestore/close.png";
import plus from "../Icon Simplestore/+.png";
import mines from "../Icon Simplestore/-.png";

import "../style/card.css";


class Card extends Component {
  constructor() {
    super();
  }

  updateCard = () => {
    axios.get("/orders/cart/show/").then(res => {
      console.log("updated card", res.data.data.cart);
      if (res.status < 400) {
        localStorage.setItem("card", JSON.stringify(res.data.data.cart));
        this.props.addProductToCart(res.data.data.cart);
      } else {
        console.log("update cart error", res.errors);
      }
    });
  };
  notDispaly = () => {
    if (this.props.cardDisplay === true) {
      this.props.cardDisplayChange();
    }
  };

  incCount = (slug, max_order, count) => {
    if (count < max_order) {
      this.props.inc_count(slug);
    } else {
      alert(`سقف سفارش ${max_order}`);
    }
  };

  decCount = (slug, step_count, min_order, count) => {
    let next_count = count - step_count;
    if (next_count >= min_order) {
      this.props.dec_count(slug, next_count);
    } else {
      alert(`حداقل سفارش ${min_order}`);
    }
  };
  deleteProduct = (slug) =>{
    this.props.delete_product(slug);
  }
  render() {
    var commaNumber = require("comma-number");

    return (
      <section className="card-popUp">
        <div onClick={this.closeCard} />
        <div className="card">
          <img src={close} onClick={this.notDispaly} />
          <div className="card-items">
            <div>
              {this.props.isLoading ? <Spinner /> : null}
              {this.props.cardProduct ? (
                this.props.cardProduct.cart_products ? (
                  this.props.cardProduct.cart_products.map(product => (
                    <div className="items">
                      <Link to={`/item/${product.product.address}`} onClick={this.notDispaly}>
                      <img src={product.product.thumbnail} />
                      </Link>
                      <div className="item-info">
                        <p><Link to={`/item/${product.product.address}`} onClick={this.notDispaly}>{product.product.title} </Link></p>
                        <p>{commaNumber(product.product.price)} تومان</p>
                        
                        <span>
                          <button
                            onClick={() => {
                              this.incCount(
                                product.product.slug,
                                product.product.max_order_count,
                                product.count
                              );
                            }}
                          >
                            <img src={plus} />
                          </button>
                          <span>{product.count}</span>
                          <button
                            onClick={() => {
                              this.decCount(
                                product.product.slug,
                                product.product.step_count,
                                product.product.min_order_count,
                                product.count
                              );
                            }}
                          >
                            <img src={mines} />
                          </button>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <h3>سبد خرید شما خالی است</h3>
                )
              ) : (
                <h3>سبد خرید شما خالی است</h3>
              )}

              {this.props.cardProduct ? (
                this.props.cardProduct.cart_products ? (
                  this.props.cardProduct.cart_products.length > 0 ? (
                    <>
                      <div className="total-price">
                        <p>جمع کل :</p>
                        <p>
                          {commaNumber(this.props.cardProduct.total_price)}{" "}
                          تومان
                        </p>
                      </div>
                      <span className="submit-order">
                        <a href="#">تکمیل سفارش خرید</a>
                      </span>
                    </>
                  ) : null
                ) : null
              ) : null
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    cardDisplay: state.InitUserReducer.cardDisplay,
    cardProduct: state.InitUserReducer.card.cart,
    isLoading: state.InitUserReducer.card.isLoading
  };
};
const mapDispatchToProps = {
  inc_count: inc_count,
  dec_count: dec_count,
  delete_product :delete_product ,
  cardDisplayChange: card_dispaly
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
