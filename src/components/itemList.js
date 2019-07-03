import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../style/itemList.css';
import lightstar from '../Icon Simplestore/star.png';
import darkstar from '../Icon Simplestore/star (1).png';
import Addbasket from '../Icon Simplestore/Asset.png';
import noPhoto from '../Icon Simplestore/noPhoto.png';
import Rate from './rate';

function Thumbnail(props){
    if(props.thumbnail != null){
        return <img src={props.thumbnail} />
    }else{
        return(
            <img src={noPhoto} />
        )
    }
}

class ItemList extends  Component{
constructor(){
    super();
    this.state={
        items : []
    }
}

componentDidMount(){
    let items = fetch('http://api.projectant.aasoo.ir/shelves/products/',{ headers :{
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': '0f855b9c2f5ee2a21e530bcaa82a645286724fba',
        accept: 'application/json',
        'x-store-sub-address':'sib'
        }}
        )
    .then(response => response.json())
    .then(response => {console.log(response.data.products)
        this.setState({
            items:response.data.products
        })
    }
    )
}

render(){


    return(

        <section className="homeList">
            {this.state.items ? (
            this.state.items.map(item => (
            <div className="itemBox">
                
                <figure>
                    <Link to={`/item/${item.address}`}>
                        <Thumbnail thumbnail={item.thumbnail} />
                     </Link>
                    <figcaption>
                        <span>
                            <img src={Addbasket}/>  
                            افزودن به سبد خرید
                        </span> 
                    </figcaption>
                   
                </figure>
              
               
                <div className="item-summery">
                    <p><Link to={`/item/${item.address}`}>{item.title}</Link></p>
                    <p>{item.price} تومان</p>
                   
                     <div className="rate">
                         <Rate product={item} />
                     </div>  
                         
                </div>
            </div>
            ))
):
<h1>not found</h1>
}
           
        </section>
    )

}

}
export default ItemList;