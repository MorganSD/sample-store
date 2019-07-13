import React, { Component } from 'react';
import '../style/signup.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userSignUpRequest } from '../actions/signUpActions';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';


class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            name : '',
            email :'',
            phone : '',
            password : ''
            // re_password :''
        }
        this.handleChange = this.handleChange.bind(this);
        this.signUpForm = this.signUpForm.bind(this);
        

    }
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    isFormValid(){
        if(this.state.name != null ||  this.state.name != ''){
            console.log('name valid')
            if(this.state.email != null ||  this.state.email != ''){
                console.log('mail not null')        
                let mailValidation = EmailValidator.validate(this.state.email); 
                if(mailValidation){
                    console.log('mail valid')
                    if(this.state.phone != null ||  this.state.phone != ''){
                        console.log('phone valid')
                        if(this.state.password != null ||  this.state.password != ''){
                            console.log('pass valid');
                            return true;
                        }else{
                            // document.getElementsByClassName("signUpError").innerHTML = 'رمز عبور را وارد کنید'
                            return false ;
                              
                        }
                    }else{
                        return false
                    }
                }else{
                    return false
                }
                
            }else{
                return false
            }
        }else{
            return false
        }
    }
    signUpForm(){
        if(!this.isFormValid){
            return false;
        }
        else{
            this.props.userSignUpRequest(this.state);
        }
  
    }
    render(){
        const isFormValid = this.isFormValid();
        return(
            <React.Fragment>
            <p className="signInForm">ثبت نام در فرمالو</p>
            <form onSubmit={e => {
                this.addUser(e);}}>
                <label>نام و نام خانودگی</label>
                <input name='name' type="text" onChange={this.handleChange} value={this.state.name}/>
                <span className='signUpError'></span>

                <label>ایمیل</label>
                <input name='email' type="email" onChange={this.handleChange} value={this.state.email}/>
                <span className='signUpError'></span>


                <label>شماره همراه</label>
                <input name='phone' type="phone" onChange={this.handleChange} value={this.state.phone}/>
                <span className='signUpError'></span>


                <label>رمز عبور</label>
                <input name='password' type="password" onChange={this.handleChange} value={this.state.password}/>
                <span className='signUpError'></span>
{/* 
                <label>تکرار رمز عبور</label>
                <input name='re_password' type ="password" onChange={this.handleChange} value={this.state.re_password}/>
                <span className='signUpError'></span> */}

                <button disabled={!isFormValid} type="submit">ثبت نام</button>
            </form>
            <p>
                حساب کاربری دارید ؟
                <Link to={'/:category/login'}> وارد شوید</Link>
            </p>
            </React.Fragment>
        );
    }

  
}
SignUp.propTypes = {
    userSignUpRequest : PropTypes.func.isRequired
}
export default connect((state) => {return {} } , {userSignUpRequest} )(SignUp)