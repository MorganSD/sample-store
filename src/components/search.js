import React, { Component } from 'react';
import searchIcon from '../Icon Simplestore/search.png';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from '../axios';

class Search extends Component{
    constructor(){
        super();
        this.state = {
            products :[],
            filteredProduct :[],
            searchState : false
        }
        this.searching = this.searching.bind(this);
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
        searchState:true
    })
    if(event.target.value === ''){
        this.setState({
            searchState:false
        })
    }
}
    render(){
        let filtered = this.state.products.filter((product) => {
            return product.title.indexOf(this.state.filteredProduct) !== -1 ;
        })
        return(
            <React.Fragment>

                <label><img src={searchIcon} /></label>
                <input type="text" placeholder="جستجو" onChange={this.searching} value={this.state.filteredProduct}></input>
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
                </ul>
            </React.Fragment>
            
        
        )
    }
}
export default Search;