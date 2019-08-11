import React, { Component } from "react";
import SidebarMain from "./sidebar";
import ItemList from "./itemList";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchResult from './searchResult';
import Select from 'react-select';
import Order from '../components/submitOrder';
import "../style/style.css";
import {connect} from 'react-redux';
import {sort_list} from '../actions/actions';
import ProgressBar from './details/progressBar'

const options = [
  { value: '-price', label: 'گران ترین' },
  { value: 'price', label: 'ارزان ترین' },
  { value: 'favorite', label: 'محبوب ترین' },
  { value: 'new', label: 'جدید ترین' }
];

class Home extends Component {
  constructor() {
    super();
    this.state = {
      category: "all",
      selectedOption : null
    };
  }

  handleChange = selectedOption => {
    let cat = this.props.product_list.category.slug
    this.setState({ category : selectedOption.value,
    selectedOption });
    // console.log('url',this.props.product_list.category.slug)
    this.props.sort(cat , selectedOption.value);
    // console.log(`Option selected:`, selectedOption);
    // console.log(this.props.match.params , 'param')
  };
  
  render() {
    const { selectedOption } = this.state;

    console.log("w cat", this.state.category);
    return (

      <div id="home">
        {/* {this.props.post_req ? : null} */}

        <SidebarMain />
        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder={'مرتب سازی براساس '}
/>
        
        <ItemList  location={this.props.location}/>
        {/* <Order /> */}
      </div>
    );
  }
}
const mapStatToProps = (state) =>{
  return {
    product_list : state.InitUserReducer.product_list,

  }
}
const mapDispatchToProps ={
  sort : sort_list
}
export default connect(mapStatToProps , mapDispatchToProps)(Home);
