import React, { Component } from 'react';
import searchIcon from '../Icon Simplestore/search.png';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from '../axios';
import { Redirect } from "react-router";
import {connect} from 'react-redux';
import { search_filter } from '../actions/actions';

class Search extends Component{
    constructor(){
        super();
        this.state = {
            products :[],
            filteredProduct :[],
            searchState : false,
            filterVal : null,
            redirectState : false

        }
        this.searching = this.searching.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount(){
      
        axios.get(`/shelves/products/`)
      .then(response => {
        // console.log(response)
        this.setState({
            products: response.data.data.products 
        })
      })
    }
searching(event){
    this.setState({
        filteredProduct : event.target.value.substr(0 , 20),
        filterVal :event.target.value,
        searchState:true
    })
    if(event.target.value === ''){
        this.setState({
            searchState:false
        })
    }
    // console.log(this.state.filterVal)

}
onSearch(event){
    this.props.searchFiltering(this.state.filterVal);
    event.preventDefault();
    this.setState({
        redirectState:true,
        filteredProduct : '',
        searchState : false
    })
}
    render(){

        let filtered = this.state.products.filter((product) => {
            return product.title.indexOf(this.state.filteredProduct) !== -1 ;
        })
        const { redirectState } = this.state;

        return(
            <React.Fragment>
        <form onSubmit={e => {
            this.onSearch(e);
          }} className='searchForm'>
                <label><img src={searchIcon} /></label>
                <input type="text" placeholder="جستجو" onChange={this.searching} value={this.state.filteredProduct} onSubmit={e => {this.onSearch(e)}}></input>
        </form>  
                <ul className='searchList'>
                    { this.state.searchState ?
                        filtered.map(item => (
                    <li>
                        <a href={`/item/${item.address}`}>
                        {item.title}
                        
                        </a>
                    </li>
                   )) :
                   (
                       <span></span>
                   )}
                    {redirectState && <Redirect to={`/search/${this.state.filterVal}`} />}
                </ul>
            </React.Fragment>
            
        
        )
    }
}

  
  const mapDispatchToProps = {
  
        searchFiltering : search_filter
      
    };
  
  export default connect(
    null,
    mapDispatchToProps
  )(Search);
  