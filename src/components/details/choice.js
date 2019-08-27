import React, { Component } from "react";
import '../../style/detail.css'

class Choice extends Component {
  selectOptions = (slug , field) =>{
    this.props.selectOptionFunc(slug , field)
  }
   render(){
    let color_style
    return (
      <React.Fragment>
          <p>انتخاب رنگ :</p>
       {
      this.props.options.choice_items ?
       this.props.options.choice_items.map(item => (
           color_style ={background : item.color_code},
          <>
          <input type='radio' name={this.props.options.choice_type} id={item.slug} className='choice_input' onChange={()=>{this.selectOptions(item.slug ,  this.props.options.slug)}}/>
          <label for={item.slug} className='choice_label'>
          <span style={color_style}></span>
          <p>{item.title}</p>
           
        </label>
      </>
       
       )): null
       }
      </React.Fragment>
    );
   }
};
export default Choice;
