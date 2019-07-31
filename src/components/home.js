import React, { Component } from "react";
import SidebarMain from "./sidebar";
import ItemList from "./itemList";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchResult from './searchResult';
import Select from 'react-select';
import Order from '../components/submitOrder';
import "../style/style.css";

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

  componentDidMount() {
    if (this.props.match.params.category != "all") {
      this.setState({
        category: this.props.match.params.category
      });
    }

    // console.log('param is ' + this.props.match.params.category)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      // console.log('nextprop',this.props.match.params.category)
      this.setState({
        category: this.props.match.params.category
      });
    }
    //  console.log('didUpdate',this.state.category)
  }
  handleChange = selectedOption => {
    this.setState({ category : selectedOption.value,
    selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  
  render() {
    const { selectedOption } = this.state;

    console.log("w cat", this.state.category);
    return (

      <div id="home">
        <SidebarMain />
        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder={'مرتب سازی براساس '}
/>
        {/* <select className="sort" onChange={this.sorting}>
          <option value="all">همه</option>
          <option value="-price">گران ترین</option>
          <option value="price">ارزان ترین</option>
          <option value="favorite">محبوب ترین </option>
          <option value="new">جدید ترین</option>
        </select> */}
        <ItemList cat={this.state.category} location={this.props.location}/>
        {/* <Order /> */}
      </div>
    );
  }
}

export default Home;
