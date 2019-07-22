import React, { Component } from "react";
import "../style/favourite.css";
import { connect } from "react-redux";
import close from "../Icon Simplestore/close.png";

class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      favourite_ptoduct: false,
      currentUser: JSON.parse(localStorage.getItem("jwtToken"))
    };
  }
  componentDidMount() {
    if (this.props.favouriteProduct) {
      if (this.props.favouriteProduct.length != 0) {
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
    if (this.props.favouriteDisplay === true) {
      this.props.favouriteState();
    }
  };
  render() {
    return (
      <div className="favourite">
        <div>
          <img src={close} onClick={this.notDispaly} />
          {!this.state.currentUser.guest ? (
            <div>
              {this.state.favourite_ptoduct ? (
                this.props.favouriteProducts.map(product => (
                  <div className="items">
                    <img src={product.thumbnail} />
                    <div className="item-info">
                      <p>{product.title}</p>
                      <p>{product.price} تومان</p>
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
    favouriteDisplay: state.favouriteDisplay,
    favouriteProducts: state.favouriteProducts
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    favouriteState: () => {
      dispatch({ type: "FAVOURITE_DISPALY" });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourite);
