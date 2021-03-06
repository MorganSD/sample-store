import React, { Component } from 'react';
import Product from './product';
import "../style/itemList.css";
import axios from '../axios';
import SidebarMain from "./sidebar";
import "../style/style.css";
import {connect} from 'react-redux';
import Pagination from '../components/pagination';
import {nextPaginate , prevPaginate ,all_list , search_filter} from '../actions/actions';
import Header from "../components/header";

class SearchResult extends Component {
    constructor(){
        super();
        this.state ={
          items:[],
            filtered_item :[]
        }
    }
    componentWillMount(){
      if(this.props.match.params.search ){
        const filter = this.props.match.params.search
        this.props.search_filter(filter);
        if(this.props.location.hash){
    // this.props.history.push(null, null, window.location.href.split('#')[0]);
          this.props.location.hash.replace('')
          // const field = this.props.location.hash
          // const choice = this.props.location.serach
          // this.props.filter_list(category , field , choice);
        }
        
    }else{
      this.props.all_list();
    } }
pageIncrease =(next) => {
  this.props.nextPage(next);
}
pageDecrease = (prev) => {
  this.props.prevPage(prev)
}
render(){
  // const filter_val = this.props.match.params
  // let filter_items = this.state.items.filter( (item) => {return item.title.indexOf(this.props.search_filter) !== -1 })
  // console.log(filter_items , this.state.items , 'items',this.props.search_filter)
  let filter_items = this.props.product_list.products
    return(
      <>
      <Header />
      <div id='home'>
      <SidebarMain match={this.props.match}/>
        <section className="homeList">
        {filter_items ? (
          filter_items.length != 0 ? (
          filter_items.map(item => <Product product={item} />)
        ) :<h3>محصولی یافت نشد</h3>):<h3>محصولی یافت نشد</h3>
        
         
        }
    <Pagination list={this.props.product_list} increase ={this.pageIncrease} decrease={this.pageDecrease} />
      </section>
      </div>
      </>
    )
}
}
const mapStateToProps = state => {
  return {
    search_filter: state.InitUserReducer.search_val ,
    product_list : state.InitUserReducer.product_list,
   
  };
};
const mapDispatchToProps = {
  nextPage : nextPaginate,
  prevPage : prevPaginate, 
  initList : all_list,
  search_filter : search_filter

};

export default connect(
  mapStateToProps,mapDispatchToProps
)(SearchResult);
