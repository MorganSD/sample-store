import React, { Component } from "react";
import "../style/detail.css";
import breadcrumbIcon from "../Icon Simplestore/apple-keyboard-control-3.png";
import SliderImg from "./itemImgSlider";
import Rate from "./rate";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Addbasket from "../Icon Simplestore/Asset-white.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../style/react-tabs.css";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import lightstar from "../Icon Simplestore/star.png";
import darkstar from "../Icon Simplestore/star (1).png";
import halfStar from "../Icon Simplestore/Group 771.png";
import "../style/itemList.css";
// import Thumbnail from "../components/itemList";
import Carousel from '../components/carousel';
function Breadcrum(props) {
  if (props.product.bread_crumb) {
    if(props.product.bread_crumb.length === 0 ){
      return null;
    }else{
      console.log("bread", props.product.bread_crumb.address);
      if(props.product.bread_crumb.parent_category != null){
        return (
          <li>
            <Link to={`/${props.product.bread_crumb.address}`}>
              {props.product.bread_crumb.parent_category}
            </Link>
            <img src={breadcrumbIcon} />
          </li>
        );
      }
    
      if (props.product.bread_crumb.title != null) {
        return (
          <li>
            <a src="#">{props.product.bread_crumb.title}</a>
            <img src={breadcrumbIcon} />
          </li>
        );
      }
    }
    
  }else{
    return null;
  }
 
}

function About(props) {
  if (props.about === null || props.about === "") {
    return <p>اطلاعاتی درباره ی این محصول ثبت نشده است</p>;
  } else {
    return <div>{props.about}</div>;
  }
}
function Technical(props) {
  if (props.tech.data) {
    if (props.tech.data.length === 0) {
      return <p>مشخصاتی درباره این محصول ثبت نشده است</p>;
    } else {
      return (
        <table>
          <tbody>
            {props.tech.data.map(data => (
              <tr key={data.slug}>
                <td>{data.title}</td>
                <td>{data.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  } else {
    return <p>مشخصاتی درباره این محصول ثبت نشده است</p>;
  }
}

function CommentRate(props) {
  if (props.product.rate >= 0 && props.product.rate < 1) {
    return (
      <React.Fragment>
        <p>از ۵ </p>
        <img src={halfStar} />
      </React.Fragment>
    );
  } else if (props.product.rate >= 1 && props.product.rate < 2) {
    return (
      <React.Fragment>
        <p>از ۵ </p>
        <img src={darkstar} />
      </React.Fragment>
    );
  } else if (props.product.rate >= 2 && props.product.rate < 3) {
    return (
      <React.Fragment>
        <p>از ۵ </p>
        <img src={darkstar} />
        <img src={darkstar} />
      </React.Fragment>
    );
  } else if (props.product.rate >= 3 && props.product.rate < 4) {
    return (
      <React.Fragment>
        <span>از ۵ </span>
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
      </React.Fragment>
    );
  } else if (props.product.rate >= 4 && props.product.rate < 5) {
    return (
      <React.Fragment>
        <p>از ۵ </p>
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
      </React.Fragment>
    );
  } else if (props.product.rate === 5) {
    return (
      <React.Fragment>
        <p>از ۵ </p>
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
        <img src={darkstar} />
      </React.Fragment>
    );
  } else {
    return <span />;
  }
}


function Related(props) {
  if (props.related.related_products) {
    let relatedProduct = props.related.related_products.length;
    console.log("length", relatedProduct);
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

function Comments(props) {
  if (props.comment.answered_questions) {
    if (props.comment.answered_questions.length === 0) {
      return <p>نظری ثبت نشده است</p>;
    } else {
      return (
        <>
          {props.comment.answered_questions.map(comment => (
            <div className="comment-box">
              <img src={noPhoto} />
              <div>
                <p>
                  <span>نام و نام خانوادگی</span>
                  <span>rate</span>
                </p>

                <div>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }
  }
}
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
    let lists = fetch(
      `http://api.projectant.aasoo.ir/shelves/product/address/${address}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
          accept: "application/json",
          "x-store-sub-address": "sib"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response.data.product);
        this.setState({
          product: response.data.product
        });
      });
  }
componentDidUpdate(prevProps){
  if(prevProps.match.params != this.props.match.params){
    let {address} = this.props.match.params
    let lists = fetch(
      `http://api.projectant.aasoo.ir/shelves/product/address/${address}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
          accept: "application/json",
          "x-store-sub-address": "sib"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response.data.product);
        this.setState({
          product: response.data.product
        });
      });
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
                  <CommentRate product={this.state.product} />
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
