import React, { Component } from "react";
import Sidebar from "./sidebar";
import ItemList from "./itemList";
import "../style/style.css";

class Home extends Component {
 constructor(){
   super();
   this.state = {
     category : 'all'
   }
   this.sorting = this.sorting.bind(this)
 }

componentDidMount(){
  if(this.props.match.params.category != 'all'){
    this.setState({
      category : this.props.match.params.category
    })
  }
  
  // console.log('param is ' + this.props.match.params.category)
}

componentDidUpdate(prevProps,prevState){
  if(prevProps.match.params.category !== this.props.match.params.category){
    // console.log('nextprop',this.props.match.params.category)
    this.setState({
      category : this.props.match.params.category
    })
  }
    //  console.log('didUpdate',this.state.category)

}
sorting(event){
  this.setState({
    category : event.target.value
  })
}
  render() {
  
    console.log('w cat', this.state.category)
    return (
      
      <div id="home">
        <Sidebar />
        <select className='sort' onChange={this.sorting}>
        <option value = 'all'>همه</option>
        
            <option value='price'>گران ترین</option>
            <option value='-price'>ارزان ترین</option>
            </select>
        <ItemList cat={this.state.category}/>
      </div>
    );
  }
}

export default Home;
