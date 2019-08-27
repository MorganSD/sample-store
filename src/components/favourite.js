import React, { Component } from "react";
import { connect } from "react-redux";
import { favourite_display, delete_favourite } from "../actions/actions";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProgressBar from "./details/progressBar";
import noPhoto from "../Icon Simplestore/noPhoto.png";
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
  removeFav = slug => {
    if (window.confirm("محصول از لیست مورد علاقه های شما حذف شود ؟")) {
      this.props.delete_favourite(slug);
    }
  };
  render() {
    var commaNumber = require("comma-number");
    // console.log(this.state.favourite_ptoduct, "fav dis");
    return (
      <div className="favourite">
        <div
          className="closer"
          onClick={() => {
            this.notDispaly();
          }}
        />
        <div className="fav_cart">
          {this.props.card_req ? <ProgressBar /> : null}

          <img src={close} onClick={this.notDispaly} />
          {!this.state.currentUser.guest ? (
            <div className="fav_cart_container">
              {this.props.favouriteProducts ? 
              this.props.favouriteProducts.length> 0 ? (
                this.props.favouriteProducts.map(product => (
                  <div className="items">
                    <Link
                      to={`/item/${product.address}`}
                      onClick={this.notDispaly}
                    >
                      <img
                        src={
                          product.thumbnail === null
                            ? noPhoto
                            : product.thumbnail
                        }
                      />
                    </Link>
                    <div className="item-info">
                      <p>
                        <Link
                          to={`/item/${product.address}`}
                          onClick={this.notDispaly}
                        >
                          {product.title}{" "}
                        </Link>
                      </p>
                      <p>{commaNumber(product.price)} تومان</p>
                      <span
                        onClick={() => {
                          this.removeFav(product.slug);
                        }}
                      >
                        <img src={close} />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="noProduct">
                  محصولی در سبد مورد علاقه های شما ثبت نشده است
                </h3>
              )
            : null
            }
            </div>
          ) : (
            <>
              <h3 className="noProduct">
                برای نمایش محصولات مورد علاقه باید به حساب کاربری خود وارد شوید
              </h3>
              <Link to="/user/login" onClick={()=> {this.notDispaly()}}>ورود</Link>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    favouriteDisplay: state.InitUserReducer.favouriteDisplay,
    favouriteProducts: state.InitUserReducer.favouriteProducts,
    card_req: state.CardReducer.card_req,
    
  };
};
const mapDispatchToProps = {
  favouriteDisplayChange: favourite_display,
  delete_favourite: delete_favourite,
  
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourite);
