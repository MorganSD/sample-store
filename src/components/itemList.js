import React, { Component } from "react";
import axios from "../axios";
import Product from "./product";
import queryString from "query-string";
import Spinner from './details/spinner';
import "../style/itemList.css";
import {connect} from 'react-redux';
import {prevPaginate , nextPaginate} from '../actions/actions';
import Pagination from '../components/pagination';

// class Pagination extends Component {
//   render(){
//     const diActive = {
//       display : 'none'
//     }

//   if(this.props.list.page_count > 1){
//     if(this.props.list.current_page === 1){
//       return (
//         <div className="pagination">
//         <div onClick={() =>{this.props.increase(this.props.list.next)}}>بعدی</div>
//         <div onClick={() => {this.props.decrease(this.props.list.previous)}} style={diActive}>قبلی</div>
//       </div>
//       )
//     }else if(this.props.list.current_page === this.props.list.page_count){
//         return (
//           <div className="pagination">
//           <div onClick={() =>{this.props.increase(this.props.list.next)}} style={diActive}>بعدی</div>
//           <div onClick={() => {this.props.decrease(this.props.list.previous)}}>قبلی</div>
//         </div>
//         )
//     }else {
//       return (
//         <div className="pagination">
//         <div onClick={() =>{this.props.increase(this.props.list.next)}}>بعدی</div>
//         <div onClick={() => {this.props.decrease(this.props.list.previous)}}>قبلی</div>
//       </div>
//       )
//     }
//   }else{
//     return null
//   }
// }
// }

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