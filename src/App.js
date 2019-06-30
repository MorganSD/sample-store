import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Detail from './components/detail';
import './style/responsive.css';

class App extends Component {
  render () {
    const headerApi = {
      headers :{
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': '0f855b9c2f5ee2a21e530bcaa82a645286724fba',
        accept: 'application/json',
        'x-store-sub-address':'sib'
        }}

    
    return(
    <React.Fragment>
        <Header />
        <Home />
        {/* <Detail />  */}
    </React.Fragment>
  )
  }
}

export default App;
