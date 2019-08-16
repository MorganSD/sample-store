import React, { Component } from "react";
import "../style/navbar.css";
import like from "../Icon Simplestore/like.png";
import close from "../Icon Simplestore/close.png";
import basket from "../Icon Simplestore/shopping-cart (2).png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Search from "../components/search";
import Login from "../components/login";
import axios from "../axios";
import Card from "./card";
import {connect}  from 'react-redux';
import Favourite from '../components/favourite';
import LogOut from '../components/logOut';
import {card_dispaly,favourite_display ,list_by_cat} from '../actions/actions';
import {post_req , post_load_success , post_load_failed} from '../actions/post';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      // loginPopUp: false,
      // cartPopUp: false,
      // cardDisplay : false,
      guest : true
    };
    this.login = this.login.bind(this);
    // this.closePopUp = this.closePopUp.bind(this);
  }
  
  componentDidMount() {
    // console.log('redux' , this.props)
    // this.props.post_req();
    axios.get("/shelves/categories/menu/list").then(response => {
      if(response.status < 400){
        // this.props.post_load_success();
        this.setState({
          categories: response.data.data.categories
        });
      }else{
        // this.props.post_load_failed(response.errors)

      }
      
    }).catch(error =>{
      console.log('categories',error)
    })
   
  }




login() {
    this.setState({
      loginPopUp: !this.state.loginPopUp
    });
  }
 
  cardDisplaying = () => {
    this.props.cardDisplayChange();
  }

  favouriteDisplaying = () =>{
    this.props.favouriteDisplayChange();
  }
  getList = (address) =>{
    this.props.get_list_cat(address);
  }
  render() {
    console.log('redux login',this.props.userLogedIn)
      console.log('redux header',this.props.currentUser)
      console.log('display',this.props.cardDisplay)
    return (
      <React.Fragment>
        <header>
          <div className="wrap">
            <ul className="userTool">
              <li>
                <Search />
              </li>
              <li>
                <input
                  type="checkbox"
                  id="cardCheck"
                  onChange={this.cardDisplaying}
                />
                <label for="cardCheck">
                
                  <img src={basket} />
                </label>
              </li>
              <li>
                <img src={like} onClick={this.favouriteDisplaying}/>
              </li>
              <li>
                {
                  !this.props.userLogedIn ? ( 
                    <div>
                  <Link to={`/user/sign-up`}>
                    ثبت نام
                    </Link>
                    /
                    <Link to={`/user/login`}> ورود </Link>
                    </div>
                  
                ):  

                 <LogOut /> 
             } 
               
              </li>
            </ul>
            <ul className="categoryList">
              {this.state.categories ? (
                this.state.categories.map(category => (
                  <li key={category.title}
                    onClick={()=>{this.getList(category.address)}}>{category.title}
                  </li>
                ))
              ) : (
                <li> </li>
              )}
            </ul>
          </div>
        </header>
       
       {
         this.props.cardDisplay ? (
           <Card />
         ):
         null

       }
        {
         this.props.favouriteDisplay ? (
           <Favourite />
         ):
         null

       }
      </React.Fragment>

    );
  }
}
const mapStatToProps = (state) =>{
  return {
    currentUser : state.InitUserReducer.currentUser,
    cardDisplay : state.InitUserReducer.cardDisplay,
    favouriteDisplay : state.InitUserReducer.favouriteDisplay,
    userLogedIn : state.InitUserReducer.userLogedIn
  }
}
const mapDispatchToProps = {
  
  cardDisplayChange : card_dispaly ,
  favouriteDisplayChange : favourite_display,
  get_list_cat : list_by_cat,
  post_req : post_req,
  post_load_success : post_load_success,
  post_load_failed : post_load_failed
}
export default connect(mapStatToProps , mapDispatchToProps)(Header);
