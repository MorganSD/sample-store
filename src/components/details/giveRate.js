import React, { Component } from "react";
import star from "../../Icon Simplestore/star.png";
import selectedSart from "../../Icon Simplestore/star (1).png";
import Rate from "../rate";
import { init_rate } from "../../actions/costumerInfo";
import { connect } from "react-redux";
class GiveRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate :[false, false, false, false, false]
    };
  }
  rate = e => {
    const counter = e.target.id - 1;
    const currentstate = this.state.rate[counter];

    if (this.state.rate[counter + 1] === true) {
      for (let i = 5; i > counter; i--) {
        this.setState({

          rate :[
            i = false
          ]
        });
      }
    } else {
      for (let i = 0; i <= counter; i++) {
        const current = this.state.rate[i];
        this.setState({

          // rate[i] : true       
         });
      }
    }

    this.props.init_rate(e.target.id);
  };
  render() {
    console.log("rate", this.state.rate);
    return (
      <div id="give_rate">
        <input
          id="1"
          type="radio"
          onChange={e => {
            this.rate(e);
          }}
          name="rate"
        />
        <label for="1">
          <img src={this.state.rate[0] === true ? selectedSart : star} />
        </label>
        <input
          id="2"
          type="radio"
          onChange={e => {
            this.rate(e);
          }}
          name="rate"
        />
        <label for="2">
          <img src={this.state.rate[1] === true ? selectedSart : star} />
        </label>
        <input
          id="3"
          type="radio"
          onChange={e => {
            this.rate(e);
          }}
          name="rate"
        />
        <label for="3">
          <img src={this.state.rate[2] === true ? selectedSart : star} />
        </label>
        <input
          id="4"
          type="radio"
          onChange={e => {
            this.rate(e);
          }}
          name="rate"
        />
        <label for="4">
          <img src={this.state.rate[3] === true ? selectedSart : star} />
        </label>
        <input
          id="5"
          type="radio"
          onChange={e => {
            this.rate(e);
          }}
          name="rate"
        />
        <label for="5">
          <img src={this.state.rate[4] === true ? selectedSart : star} />
        </label>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    rate: state.InitUserReducer.rate
  };
};
const mapDispatchToProps = {
  init_rate: init_rate
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiveRate);