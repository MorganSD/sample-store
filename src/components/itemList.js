import React, { Component } from "react";
import axios from "../axios";
import Product from "./product";
import queryString from "query-string";
import Spinner from './details/spinner';
import "../style/itemList.css";
import {connect} from 'react-redux';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageInfo: {},
      spinner:'block'
    };

    // this.handlePageChange = this.handlePageChange.bind(this);
    this.pageIncrease = this.pageIncrease.bind(this);
    // this.pageDecrease = this.pageDecrease.bind(this)
  }
  updateCurrentList = (data) =>{
    // this.props.updateCurrentListOfProducts(data);
  }
  componentWillMount() {
    if (this.props.cat === "all") {
      axios.get(`/shelves/products/`).then(response => {
        console.log(response);
        this.updateCurrentList(response.data.data);
        this.setState({
          spinner:'none',
          items: response.data.data.products,
          pageInfo: {
            current_page: response.data.data.current_page,
            total_page: response.data.data.page_count
          }
        });
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cat != this.props.cat) {
      if (
        this.props.cat === "-price" ||
        this.props.cat === "price" ||
        this.props.cat === "new" ||
        this.props.cat === "favorite"
      ) {
        axios
          .get(`/shelves/products/?sort_by=${this.props.cat}`)
          .then(response => {
            this.updateCurrentList(response.data.data);

            // console.log(response)
            this.setState({
              spinner:'none',
              items: response.data.data.products,
              pageInfo: {
                current_page: response.data.data.current_page,
                total_page: response.data.data.page_count
              }
            });
          });
      } else if (this.props.cat === "all") {
        axios.get(`/shelves/products/`).then(response => {
          this.updateCurrentList(response.data.data);

          // console.log(response)
          this.setState({
            spinner:'none',
            items: response.data.data.products,
            pageInfo: {
              current_page: response.data.data.current_page,
              total_page: response.data.data.page_count
            }
          });
        });
      } else {
        console.log("new cat", this.props.cat);

        axios
          .get(`/shelves/category/address/${this.props.cat}/products/`)
          .then(response => {
            this.updateCurrentList(response.data.data);

            // console.log(response)
            this.setState({
              spinner:'none',
              items: response.data.data.products,
              pageInfo: {
                current_page: response.data.data.current_page,
                total_page: response.data.data.page_count
              }
            });
          });
      }
    }
  }
  pageIncrease() {
    // if (this.state.pageInfo.current_page < this.state.pageInfo.total_page) {
      let next = this.state.pageInfo.current_page + 1;
      console.log(this.state.pageInfo);
      if (this.props.cat === "all") {
        // if(this.state.pageInfo.current_page < this.state.pageInfo.total_page){
        axios.get(`/shelves/products/?page=${next}`).then(response => {
          this.setState({
            items: response.data.data.products,
            pageInfo: {
              current_page: next
            }
          });
        });
        // }else{
        //   console.log('no change')
        //   return null
        // }
      } else if (
        this.props.cat === "-price" ||
        this.props.cat === "price" ||
        this.props.cat === "new" ||
        this.props.cat === "favorite"
      ) {
        axios
          .get(`/shelves/products/?sort_by=${this.props.cat}/?page=${next}`)
          .then(response => {
            this.setState({
              spinner:'none',
              items: response.data.data.products,
              pageInfo: {
                current_page: response.data.data.current_page
              }
            });
          });
      } else {
        axios
          .get(
            `/shelves/category/address/${this.props.cat}/products/?page=${next}`
          )
          .then(response => {
            this.setState({
              spinner:'none',
              items: response.data.data.products,
              pageInfo: {
                current_page: next
              }
            });
          });
      }
    // } else {
    //   alert("no next page");
    // }
  }

  render() {
    // let items = this.state.items.filter(item => item.in_stock > 0)
    // console.log('path', this.props.location.pathname)
    let items = this.props.product_list.products
    // let items = list.filter(item => item.in_stock > 0)
    // let items = this.props.product_list.products.filter(item => item.in_in_stock >0)
    console.log("total_page", this.state.pageInfo.total_page);
    return (
      <section className="homeList">
        {/* <Spinner display={this.state.spinner} /> */}
        {items ? (
          items.length !== 0 ?(
          items.map(item => <Product product={item} />)
       ):<h3>محصولی یافت نشد</h3> ) : (
        <h3>محصولی یافت نشد</h3>
        )}
        {this.state.pageInfo.total_page>1 ? (
        <div className="pagination">
          <div onClick={this.pageIncrease}>بعدی</div>
          <div onClick={this.pageDecrease}>قبلی</div>
        </div>
        ):null
        }
      </section>
    );
  }
}
const mapStatToProps = (state) =>{
  return {
    product_list : state.InitUserReducer.product_list,
  }
}

const mapDispatchToProps = {
  // return {
  //   updateCurrentListOfProducts: (data) => {
  //     dispatch({ type: "UPDATE_CURRENT_LIST_OF_PRODUCTS" , data : data});
  //   }
  // };
};
export default connect(
  mapStatToProps,
  mapDispatchToProps
)(ItemList);