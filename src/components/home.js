import React, { Component } from 'react';
import Sidebar from './sidebar';
import ItemList from './itemList'
import '../style/style.css'
class Home extends Component {
  render () {
    return(
    <div id="home">
        <Sidebar />
        <ItemList />
    </div>
  )
  }
}

export default Home;
