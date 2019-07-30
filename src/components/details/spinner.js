import React, { Component } from 'react';
import '../../style/spinner.css';

const Spinner = (props) => {
    const style1={
        display : props.display
    }
  return (
    <div class="lds-spinner" style={style1}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
export default Spinner;
