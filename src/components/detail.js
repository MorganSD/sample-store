import React, { Component } from "react";
import SliderImg from "./itemImgSlider";
import Rate from "./rate";
import Technical from "../components/details/technical-features";
import About from "./details/about";
import CommentRate from "./details/comment rates";
import Related from "./details/related products";
import Comments from "./details/comment";
import Breadcrumb from "./details/breadcrumb";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "../axios";
import { connect } from "react-redux";
import Choice from "../components/details/choice";

import Addbasket from "../Icon Simplestore/Asset-white.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import breadcrumbIcon from "../Icon Simplestore/apple-keyboard-control-3.png";
import notFav from "../Icon Simplestore/like.png";
import isFav from "../Icon Simplestore/like2.png";

import "../style/detail.css";
import "../style/react-tabs.css";
import "../style/itemList.css";

import {
  add_to_card,
  delete_favourite,
  add_favourite,
  favourite_display
} from "../actions/actions";

const FavImg = props => {
  if (props.favStatus) {
    return <img src={isFav} className="add-favourite" />;
  } else {
    return <img src={notFav} className="add-favourite" />;
  }
};

const Options = props => {
  if (props.options.type === "choice") {
    return <Choice options={props.options} />;
  } else {
    return <h4>selection</h4>;
  }
};

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      isFavourite: false
    };
  }
  componentWillMount() {
    const { address } = this.props.match.params;
    console.log(address);
    axios.get(`/shelves/product/address/${address}`).then(response => {
      if (response.data.data.product.favorite === true) {
        this.setState({
          isFavourite: true
        });
      } else {
        this.setState({
          isFavourite: false
        });
      }
      this.setState({
        product: response.data.data.product
      });
      console.log(response.data.data.product);
    });
  }

  componentDidUpdate(prevProps) {
    let { address } = this.props.match.params;
    if (prevProps.match.params != this.props.match.params) {
      axios.get(`/shelves/product/address/${address}`).then(response =>
        this.setState({
          product: response.data.data.product
        })
      );
    }
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

  addToCard = (max_order, slug) => {
    let cardStorage = JSON.parse(localStorage.getItem("card"));
    let item = cardStorage.cart_products.find(
      item => item.product.slug === slug
    );
    if (max_order === null) {
      max_order = 999;
    }
    if (item) {
      if (item.count < max_order) {
        this.props.addProductToCart(slug);
      } else {
        alert(`سقف سفارش ${max_order}`);
      }
    } else {
      this.props.addProductToCart(slug);
    }
    console.log("add", item, slug, max_order);
  };

  handleFavourite = slug => {
    if (this.state.isFavourite) {
      if (window.confirm("محصول از لیست مورد علاقه های شما حذف شود ؟")) {
        this.props.deleteFavorite(slug);
        this.setState({
          isFavourite: false
        });
      }
    } else {
      let currnet_user = JSON.parse(localStorage.getItem('jwtToken'))
      if(currnet_user.guest){
        this.favDispaly();
      }else{
        this.favDispaly();
        this.props.addFavourite(slug);
        this.setState({
          isFavourite: true
        });
      }
     
    }
  };
  favDispaly = () => {
    if (!this.props.favouriteDisplay) {
      this.props.favouriteDisplayChange();
    }
  };

  render() {
    var commaNumber = require("comma-number");

    return (
      <div id="detail">
        <div className="logo">
          <Link to="/all">
            <img src={formaloo} />
            <p>فرم ساز آنلاین فرمالو</p>
          </Link>
        </div>

        <ol className="breadcrumb">
          <Breadcrumb product={this.state.product} />
          <li>
            <img src={breadcrumbIcon} />
            <a src="#">{this.state.product.title}</a>
          </li>
        </ol>

        <div className="detailSummery">
          <div className="itemPic">
            <SliderImg product={this.state.product} />
          </div>
          <div className="detailSummeryContent">
            <h2>{this.state.product.title}</h2>
            <span className="rate">
              <Rate product={this.state.product} />
            </span>
            <div
              className="add-favourite-wrapper"
              onClick={() => {
                this.handleFavourite(this.state.product.slug);
              }}
            >
              <FavImg favStatus={this.state.isFavourite} />
            </div>

            <div className="product-options">
              {this.state.product.options
                ? this.state.product.options.map(option => (
                    <Options options={option} />
                  ))
                : null}
            </div>

            <div className="product-price">
              <p>{commaNumber(this.state.product.price)} تومان</p>
              <button
                className="basket-btn"
                onClick={() => {
                  this.addToCard(
                    this.state.product.max_order_count,
                    this.state.product.slug
                  );
                }}
              >
                <img src={Addbasket} />
                اضافه کردن به سبد خرید
              </button>

              <p>{this.state.product.short_description}</p>
            </div>
          </div>
        </div>

        <Tabs>
          <TabList>
            <Tab>درباره محصول</Tab>
            <Tab>مشخصات فنی</Tab>
            <Tab>نظرات</Tab>
          </TabList>

          <TabPanel>
            <About about={this.state.product.description} />
          </TabPanel>
          <TabPanel>
            <Technical tech={this.state.product} />
          </TabPanel>
          <TabPanel>
            <div className="comment-rate">
              <div>
                <div>{this.state.product.rate}</div>
                <div className="commnet-star">
                  <div>
                    <CommentRate product={this.state.product} />
                  </div>

                  <p>{this.state.product.ratings_count} مشارکت کننده</p>
                </div>
              </div>
              <span className="submitComment">ثبت نظر</span>
            </div>
            <Comments comment={this.state.product} />
          </TabPanel>
        </Tabs>

        <Related related={this.state.product} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    favouriteDisplay: state.InitUserReducer.favouriteDisplay
  };
};

const mapDispatchToProps = {
  addProductToCart: add_to_card,
  deleteFavorite: delete_favourite,
  addFavourite: add_favourite,
  favouriteDisplayChange: favourite_display
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
