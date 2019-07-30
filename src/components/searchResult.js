import React, { Component } from 'react';
import Product from './product';
import "../style/itemList.css";
import axios from '../axios';
import SidebarMain from "./sidebar";
import "../style/style.css";
import {connect} from 'react-redux';

class SearchResult extends Component {
    constructor(){
        super();
        this.state ={
          items:[],
            filtered_item :[]
        }
    }
componentWillMount(){
   
    axios.get(`/shelves/products/`).then(response => {
      this.setState({
        items: response.data.data.products,
       
      });
    })

}
render(){
  // const filter_val = this.props.match.params
  let filter_items = this.state.items.filter( (item) => {return item.title.indexOf(this.props.search_filter) !== -1 })
  console.log(filter_items , this.state.items , 'items',this.props.search_filter)
    return(
      <div id='home'>
        <SidebarMain />
        <section className="homeList">
        {filter_items ? (
          filter_items.length != 0 ? (
          filter_items.map(item => <Product product={item} />)
        ) :<h3>محصولی یافت نشد</h3>):<h3>محصولی یافت نشد</h3>
        
         
        }
        {/* <div className="pagination">
          <div onClick={this.pageIncrease}>بعدی</div>
          <div onClick={this.pageDecrease}>قبلی</div>
        </div> */}
      </section>
      </div>
    )
}
}
const mapStateToProps = state => {
  return { search_filter: state.InitUserReducer.search_val };
};


export default connect(
  mapStateToProps
)(SearchResult);
