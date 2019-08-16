import React, { Component } from 'react';
import '../../style/popUp.css'
const PopUp = (props) =>{
    return(
        <div id='popUp' onClick={props.close}>
            <div>خطا ! {props.massage.general_errors} </div>
            
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
export default PopUp;