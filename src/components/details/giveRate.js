import React, { Component } from "react";
import star from "../../Icon Simplestore/star.png";
import selectedSart from "../../Icon Simplestore/star (1).png";
import Rate from "../rate";
import { init_rate } from "../../actions/costumerInfo";
import { connect } from "react-redux";
class GiveRate extends Component {
  constructor(props) {
    super(props);

    this.state = [false, false, false, false, false];
  }
  rate = e => {
    const counter = e.target.id - 1;
    const currentstate = this.state[counter];

    if (this.state[counter + 1] === true) {
      for (let i = 5; i > counter; i--) {
        this.setState({
          [i]: false
        });
      }
    } else {
      for (let i = 0; i <= counter; i++) {
        const current = this.state[i];
        this.setState({
          [i]: true
        });
      }
    }

    this.props.init_rate(e.target.id);
  };
  render() {
    console.log("rate", this.state);
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
          <img src={this.state[0] === true ? selectedSart : star} />
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
          <img src={this.state[1] === true ? selectedSart : star} />
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
          <img src={this.state[2] === true ? selectedSart : star} />
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
          <img src={this.state[3] === true ? selectedSart : star} />
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
          <img src={this.state[4] === true ? selectedSart : star} />
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
