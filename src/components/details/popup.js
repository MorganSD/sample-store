import React, { Component } from 'react';
import '../../style/popUp.css'
const PopUp = (props) =>{
    return(
        <div id='popUp' onClick={props.close}>
            <div>{props.massage.message}</div>
        </div>
    )
}
export default PopUp;