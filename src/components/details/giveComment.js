import React, { Component } from 'react';
import GiveRate from './giveRate';
import {connect} from 'react-redux';
import {init_comment} from '../../actions/costumerInfo';
import axios from '../../axios';
import {post_req , post_load_success, post_load_failed} from '../../actions/post';

class GiveComment extends Component{
    constructor(){
        super();
        this.state={
            comment :'',
            errors : []
        }
    }
    changeComment = (e) => {
        this.setState({
            comment : e.target.value
        })
    }
    submitComment = e =>{
        e.preventDefault();

        // if(this.props.rate != null){
            // this.props.post_req()
            axios.post('/evaluation/rate/product/',{
                product : this.props.slug,
                rate : this.props.rate,
                comment : this.state.comment
            }).then(res => {
                if(res.status < 400){
                    // this.props.post_load_success()
                    alert('نظر شما با موفقیت ثبت شد و در انتظار تایید است !')
                    this.props.changeState();
                }
            }).catch(error => {
                this.setState({
                    errors : error.response.data.errors.form_errors
                })
            })
        // }
    }
render(){
    console.log(this.state.errors)
    return(
        <div id='give_comment'>
            <GiveRate />
            {this.state.errors.rate ? (
                <span className="form_errors">
                  {this.state.errors.rate.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}
            <form id='comment_box' onSubmit={(e) =>{this.submitComment(e)}}>
                <textarea placeholder='نظر خود را بنویسید' onChange={(e)=>{this.changeComment(e)}}></textarea>
               
                <button type='submit' className='submit-btn'>ارسال</button>
            </form>
        </div>
    )
}
}
const mapStateToProps = state => {
    return {
     rate : state.InitUserReducer.currentUser.rate,
     comment : state.InitUserReducer.currentUser.comment

    };
  };
  const mapDispatchToProps = {
    init_comment : init_comment,
    post_req : post_req,
  post_load_failed : post_load_failed,
  post_load_success : post_load_success
  };
export default connect(mapStateToProps , mapDispatchToProps)(GiveComment);