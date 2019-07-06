import React, { Component } from "react";
import "../style/detail.css";
import breadcrumbIcon from "../Icon Simplestore/apple-keyboard-control-3.png";
import Slider from "./itemImgSlider";
import Rate from "./rate";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Addbasket from "../Icon Simplestore/Asset-white.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../style/react-tabs.css";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import "../style/itemList.css";
import Thumbnail from '../components/itemList';
import { Carousel } from 'react-responsive-carousel';


function About(props) {
  if (props.about === null || props.about === "") {
    return <p>اطلاعاتی درباره ی این محصول ثبت نشده است</p>;
  } else {
    return <div>{props.about}</div>;
  }
}
function Technical(props) {
  return (
    <table>
      <tbody>
        {props.tech ? (
          props.tech.map(data => (
            <tr>
              <td>{data.title}</td>
              <td>{data.value}</td>
            </tr>
          ))
        ) : (
          <h3>مشخصاتی ثبت نشده است</h3>
        )}
      </tbody>
    </table>
  );
}
function Comment(props) {}



// function Related(props) {
  

//     return (
//       <Carousel>
//          <section className="homeList">
//             {props.product ? (
//             props.product.map(item => (
//             <div className="itemBox">
                
//                 <figure>
//                     <Link to={`/item/${item.address}`}>
//                         <Thumbnail thumbnail={item.thumbnail} />
//                      </Link>
//                     <figcaption>
//                         <span>
//                             <img src={Addbasket}/>  
//                             افزودن به سبد خرید
//                         </span> 
//                     </figcaption>
                   
//                 </figure>
              
               
//                 <div className="item-summery">
//                     <p><Link to={`/item/${item.address}`}>{item.title}</Link></p>
//                     <p>{item.price} تومان</p>
                   
//                      <div className="rate">
//                          <Rate product={item} />
//                      </div>  
                         
//                 </div>
//             </div>
//             ))
// ):
// <h1>not found</h1>
// }
           
//         </section>


//       </Carousel>
//     );
  
 
// }
function Breadcrum(props) {
  if (props.product.bread_crumb.parent_category != null) {
    return (
      <li>
        <a src="#">{props.product.bread_crumb.parent_category}</a>
      </li>
    );
  }
  if (props.product.bread_crumb.title != null) {
    return (
      <li>
        <img src={breadcrumbIcon} />
        <a src="#">{props.product.bread_crumb.title}</a>
      </li>
    );
  }
}
class Detail extends Component {
  constructor() {
    super();
    this.state = {
      // lists: [],
      product: []
    };
  }
  componentWillMount() {
    const { address } = this.props.match.params;
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
          // product: response.data.products.find(item => item.address === address)
        });
      });
  }

  render() {
    console.log(this.state.product);
    return this.state.product ? (
      <div id="detail">
        <div className="logo">
          <Link to="/">
            <img src={formaloo} />
            <p>فرم ساز آنلاین فرمالو</p>
          </Link>
        </div>
        {this.state.product.categories ? (
          <ol className="breadcrumb">
            <Breadcrum product={this.state.product} />
            <li>
              <img src={breadcrumbIcon} />
              <a src="#">{this.state.product.title}</a>
            </li>
          </ol>
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
            <Technical tech={this.state.product.data} />
          </TabPanel>
          <TabPanel>
            {/* <Comment comment={this.state.product}  /> */}
            <div className="comment-rate">
              <div>average</div>
              <div className="commnet-star">
                <Rate product={this.state.product} />
                <p>{this.state.product.ratings_count}</p>
              </div>
            </div>
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
          </TabPanel>
        </Tabs>

       
          {/* <Related product={this.state.product.related_products} /> */}
        
      </div>
    ) : (
      <h1 />
    );
  }
}

export default Detail;
