import React, { Component } from "react";
import "../style/formOrder.css";
import { connect } from "react-redux";
import axios from "../axios";
import { init_card } from "../actions/actions";
import { existing_address,init_selected_add } from '../actions/costumerInfo';
import {post_load_failed , post_load_success , post_req} from '../actions/post';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class SubmitForm extends Component {
  constructor() {
    super();
    this.state = {
      cities: {},
      states:{},
      selected_state :'',
      enableCities : false,
      contactInfo:{
        first_name :'',
        email:'',
        phone_number:'',
      },
      postInfo:{
        title :'',
        city:'',
        postal_code:'',
        phone_number:'',
        address:''
      },
      errors : []

    };
  }

  componentWillMount(){
    axios.get("/locations/states/").then(res => {
      if(res.status < 400){  
        console.log('states',res.data.data)
      this.setState({
        states : res.data.data
      })
    } 
    }).catch(error => console.log('states error',error)
    )

}
  changeState = (slug) =>{
    this.setState({
      selected_state : slug
    })
  }
  selectState = (event) => {
    axios.get(`/locations/states/state/${event.target.value}/cities/`).then(res =>{
      this.setState({
        enableCities : true,
        cities : res.data.data.cities
      })
    })
  }

  changeContact = (e) => {
    this.setState({
      contactInfo : {
        ...this.state.contactInfo ,
        [e.target.name] : e.target.value
      },
    })
  }
  changePost = (e) =>{
    this.setState({
      postInfo : {
        ...this.state.postInfo,
        [e.target.name] : e.target.value

      }
    })
  }
  setCity = (e) =>{
    this.setState({
      postInfo : {
        ...this.state.postInfo,
        city : e.target.value
      }
    })
  }
  addInfo = (e) =>{
    e.preventDefault();
    this.props.post_req();

    axios.post('/v2/profiles/address/add/',this.state.postInfo).then(res => {
      if(res.status < 400 ){
        this.props.existing_address();
        console.log('add add rs', res.data.data)
   
        
        axios.patch('/v2/orders/cart/update/',{
          first_name : this.state.contactInfo.first_name,
          phone_number : this.state.contactInfo.phone_number,
          email : this.state.contactInfo.email,
          delivering_address : res.data.data.address.slug
        }).then(response => {
          if(response.status < 400){
            this.props.init_card();
            this.props.changeState();
            this.props.post_load_success();
          }
        }).catch(error => {
          this.setState({
            errors: error.response.data.errors.form_errors
          })
        })

      }
    }).catch(error => {
      this.setState({
        errors: error.response.data.errors.form_errors
      })
    })

  }
  render() {
    let states = this.state.states.states
    console.log('cityyyy',this.state.postInfo,
    this.state.contactInfo)
    return (
      <form id="formOrder" onSubmit={(e) =>{this.addInfo(e)}}>
        <h2>اطلاعات تماس</h2>
        {!this.props.userLogin ? (
          <p>
            <Link to='/user/login' style={{color : 'blue'}}>ورود به حساب کاربری</Link>
          </p>
        ) : null}

        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          className="fullWidth"
          name='first_name'
          onChange ={this.changeContact}
          value={this.state.contactInfo.first_name}
        />
         {this.state.errors.first_name ? (
                <span className="form_errors">
                  {this.state.errors.first_name.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
        <input
          type="phone"
          placeholder="تلفن همراه"
          className="fullWidth"
          name='phone_number'
          onChange ={this.changeContact}
          value={this.state.contactInfo.phone_number}
          
        />
         {this.state.errors.phone_number ? (
                <span className="form_errors">
                  {this.state.errors.phone_number.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
        <input
          type="email"
          placeholder="ایمیل"
          className="fullWidth"
          name='email'
          onChange ={this.changeContact}
          value={this.state.contactInfo.email}
          
        />
         {this.state.errors.email ? (
                <span className="form_errors">
                  {this.state.errors.email.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
        {/* <input type="checkbox" id="news" className="check" />
        <label for="news">
          علاقه دارم از اخبار تخفیف ها و پیشنهادات ویژه با خبر شوم
        </label> */}

        <h2>آدرس ارسال</h2>
        <input type="text" placeholder="نام آدرس" className="fullWidth"  onChange={this.changePost} value={this.state.postInfo.title} name='title'/>
        {states? (
          <select onChange={this.selectState}>
          <option selected>استان</option>
          {states.map(state =>(
          <option value={state.slug} onClick={()=>{this.changeState(state.slug)}}>{state.name}</option>
          ))}
          </select>
        ) : null}
        {
          this.state.enableCities ?(
            this.state.cities ? (
            <select onChange={this.setCity}>
              <option selected>شهر</option>
              {this.state.cities.map(city => (
                <option value={city.slug}>{city.name}</option>
              ))}
            </select>
            ):null
            

          ):null
        }
         {this.state.errors.city ? (
                <span className="form_errors">
                  {this.state.errors.city.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
        <input type="text" placeholder="آدرس" className="fullWidth"  name='address'
          onChange={this.changePost}
          value={this.state.contactInfo.address}/>
           {this.state.errors.address ? (
                <span className="form_errors">
                  {this.state.errors.address.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
        <input
          type="text"
          placeholder="کدپستی"
          className="fullWidth"
          name='postal_code'
          onChange={this.changePost}
          value={this.state.postInfo.postal_code}
          
        />
         {this.state.errors.postal_code ? (
                <span className="form_errors">
                  {this.state.errors.postal_code.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
        {/* <input type="checkbox" for="reminder" className="check" />
        <label fro="reminder">یادت بمونه</label> */}

        <button type="submit" className="submit-btn">
          ادامه
        </button>

        {this.state.error ? 
        this.state.error.map(e =>(
          <h4 style={{color:'red'}}>{e}</h4>
        )):null}
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    userLogin: state.InitUserReducer.userLogedIn
  };
};
const mapDispatchToProps = {
  init_card : init_card,
  existing_address :existing_address,
  init_selected_add : init_selected_add,
  post_req : post_req,
  post_load_success : post_load_success,
  post_load_failed : post_load_failed
}
export default connect(mapStateToProps , mapDispatchToProps)(SubmitForm);
