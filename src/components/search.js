import React, { Component } from 'react';
import searchIcon from '../Icon Simplestore/search.png';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
        let products = fetch(`http://api.projectant.aasoo.ir/shelves/products/`,{ headers :{
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-api-key': '0f855b9c2f5ee2a21e530bcaa82a645286724fba',
            accept: 'application/json',
            'x-store-sub-address':'sib'
            }}
            )
        .then(response => response.json())
        .then(response => {console.log(response.data.products)
            this.setState({
                products:response.data.products
            })
        }
        )
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
                        <Link to={`/item/${item.address}`}>
                        {item.title}
                        
                        </Link>
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