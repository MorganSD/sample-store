import React, { Component } from "react";
import {connect} from 'react-redux';
import '../../style/progressBar.css';

const ProgressBar = (props) => {
  return (
    <div class="progress-horizontal">
      <div class="bar-horizontal" />
    </div>
  );
};
const mapStateToProps = state => ({
  
    isLoading : state.CardReducer.card_req
  
});

export default connect(mapStateToProps)(ProgressBar);
