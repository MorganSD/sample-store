import React, { Component } from 'react';
import '../style/signup.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userSignUpRequest } from '../actions/signUpActions';
import PropTypes from 'prop-types';
import * as EmailValidator from 'email-validator';
import isNumeric from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmail';
import axios from '../axios';
class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            name : '',
            email :'',
            phone : '',
            password : '',
            error : null
            
        }
      }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    isFormValid = () => {
        switch(this.state){
            case this.state.name === '' : {
                return false
            }
            case this.state.name === null :{
                console.log('validation name')
                return false
            }
            case this.state.email === null|| this.state.email === '' : {
                console.log('validation email')

                return false
            }
            case this.state.phone === null|| this.state.phone === '' : {
                console.log('validation phone')

                return false
            }
            case this.state.password === null || this.state.password === '' : {
                console.log('validation pass')

                return false
            }
            default :
            return false
        }
        // if(this.state.name != null ||  this.state.name != ''){
        //     console.log('name valid')
        //     if(this.state.email != null ||  this.state.email != ''){
        //         console.log('mail not null')        
        //         let mailValidation = EmailValidator.validate(this.state.email); 
        //         if(mailValidation){
        //             console.log('mail valid')
        //             if(this.state.phone != null ||  this.state.phone != ''){
        //                 if(isNumeric(this.state.phone)){
        //                     console.log('phone valid')
        //                 }
        //                 if(this.state.password != null ||  this.state.password != ''){
        //                     console.log('pass valid');
        //                     return true;
        //                 }else{
        //                     // document.getElementsByClassName("signUpError").innerHTML = 'رمز عبور را وارد کنید'
        //                     return false ;
                              
        //                 }
        //             }else{
        //                 return false
        //             }
        //         }else{
        //             return false
        //         }
                
        //     }else{
        //         return false
        //     }
        // }else{
        //     return false
        // }
    }
    
    signUpForm = (e) =>{
       
        e.preventDefault();
        axios.post('/profiles/profile/' , {

            password : this.state.password,
            first_name : this.state.name,
            email : this.state.email,
            phone_number : this.state.phone

        }).then(
            res => {
                const token = res.data.data.token
                console.log('token' , token)
                localStorage.setItem('jwtToken',JSON.stringify(res.data.data))
                // <Redirect path="*" to="/" />
            }
        )

  
    }
    render(){
        const isFormValid = this.isFormValid();
        return(
            <React.Fragment>
            <p className="signInForm">ثبت نام در فروشگاه</p>
            <form className='signUpForm' onSubmit={e => {
                this.signUpForm(e);}}>
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
            <div className='linkForm'>
                حساب کاربری دارید ؟
                <Link to={'/user/login'}> وارد شوید</Link>
                <p><Link to={'/all'}>صفحه اصلی</Link></p>
            </div>
            </React.Fragment>
        );
    }

  
}

export default SignUp;