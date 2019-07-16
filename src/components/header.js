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
    this.closePopUp = this.closePopUp.bind(this);
  }
  
  componentDidMount() {
    // console.log('redux' , this.props)
    axios.get("/shelves/categories/menu/list").then(response => {
      // console.log(response.data.data)
      this.setState({
        categories: response.data.data.categories
      });
    });
   
  }
componentDidUpdate(prevProps, prevState){
//   if(prevProps.currentUser.token != this.props.currentUser.token){
//     console.log('userChanged' , this.props.currentUser);
//   }
}



login() {
    this.setState({
      loginPopUp: !this.state.loginPopUp
    });
  }
  closePopUp() {
   this.cardDisplayChange();
  }
  cardDisplaying = (e) => {
    
    // if(e.target.checked){
    //   this.setState({
    //     cardDisplay : true
    //   });

    // }else{
    //   this.setState({
    //     cardDisplay : false
    //   });
    // }
    this.props.cardDisplayChange();
  }
  render() {
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
                <img src={like} />
              </li>
              <li>
                {
                  this.state.guest ? (
                  <Link to={`/user/login`}>
                    <a href="#">ثبت نام</a>/<a href="#"> ورود</a>
                  </Link>
                  ):
             
                <h4>logOUT</h4>
                }
               
              </li>
            </ul>
            <ul className="categoryList">
              {this.state.categories ? (
                this.state.categories.map(category => (
                  <li key={category.title}>
                    <Link to={`/${category.address}`}>{category.title}</Link>
                  </li>
                ))
              ) : (
                <li> </li>
              )}
            </ul>
          </div>
        </header>
        {this.state.loginPopUp ? (
          <div className="popUps">
            <img src={close} onClick={this.closePopUp} />
            <Login />
          </div>
        ) : null}
       {
         this.props.cardDisplay ? (
           <Card />
         ):
         null

       }
      </React.Fragment>

    );
  }
}
const mapStatToProps = (state) =>{
  return {
    currentUser : state.currentUser,
    cardDisplay : state.cardDisplay
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    cardDisplayChange : () => {dispatch({type: 'CARD_DISPLAY'})}
  }
}
export default connect(mapStatToProps , mapDispatchToProps)(Header);
