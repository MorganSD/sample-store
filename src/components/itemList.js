import React, { Component } from 'react';
import '../style/itemList.css';
import lightstar from '../Icon Simplestore/star.png';
import darkstar from '../Icon Simplestore/star (1).png';

import Addbasket from '../Icon Simplestore/Asset.png';
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
//     let rating;
//     if(item.rate == 0){
//         rating =(
//         <div className="rate">
//           <img src={lightstar} />
//           <img src={lightstar} />
//           <img src={lightstar} />
//           <img src={lightstar} />
//       </div>
//         )
//    }
//    else if(item.rate == 1){
//     rating =(
//     <div className="rate">
//       <img src={darkstar} />
//       <img src={lightstar} />
//       <img src={lightstar} />
//       <img src={lightstar} />
//   </div>
//     )
// }
//    else if(item.rate == 2){
//     rating =(
//     <div className="rate">
//       <img src={darkstar} />
//       <img src={darkstar} />
//       <img src={lightstar} />
//       <img src={lightstar} />
//   </div>
//     )
// }
//     else if(item.rate == 3){
//         rating =(
//         <div className="rate">
//           <img src={darkstar} />
//           <img src={darkstar} />
//           <img src={darkstar} />
//           <img src={lightstar} />
//       </div>
//         )
//    }
//    else {
//     rating =(
//         <div className="rate">
//           <img src={darkstar} />
//           <img src={darkstar} />
//           <img src={darkstar} />
//           <img src={darkstar} />
//       </div>
//         )
//    }

    return(

        <section className="homeList">
            {this.state.items ? (
            this.state.items.map(item => (
            <div className="itemBox">
                <figure>
                    <img src={item.thumbnail}/>
                    <figcaption>
                        <span>
                            <img src={Addbasket}/>  
                            افزودن به سبد خرید
                        </span> 
                    </figcaption>
                </figure>
                <div className="item-summery">
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                   
                      
                         
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