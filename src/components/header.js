import React, { Component } from 'react';
import '../style/navbar.css';
import searchIcon from '../Icon Simplestore/search.png';
import like from '../Icon Simplestore/like.png';
import basket from '../Icon Simplestore/shopping-cart (2).png';
class Header extends Component{
    constructor(){
        super();
        this.state = {
            categories : []
        }
    }
componentDidMount(){
    let categories = fetch('http://api.projectant.aasoo.ir/shelves/categories/menu/list/',{ headers :{
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': '0f855b9c2f5ee2a21e530bcaa82a645286724fba',
        accept: 'application/json',
        'x-store-sub-address':'sib'
        }}
        )
    .then(response => response.json())
    .then(response => {console.log(response.data.categories)
        this.setState({
            categories:response.data.categories
        })
    }
    )
}

    render(){
        return(

            <header>
                <div className="wrap">
                <ul className="userTool">

                    <li>
                        <label><img src={searchIcon} /></label>
                        <input type="text" placeholder="جستجو"></input>
                    </li>
                    <li>
                        <img src={basket} />
                    </li>
                    <li>
                        <img src={like} />
                    </li>
                    <li>
                        <a href="#">ثبت نام</a>
                        /
                        <a href="#"> ورود</a>
                    </li>
                   
                   
                  
                   

                </ul>
                <ul className="categoryList">
                { this.state.categories ? (this.state.categories.map(category => (
               

                    <li key={category.title}>{category.title}</li>
                    
                    ))):
                    <li> </li>
                    }
                </ul>
               
            
                </div>
            </header>


        )
    }
}

export default Header;