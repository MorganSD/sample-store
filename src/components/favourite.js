import React, { Component } from "react";
import { connect } from "react-redux";
import {favourite_display } from '../actions/actions';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


import close from "../Icon Simplestore/close.png";
import "../style/favourite.css";

class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      favourite_ptoduct: false,
      currentUser: JSON.parse(localStorage.getItem("jwtToken"))
    };
  }
  componentWillMount() {
    if (this.props.favouriteProduct) {
      if (this.props.favouriteProduct.length > 0) {
        this.setState({
          favourite_ptoduct: true
        });
      } else {
        this.setState({
          favourite_ptoduct: false
        });
      }
    }
  }
  notDispaly = () => {
    this.props.favouriteDisplayChange();
  };

  render() {
    var commaNumber = require("comma-number");
    console.log(this.state.favourite_ptoduct,'fav dis')
    return (
      <div className="favourite">
        <div>
          <img src={close} onClick={this.notDispaly} />
          {!this.state.currentUser.guest ? (
            <div>
              {this.props.favouriteProducts ? (
                this.props.favouriteProducts.map(product => (
                  <div className="items">
                    <Link to={`/item/${product.address}`} onClick={this.notDispaly}><img src={product.thumbnail} /></Link>
                    <div className="item-info">
                    <p><Link to={`/item/${product.address}`} onClick={this.notDispaly}>{product.title} </Link></p>
                      <p>{commaNumber(product.price)} تومان</p>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="noProduct">
                  محصولی در سبد مورد علاقه های شما ثبت نشده است
                </h3>
              )}
            </div>
          ) : (
            <>
              <h3 className="noProduct">
                برای نمایش محصولات مورد علاقه باید به حساب کاربری خود وارد شوید
              </h3>
              <a href="/user/login">ورود</a>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favouriteDisplay : state.InitUserReducer.favouriteDisplay,
    favouriteProducts: state.InitUserReducer.favouriteProducts
  };
};
const mapDispatchToProps = {
    favouriteDisplayChange : favourite_display
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourite);
