import React, { Component } from "react";
import Select from "react-select";

class SelectOption extends Component {
    constructor(){
        super();
        this.state={
            // options : this.props.options
        }
    }
    selectOptions = (e , field) =>{
      this.props.selectOptionFunc(e.target.value , field)
      // alert(e.target.value)
    }
  render() {
    console.log(this.props.options.choice_items,'options')
    return (
      <div className="select-option">
       {this.props.options.choice_items ? (
         <select onChange={(e)=>{this.selectOptions(e ,  this.props.options.slug)}}>
           <option selected>انتخاب {this.props.options.title}</option>
           {
             this.props.options.choice_items.map(choice =>(
               <option value={choice.slug} >{choice.title}</option>
             ))
           }
         </select>
       ):null}
       
      </div>
    );
  }
}
export default SelectOption;
