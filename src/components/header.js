import React, { Component } from "react";
import "../style/navbar.css";
import like from "../Icon Simplestore/like.png";
import close from "../Icon Simplestore/close.png";
import basket from "../Icon Simplestore/shopping-cart (2).png";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
import Search from "../components/search";
import Login from "../components/login";
import axios from "../axios";
import Card from "./card";
import { connect } from "react-redux";
import Favourite from "../components/favourite";
import LogOut from "../components/logOut";
import {
  card_dispaly,
  favourite_display,
  list_by_cat
} from "../actions/actions";
import { post_req, post_load_success, post_load_failed } from "../actions/post";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      guest: true,
      ham_list: false
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.post_req();
    axios
      .get("/shelves/categories/menu/list")
      .then(response => {
        if (response.status < 400) {
          this.props.post_load_success();
          this.setState({
            categories: response.data.data.categories
          });
        }
      })
      .catch(error => {
        // console.log("categories", error);
        this.props.post_load_failed(error.response.data.errors);
      });
    document.addEventListener("keydown", this.escFunction, false);
  }

  escFunction = () => {
    if (this.props.cardDisplay) {
      this.cardDisplaying();
    }
    if (this.props.favouriteDisplay) {
      this.favouriteDisplaying();
    }
  };

  login() {
    this.setState({
      loginPopUp: !this.state.loginPopUp
    });
  }

  cardDisplaying = () => {
    this.props.cardDisplayChange();
  };

  favouriteDisplaying = () => {
    this.props.favouriteDisplayChange();
  };
  getList = address => {
    this.props.get_list_cat(address);
  };
  ham_list_display = () => {
    this.setState({
      ham_list: !this.state.ham_list
    });
  };
  render() {
    const user = JSON.parse(localStorage.getItem("jwtToken"));

    // console.log("redux login", this.props.userLogedIn);
    // console.log("redux header", this.props.currentUser);
    // console.log("display", this.props.cardDisplay);
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
                <img src={like} onClick={this.favouriteDisplaying} />
              </li>
              <li>
                {!this.props.userLogedIn ? (
                  <div>
                    <Link to={`/user/sign-up`}>ثبت نام</Link>/
                    <Link to={`/user/login`}> ورود </Link>
                  </div>
                ) : (
                  <div className='panel_wraper'>
                   <LogOut />
                  </div>
                )}
              </li>
            </ul>
            <ul className="categoryList">
              {this.state.categories ? (
                this.state.categories.map(category => (
                  <li key={category.title}
                    ><NavLink to={{
                      pathname :`/${category.address}`,
                      // hash : `#${category.address}`
                    }} onClick={()=>{this.getList(category.address)}}>{category.title}</NavLink>
                  </li>
                ))
              ) : (
                <li> </li>
              )}
            </ul>
            <span className="cat_hamMenu">
              <input type="checkbox" id="cat_hamMenu_check" checked={this.state.ham_list} onChange={()=>{this.ham_list_display()}}/>
              <label for="cat_hamMenu_check">
                <span></span>
              </label>
            </span>
            {this.state.ham_list ? (
              <ul className="cat_hamMenu_list">
                {this.state.categories ? (
                  <>
                  {/* <li onClick={()=>{{this.setState({
                          ham_list:false
                        })}}}><Link to={'/'}>خانه</Link></li>  */}
                  {
                      this.state.categories.map(category => (
                        <li key={category.title} onClick={()=>{{this.setState({
                          ham_list:false
                        })}}}>
                          <NavLink
                            to={{
                              pathname: `/${category.address}`
                              // hash : `#${category.address}`
                            }}
                            onClick={() => {
                              this.getList(category.address);
                            }}
                          >
                            {category.title}
                          </NavLink>
                        </li>
                      ))
                  }
                </>
                ) : (
                  null
                )}
              </ul>
            ) : null}
          </div>
        </header>

        {this.props.cardDisplay ? <Card /> : null}
        {this.props.favouriteDisplay ? <Favourite /> : null}
      </React.Fragment>
    );
  }
}
const mapStatToProps = state => {
  return {
    currentUser: state.InitUserReducer.currentUser,
    cardDisplay: state.InitUserReducer.cardDisplay,
    favouriteDisplay: state.InitUserReducer.favouriteDisplay,
    userLogedIn: state.InitUserReducer.userLogedIn
  };
};
const mapDispatchToProps = {
  cardDisplayChange: card_dispaly,
  favouriteDisplayChange: favourite_display,
  get_list_cat: list_by_cat,
  post_req: post_req,
  post_load_success: post_load_success,
  post_load_failed: post_load_failed
};
export default connect(
  mapStatToProps,
  mapDispatchToProps
)(Header);
