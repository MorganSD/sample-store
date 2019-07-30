import React, { Component } from "react";
import '../../style/detail.css'
const Choice = (props) => {
    let color_style
  return (
    <React.Fragment>
        <p>انتخاب رنگ :</p>
     {
    props.options.choice_items ?
     props.options.choice_items.map(item => (
         color_style ={background : item.color_code},
        <>
        <input type='radio' name={props.options.choice_type} id={item.slug} className='choice_input'/>
        <label for={item.slug} className='choice_label'>
        <span style={color_style}></span>
        <p>{item.title}</p>
         
      </label>
    </>
     
     )): null
     }
    </React.Fragment>
  );
};
export default Choice;
