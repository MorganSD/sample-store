import React, { Component } from "react";
import "../style/sidebar.css";
// import navigationIcon from "../Icon Simplestore/apple-keyboard-control.png";
import formaloo from '../Icon Simplestore/formaloo-01.png';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from '../axios';
import {connect} from 'react-redux';

class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: []
    }
  }
  
  render() {
   
    return (
      <section className="sidebar">
      <div className="logo">
        <Link to='/all'>
        <img src={formaloo} />
        <p>فرم ساز آنلاین فرمالو</p>
        </Link>
      </div>
      {this.props.currentListOfProducts ? 
      this.props.currentListOfProducts.category ? (
        this.props.currentListOfProducts.category.filters ?(
     <Accordion filters={this.props.currentListOfProducts.category.filters}/>
     ):null
      ):null
      :null
     }
    </section>
   
    );
  }
}
const mapStateToProps = state => {
  return { currentListOfProducts: state.InitUserReducer.currentListOfProducts
   };
};


export default connect(
  mapStateToProps
)(SidebarMain);



class Accordion extends React.Component {
  render () {
    return (
        <ul {...{ className: 'accordion-list' }}>
          {this.props.filters.map((filter, key) => 
             (
              <li {...{ className: 'accordion-list__item', key }}>
                <AccordionItem filter={filter} />
              </li>
            )
          )}
        </ul>
    )
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false
  }
  
  render () {
    const {opened} = this.state
    
    return (
      <div
        {...{
          className: `accordion-item, ${opened && 'accordion-item--opened'}`,
          onClick: () => { this.setState({ opened: !opened }) }
        }}
      >
        <div {...{ className: 'accordion-item__line' ,
      // onClick: () => { this.setState({ opened: false }) }
      }}>
          <h3 {...{ className: 'accordion-item__title' }}>
            {this.props.filter.title}
          </h3>
          <span {...{ className: 'accordion-item__icon' }}/>
        </div>
          <div {...{ className: 'accordion-item__inner' }}>
            {this.props.filter.choice_items.map(choice => (
            <div {...{ className: 'accordion-item__content' }}>
              <p {...{ className: 'accordion-item__paragraph' }}>
                {choice.title}
              </p>
            </div>
            ))}
          </div>
      </div>
    )
  }
}

