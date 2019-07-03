import React, { Component } from 'react';
import '../style/footer.css';
import hiroket from '../Icon Simplestore/heroket-01.png'

class Footer extends Component{


    render(){
        return(
            <ul className="footer">
                <li>
                    <img src={hiroket} />
                    <p>
                    این فروشگاه با افتخار از هیروکت قدرت گرفته است
                    <br/>
                    همین امروز فروشگاه خود را بسازید
                    </p>
                </li>
                <li>تماس با ما</li>
                <li>درباره ی ما</li>
                <li>هیروکت</li>
               
                
            </ul>
        )
    }
}
export default Footer;