import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import check from "../../Icon Simplestore/check.png";
import close from "../../Icon Simplestore/close.png";
import axios from "../../axios";
import { init_card } from "../../actions/actions";

class CostumerInfo extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      phone_number: "",
      email: "",
      first_name_state: false,
      phone_number_state : false ,
      email_state : false,
      error: ""
    };
  }
  componentDidMount(){
    // this.setState({
    //   first_name : this.props.cart.first_name,
    //   phone_number : this.props.cart.phone_number,
    //   email : this.props.cart.email
    // })
    console.log('edit props' , this.props.cart)
    
  }
  changeState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  editName = e => {
    e.preventDefault();
    axios
      .patch("/v2/orders/cart/update/", {
        first_name: this.state.first_name
      })
      .then(res => {
        if (res.status < 400) {
          this.props.init_card();
          this.setState({
            first_name_state: false
          });
        } else {
          this.setState({
            error: res.errors.form_errors
          });
        }
      })
      .catch(error => alert(error));
  };

  editPhone = e =>{
    e.preventDefault();
    axios
      .patch("/v2/orders/cart/update/", {
        phone_number: this.state.phone_number
      })
      .then(res => {
        if (res.status < 400) {
          this.props.init_card();
          this.setState({
            phone_number_state: false
          });
        } else {
          this.setState({
            error: res.errors
          });
        }
      })
      .catch(error => alert(error));
  }
  editEmail = e =>{
    e.preventDefault();
    axios
      .patch("/v2/orders/cart/update/", {
        email: this.state.email
      })
      .then(res => {
        if (res.status < 400) {
          this.props.init_card();
          this.setState({
            email_state: false
          });
        } else {
          this.setState({
            error: res.errors
          });
        }
      })
      .catch(error => alert(error));
  }
  render() {
    console.log('edittttt', this.state)
    console.log("edit contact info", this.state);
    console.log('edit error' , this.state.error)
    let cart = this.props.cart;
    return (
      <div id="customer-info">
        <h2>اطلاعات تماس گیرنده</h2>
        <div>
          <div>
            <p>نام و نام خانوادگی : {cart.first_name}</p>
            <span
              onClick={() => {
                this.setState({ first_name_state: true });
              }}
            >
              ویرایش
            </span>
            {this.state.first_name_state ? (
              <>
                <form
                  onSubmit={e => {
                    this.editName(e);
                  }}
                >
                  <input
                    type="text"
                    onChange={e => {
                      this.changeState(e);
                    }}
                    name="first_name"
                    value={this.state.first_name}
                    required
                  />
                  <img
                    src={close}
                    onClick={() => {
                      this.setState({ first_name_state: false , first_name : ''});
                    }}
                  />
                  <button type="submit">
                    {" "}
                    <img src={check} />{" "}
                  </button>
                </form>
                {this.state.error
                  ? this.state.error.form_errors 
                    ? this.state.error.form_errors.map(e => (
                        <span style={{ color: "red", fontSize: "13px" }} />
                      ))
                    : null
                  : null}
              </>
            ) : null}
          </div>

          <div>
            <p>شماره تماس : {cart.phone_number}</p>{" "}
            <span
              onClick={() => {
                this.setState({ phone_number_state: true , phone_number : ''});
              }}
            >
              ویرایش
            </span>
            {this.state.phone_number_state ? (
              <>
                <form
                  onSubmit={e => {
                    this.editPhone(e);
                  }}
                >
                  <input
                    type="text"
                    
                    onChange={e => {
                      this.changeState(e);
                    }}
                    name="phone_number"
                    value={this.state.phone_number}
                    required
                  />
                  <img
                    src={close}
                    onClick={() => {
                      this.setState({ phone_number_state: false });
                    }}
                  />
                  <button type="submit">
                    {" "}
                    <img src={check} />{" "}
                  </button>
                </form>
                {this.state.error
                  ? this.state.error.length > 0
                    ? this.state.error.map(e => (
                        <span style={{ color: "red", fontSize: "13px" }} />
                      ))
                    : null
                  : null}
              </>
            ) : null}
          </div>

          <div>
          <p>ایمیل : {cart.email}</p>
            <span
              onClick={() => {
                this.setState({ email_state: true });
              }}
            >
              ویرایش
            </span>
            {this.state.email_state ? (
              <>
                <form
                  onSubmit={e => {
                    this.editEmail(e);
                  }}
                >
                  <input
                    type="text"
                    onChange={e => {
                      this.changeState(e);
                    }}
                    name="email"
                    value={this.state.email}
                    required
                  />
                  <img
                    src={close}
                    onClick={() => {
                      this.setState({ email_state: false , email : ''});
                    }}
                  />
                  <button type="submit">
                    {" "}
                    <img src={check} />{" "}
                  </button>
                </form>
                {this.state.error
                  ? this.state.error.form_errors 
                    ? this.state.error.form_errors.map(e => (
                        <span style={{ color: "red", fontSize: "13px" }} />
                      ))
                    : null
                  : null}
              </>
            ) : null}
          </div>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.InitUserReducer.card.cart
  };
};
const mapDispatchToProps = {
  init_card: init_card
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CostumerInfo);
