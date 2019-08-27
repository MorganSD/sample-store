import React, { Component } from "react";
import axios from "../axios";
import Product from "./product";
import queryString from "query-string";
import Spinner from './details/spinner';
import "../style/itemList.css";
import {connect} from 'react-redux';
import {prevPaginate , nextPaginate} from '../actions/actions';
import Pagination from '../components/pagination';


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageInfo: {},
      spinner:'block'
    };

  }
  pageIncrease =(next) => {
    this.props.nextPage(next);
  }
  pageDecrease = (prev) => {
    this.props.prevPage(prev)
  }
  render() {
    
   
    let items = this.props.product_list.products
 
    console.log("total_page", this.state.pageInfo.total_page);
    return (
      <section className="homeList">
        {items ? (
          items.length > 0 ?(
          items.map(item => <Product product={item} />)
       ):<h3>محصولی یافت نشد</h3> ) : (
        <h3>محصولی یافت نشد</h3>
        )}
        
    <Pagination list={this.props.product_list} increase ={this.pageIncrease} decrease={this.pageDecrease} />
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
  nextPage : nextPaginate,
  prevPage : prevPaginate

};
export default connect(
  mapStatToProps,
  mapDispatchToProps
)(ItemList);