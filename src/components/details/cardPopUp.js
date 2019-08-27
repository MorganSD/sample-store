import React, { Component } from 'react';
import '../../style/popUp.css'
const CardPopUp = (props) =>{
    
    return(
        <div id='popUp' onClick={props.close}>
            {/* {props.massage.isArray ? (
                <>

                </>
            ): 
            (
                <div>{props.massage}</div>
            )} */}
            <div>خطا ! {props.massage.general_errors ? 
 props.massage.general_errors.map(e => e.map(
     array => <span>{array}</span>
 )): null}  </div>
            
            {/* { props.massage.form_errors != null ?(
                props.massage.form_errors.map( e=>(
                    <h4>e</h4>
                )
    
                )
            ): null

            } */}
        </div>
    )
}
export default CardPopUp;