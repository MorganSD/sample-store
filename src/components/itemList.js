import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/itemList.css";
import lightstar from "../Icon Simplestore/star.png";
import darkstar from "../Icon Simplestore/star (1).png";
import Addbasket from "../Icon Simplestore/Asset.png";
import noPhoto from "../Icon Simplestore/noPhoto.png";
import Rate from "./rate";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

function Thumbnail(props) {
  if (props.thumbnail != null) {
    return <img src={props.thumbnail} />;
  } else {
    return <img src={noPhoto} />;
  }
}

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageInfo: []
    };

    this.handlePageChange = this.handlePageChange.bind(this)
  }
  componentWillMount() {
    if (this.props.cat === "all") {
      let items = fetch(`http://api.projectant.aasoo.ir/shelves/products/`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
          accept: "application/json",
          "x-store-sub-address": "sib"
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.setState({
            items: response.data.products,
            pageInfo: {
              pageCount: response.data.page_count,
              itemsCountPerPage: response.data.page_size,
              totalItemsCount: response.data.count
            }
          });
        });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cat != this.props.cat) {
        if(this.props.cat === '-price' || this.props.cat === 'price'){
            let items = fetch(
                `http://api.projectant.aasoo.ir/shelves/products/?sort_by=${this.props.cat}`,
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
                  console.log(response.data.products);
                  this.setState({
                    items: response.data.products
                  });
                });
        }else if (this.props.cat === "all"){
            let items = fetch(`http://api.projectant.aasoo.ir/shelves/products/`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
          accept: "application/json",
          "x-store-sub-address": "sib"
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.setState({
            items: response.data.products,
            pageInfo: {
              pageCount: response.data.page_count,
              itemsCountPerPage: response.data.page_size,
              totalItemsCount: response.data.count
            }
          });
        });
        }else {
            console.log("new cat", this.props.cat);
     
            let items = fetch(
              `http://api.projectant.aasoo.ir/shelves/category/address/${
                this.props.cat
              }/products/`,
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
                console.log(response.data.products);
                this.setState({
                  items: response.data.products
                });
              });
        }
     
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`)

    this.setState({activePage: pageNumber})
  }
  render() {
    return (
      <section className="homeList">
        {this.state.items ? (
          this.state.items.map(item => (
            <div className="itemBox">
              <figure>
                <Link to={`/item/${item.address}`}>
                  <Thumbnail thumbnail={item.thumbnail} />
                </Link>
                <figcaption>
                  <span>
                    <img src={Addbasket} />
                    افزودن به سبد خرید
                  </span>
                </figcaption>
              </figure>

              <div className="item-summery">
                <p>
                  <Link to={`/item/${item.address}`}>{item.title}</Link>
                </p>
                <p>{item.price} تومان</p>

                <div className="rate">
                  <Rate product={item} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>not found</h1>
        )}
        {/* <div className="pagination">
          <Pagination
            activePage={this.state.pageInfo.pageCount}
            itemsCountPerPage={this.state.pageInfo.itemsCountPerPage}
            totalItemsCount={this.state.pageInfo.totalItemsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> */}
      </section>
    );
  }
}
export default ItemList;
