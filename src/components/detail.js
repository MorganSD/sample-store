import React, { Component } from "react";
import SliderImg from "./itemImgSlider";
import Rate from "./rate";
import Technical from '../components/details/technical-features';
import About from './details/about';
import CommentRate from './details/comment rates';
import Related from './details/related products';
import Comments from './details/comment';
import Breadcrum from './details/breadcrum';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from '../axios';

import Addbasket from "../Icon Simplestore/Asset-white.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import breadcrumbIcon from "../Icon Simplestore/apple-keyboard-control-3.png";

import "../style/detail.css";
import "../style/react-tabs.css";
import "../style/itemList.css";


class Detail extends Component {
  constructor() {
    super();
    this.state = {
      product: []
    };
  }
  componentWillMount() {
    const { address } = this.props.match.params;
    console.log(address);
    axios.get(`/shelves/product/address/${address}`)
    .then( response => 
      this.setState({
        product: response.data.data.product
      })
    )
   
  }
componentDidUpdate(prevProps){
  if(prevProps.match.params != this.props.match.params){
    let {address} = this.props.match.params
    axios.get(`/shelves/product/address/${address}`)
    .then( response => 
      this.setState({
        product: response.data.data.product
      })
    )
   
  }
}
  render() {
    // console.log(this.state.product);
    return (
      <div id="detail">
        <div className="logo">
          <Link to="/all">
            <img src={formaloo} />
            <p>فرم ساز آنلاین فرمالو</p>
          </Link>
        </div>
        
          <ol className="breadcrumb">
            {/* <Breadcrum product={this.state.product} /> */}
            <li>
              <img src={breadcrumbIcon} />
              <a src="#">{this.state.product.title}</a>
            </li>
          </ol>
       
        <div className="detailSummery">
          <div className="itemPic">
            <SliderImg />
          </div>
          <div className="detailSummeryContent">
            <h2>{this.state.product.title}</h2>
            <span className="rate">
              <Rate product={this.state.product} />
            </span>
            <div>
              <p>{this.state.product.price} تومان</p>
              <button className="basket-btn">
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

export default Detail;
