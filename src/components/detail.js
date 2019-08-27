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
import SelectOption from "../components/details/select";
import { post_req, post_load_success, post_load_failed } from "../actions/post";
import Header from "../components/header";

import Addbasket from "../Icon Simplestore/Asset-white.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import breadcrumbIcon from "../Icon Simplestore/apple-keyboard-control-3.png";
import notFav from "../Icon Simplestore/like.png";
import isFav from "../Icon Simplestore/like2.png";
import GiveComment from "./details/giveComment";
import "../style/detail.css";
import "../style/react-tabs.css";
import "../style/itemList.css";

import {
  add_to_card,
  delete_favourite,
  add_favourite,
  favourite_display,
  all_list,
  checkOption,
  add_to_card_options
} from "../actions/actions";

const FavImg = props => {
  if (props.favStatus) {
    return <img src={isFav} className="add-favourite" />;
  } else {
    return <img src={notFav} className="add-favourite" />;
  }
};

const Options = props => {
  console.log("options", props.isEnable);
  if (props.options.choice_type === "color") {
    return <Choice options={props.options} selectOptionFunc={props.func} />;
  } else {
    // console.log(props.options,'options')
    return (
      <SelectOption options={props.options} selectOptionFunc={props.func} />
    );
    // return <h3>selection</h3>
  }
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      isFavourite: false,
      comment: false,
      subProducts: [],
      sub_pro : null,
      ableToAddToCart: false
    };
  }
  componentWillMount() {
    const { address } = this.props.match.params;
    console.log(address);
    this.props.post_req();

    axios
      .get(`/shelves/product/address/${address}`)
      .then(response => {
        if (response.status < 400) {
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
          axios
            .post(
              `/shelves/product/${response.data.data.product.slug}/sub_products/`
            )
            .then(res => {
              if (res.status < 400) {
                this.props.post_load_success();

                const sub = this.state.subProducts;
                sub.push(res.data.data.result.next_field);
                this.setState({
                  subProducts: sub
                });
              }
            })
            .catch(error => {
              this.setState({
                ableToAddToCart: true
              });
              console.log(error.response.data.errors.general_errors);
            });

          console.log(response.data.data.product);
        }
      })
      .catch(error => this.props.post_load_failed(error.response.data.errors));
  }

  componentDidUpdate(prevProps) {
    let { address } = this.props.match.params;
    if (prevProps.match.params != this.props.match.params) {

      axios
        .get(`/shelves/product/address/${address}`)
        .then(response => {
          if (response.status < 400) {
            this.setState({
              product: response.data.data.product
            });
          }
        })
        .catch(error => this.props.post_load_failed(error.response.data.errors));
    }
  }

  addOption = (choice, field) => {
    axios
      .post(`/shelves/product/${this.state.product.slug}/sub_products/`, {
        [field]: choice
      })
      .then(res => {
        if (res.status < 400) {
          if (res.data.data.result.next_field != null) {
            const array = this.state.subProducts;
            if (
              array.find(
                item => item.slug === res.data.data.result.next_field.slug
              )
            ) {
              const newArray = array.filter(
                item => item.slug != res.data.data.result.next_field.slug
              );
              newArray.push(res.data.data.result.next_field);
              this.setState({
                subProducts: newArray
              });
            } else {
              array.push(res.data.data.result.next_field);
              this.setState({
                subProducts: array
              });
            }
          } else {
            this.setState({
              sub_pro : res.data.data.result.sub_product,
              ableToAddToCart: true
            });
          }
        }
      });
    
  };
  checkCartProduct = () =>{
    if(this.state.sub_pro != null){
      this.addToCard( this.state.sub_pro.max_order_count,
        this.state.sub_pro.slug,
        this.state.sub_pro.options)
    }else{
      this.addToCard(
        this.state.product.max_order_count,
        this.state.product.slug,
        this.state.product.options
      );
    }
  }
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
      let currnet_user = JSON.parse(localStorage.getItem("jwtToken"));
      if (currnet_user.guest) {
        this.favDispaly();
      } else {
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
  getList = () => {
    this.props.init_list();
  };
  giveComment = () => {
    this.setState({
      comment: !this.state.comment
    });
  };
 

  render() {
    let disableButton = { display: "none" };
    var commaNumber = require("comma-number");
    console.log(this.props, "props");
    console.log(this.state, "props");
    return (
      <>
        <Header />
        <div id="detail">
          <div className="logo">
            <Link to="/" onClick={this.getList}>
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
              <div className="fav_rate_wrap">
                <h2>{this.state.product.title}</h2>
                <span className="rate">
                  <Rate product={this.state.product} />
                </span>
              </div>

              <div
                className="add-favourite-wrapper"
                onClick={() => {
                  this.handleFavourite(this.state.product.slug);
                }}
              >
                <FavImg favStatus={this.state.isFavourite} />
              </div>
              <div className="product-options">
                {this.state.subProducts
                  ? this.state.subProducts.map(sub => (
                      <Options options={sub} func={this.addOption} />
                    ))
                  : // this.state.product.options.map(option => (
                    //     <Options options={option} parent_slug={this.state.product.slug} isEnable={this.state[option.slug]}/>
                    //   ))
                    null}
              </div>

              <div className="product-price">
                {this.state.product.in_stock ? (
                  <>
                    <p>{commaNumber(this.state.product.price)} تومان</p>

                    <button
                      className="basket-btn"
                      style={!this.state.ableToAddToCart ? disableButton : null}
                      onClick={() => {
                        this.checkCartProduct()
                      }}
                    >
                      <img src={Addbasket} />
                      اضافه کردن به سبد خرید
                    </button>
                  </>
                ) : (
                  <h4>موجود نمی باشد</h4>
                )}

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
                <span
                  className="submitComment"
                  onClick={() => {
                    this.giveComment();
                  }}
                >
                  ثبت نظر
                </span>
              </div>
              {this.state.comment ? (
                <>
                  {this.props.isLoggedIn ? (
                    <GiveComment
                      slug={this.state.product.slug}
                      changeState={() => {
                        {
                          this.setState({ comment: false });
                        }
                      }}
                    />
                  ) : (
                    <p
                      style={{
                        margin: "10px 0",
                        borderBottom: "1px solid grey",
                        paddingBottom: "10px"
                      }}
                    >
                      برای ارسال نظر{" "}
                      <Link to="/user/login" style={{ color: "blue" }}>
                        وارد
                      </Link>{" "}
                      شوید
                    </p>
                  )}
                </>
              ) : null}
              <>
                {/* {this.props.isLoggedIn ? ():} */}
                <Comments comment={this.state.product} />
              </>
            </TabPanel>
          </Tabs>

          <Related related={this.state.product} />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    favouriteDisplay: state.InitUserReducer.favouriteDisplay,
    isLoggedIn: state.InitUserReducer.userLogedIn,
    subProduct: state.InitUserReducer.currentUser.complete_sub_pro
  };
};

const mapDispatchToProps = {
  addProductToCart: add_to_card,
  deleteFavorite: delete_favourite,
  addFavourite: add_favourite,
  favouriteDisplayChange: favourite_display,
  init_list: all_list,
  post_req: post_req,
  post_load_success: post_load_success,
  post_load_failed: post_load_failed,
  add_to_card_options: add_to_card_options
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
