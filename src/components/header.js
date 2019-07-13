import React, { Component } from "react";
import "../style/navbar.css";
import like from "../Icon Simplestore/like.png";
import close from '../Icon Simplestore/close.png'
import basket from "../Icon Simplestore/shopping-cart (2).png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Search from "../components/search";
import Login from '../components/login';
import axios from '../axios';





class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
     
      loginPopUp: false,
      cartPopUp : false

    };
    this.login = this.login.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
  }
  componentDidMount() {
   
    axios.get('/shelves/categories/menu/list')
    .then(response => {
      // console.log(response.data.data)
      this.setState({
        categories:response.data.data.categories
      })

    })
  }

  login() {
    this.setState({
      
      loginPopUp: !this.state.loginPopUp
    });
  }
  closePopUp(){
      this.setState({
          loginPopUp : false
      })
  }
  render() {
    console.log("login", this.state.loginPopUp);
    return (
        <React.Fragment>
      <header>
        <div className="wrap">
          <ul className="userTool">
            <li>
              <Search />
            </li>
            <li>
              <img src={basket} />
            </li>
            <li>
              <img src={like} />
            </li>
            <li>
              <Link to={`/user/login`}>
              <a href="#">ثبت نام</a>/<a href="#"> ورود</a>
              </Link>
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
      { this.state.loginPopUp ? 
        <div className='popUps'>
            <img src={close} onClick={this.closePopUp}/>
            <Login />
        </div>
        : null
}
</React.Fragment>
    );
  }
}

export default Header;
