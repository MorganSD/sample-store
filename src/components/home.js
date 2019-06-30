import React, { Component } from 'react';
// import Header from './components/header';
import Sidebar from './sidebar';
import ItemList from './itemList'
import '../style/style.css'
// import Tags from './components/metaTags'
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
