import React, { Component } from "react";
import Select from "react-select";

class SelectOption extends Component {
    constructor(){
        super();
        this.state={
            // options : this.props.options
        }
    }
    
  render() {
    console.log(this.props.options.choice_items,'options')
    // const choice = this.props.options.choice_items.map(choice => choice.value)
    return (
      <div className="select-option">
       
        {/* <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
          placeholder={"مرتب سازی براساس "}
        /> */}
      </div>
    );
  }
}
export default SelectOption;
