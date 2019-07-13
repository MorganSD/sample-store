import React, { Component } from "react";
import axios from '../axios';
import Product from './product';
import queryString from 'query-string'
 
import "../style/itemList.css";




class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageInfo: [],
      
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    // this.pageIncrease = this.pageIncrease.bind(this)
  }
  componentWillMount() {
    const parse = window.location.search
    console.log('this.querySrtring' ,parse )
    if (this.props.cat === "all") {
      axios.get(`/shelves/products/`)
      .then(response => {
        // console.log(response)
        this.setState({
                  items: response.data.data.products 
        })
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cat != this.props.cat) {
        if(this.props.cat === '-price' || this.props.cat === 'price' || this.props.cat ==='new' || this.props.cat === 'favorite'){


            axios.get(`/shelves/products/?sort_by=${this.props.cat}`)
            .then(response => {
              // console.log(response)
              this.setState({
                        items: response.data.data.products 
              })
            })
        }else if (this.props.cat === "all"){

          axios.get(`/shelves/products/`)
          .then(response => {
            // console.log(response)
            this.setState({
                      items: response.data.data.products 
            })
          })
     
        }else {
            console.log("new cat", this.props.cat);
     
            axios.get(`/shelves/category/address/${this.props.cat}/products/`)
            .then(response => {
              // console.log(response)
              this.setState({
                        items: response.data.data.products 
              })
            })
         
        }
     
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`)

    this.setState({activePage: pageNumber})
  }
  pageIncrease(){
  if(this.state.pageInfo.current_page < this.state.pageInfo.total_page){
    let items = fetch(
      `http://api.projectant.aasoo.ir/shelves/products/?page=${this.state.pageInfo.current_page + 1}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
          accept: "application/json",
          "x-store-sub-address": "sib"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          items: response.data.products,
          pageInfo: {
            current_page : this.state.pageInfo.current_page + 1
 
          }
        });
      });
  }else{
    return null
  }
}

  
  
  render() {
    return (
      <section className="homeList">
        {this.state.items ? (
          this.state.items.map(item => (
           <Product product={item} />
          ))
        ) : (
          <h1>not found</h1>
        )}
        <div className="pagination" >
          {/* <div onClick={this.pageIncrease}>بعدی</div>
          <div onClick={this.pageDecrease}>قبلی</div>
          */}
        </div>
      </section>
    );
  }
}
export default ItemList;
