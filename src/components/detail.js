import React, { Component } from "react";
import "../style/detail.css";
import breadcrumbIcon from "../Icon Simplestore/apple-keyboard-control-3.png";
import Slider from "./itemImgSlider";
import Rate from "./rate";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Addbasket from "../Icon Simplestore/Asset-white.png";
import formaloo from '../Icon Simplestore/formaloo-01.png';

function About(props) {
  if (props.about.description === null || props.about.description === "") {
    return <p>اطلاعاتی درباره ی این محصول ثبت نشده است</p>;
  } else {
    return props.about.description;
  }
}
function Technical(props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>وزن</td>
          <td>{props.tech.weight}</td>
        </tr>
        <tr>
          <td>واحد وزن</td>
          <td>{props.tech.weight_unit}</td>
        </tr>
        <tr>
          <td>وزن</td>
          <td>{props.tech.weight}</td>
        </tr>
        <tr>
          <td>وزن</td>
          <td>{props.tech.weight}</td>
        </tr>
        <tr>
          <td>وزن</td>
          <td>{props.tech.weight}</td>
        </tr>
        <tr>
          <td>وزن</td>
          <td>{props.tech.weight}</td>
        </tr>
      </tbody>
    </table>
  );
}

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      product: []
    };
  }
  componentWillMount() {
    const { address } = this.props.match.params;
    let lists = fetch("http://api.projectant.aasoo.ir/shelves/products/", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
        accept: "application/json",
        "x-store-sub-address": "sib"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.data.products);
        this.setState({
          lists: response.data.products,
          product: response.data.products.find(item => item.address === address)
        });
      });
  }

  render() {
    console.log(this.state.product);
    return this.state.product ? (
      <div id="detail">
        <div className="logo"> 
          <img src={formaloo} />
          <p>فرم ساز آنلاین فرمالو</p>
        </div>
        {this.state.product.categories ? (
          this.state.product.categories.map(cat => (
            <ol className="breadcrumb">
              <li>
                <a src="#">{cat.title}</a>
              </li>
              <li>
                <img src={breadcrumbIcon} />
                <a src="#">{this.state.product.title}</a>
              </li>
            </ol>
          ))
        ) : (
          <h2 />
        )}
        <div className="detailSummery">
          <div className="itemPic">
            <Slider />
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
              <p>
                {this.state.product.short_description}
              </p>
            </div>
          </div>
        </div>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="detialGeneral">
            <ul>
              <li>
                <Link to={`/item/${this.state.product.address}/about`}>
                  درباره ی محصول
                </Link>
              </li>
              <li>
                <Link to={`/item/${this.state.product.address}/tech`}>
                  مشخصات فنی
                </Link>
              </li>
              <li>امتیازدهی و نظرات</li>
            </ul>
            <div>
              <Route
                path="/item/:address/about"
                render={props => (
                  <About {...props} about={this.state.product} />
                )}
              />

              <Route
                path="/item/:address/tech"
                render={props => (
                  <Technical {...props} tech={this.state.product} />
                )}
              />
            </div>
          </div>
        </Router>
      </div>
    ) : (
      <h1 />
    );
  }
}

export default Detail;
