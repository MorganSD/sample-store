import React, { Component } from 'react';
import '../style/sidebar.css';
import navigationIcon from '../Icon Simplestore/apple-keyboard-control.png';

class Sidebar extends Component{
  
 
    render(){
       
        return(

            <section className="sidebar">
                <div className="logo">

                </div>
                <ul className="catSideBar">
                    <li>
                        <input type="checkbox" id="navigation-icon" className="inputDN" />
                        <label for="navigation-icon">
                            <p>برندها</p>
                            <img src={navigationIcon}/>
                        </label>
                        {/* <ul className="sidebar-cat-content">

                        </ul> */}
                          
                        
                    </li>
                
                    <li>
                        <input type="checkbox" id="navigation-icon" className="inputDN" />
                        <label for="navigation-icon">
                            <p>برندها</p>
                            <img src={navigationIcon}/>
                        </label>
                        {/* <ul className="sidebar-cat-content">

                        </ul> */}
                          
                        
                    </li>

                    <li>
                        <input type="checkbox" id="navigation-icon" className="inputDN" />
                        <label for="navigation-icon">
                            <p>برندها</p>
                            <img src={navigationIcon}/>
                        </label>
                        {/* <ul className="sidebar-cat-content">

                        </ul> */}
                          
                        
                    </li>

                    <li>
                        <input type="checkbox" id="navigation-icon" className="inputDN" />
                        <label for="navigation-icon">
                            <p>برندها</p>
                            <img src={navigationIcon}/>
                        </label>
                        {/* <ul className="sidebar-cat-content">

                        </ul> */}
                          
                        
                    </li>

                    <li>
                        <input type="checkbox" id="navigation-icon" className="inputDN" />
                        <label for="navigation-icon">
                            <p>برندها</p>
                            <img src={navigationIcon}/>
                        </label>
                        {/* <ul className="sidebar-cat-content">

                        </ul> */}
                          
                        
                    </li>
                </ul>


            </section>



        )
    }
}
export default Sidebar;