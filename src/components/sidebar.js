import React, { Component } from "react";
import "../style/sidebar.css";
// import navigationIcon from "../Icon Simplestore/apple-keyboard-control.png";
import formaloo from '../Icon Simplestore/formaloo-01.png';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from '../axios';
import {connect} from 'react-redux';
import {filter_list} from '../actions/actions';

class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: []
    }
  }
  filterList = (category , field_slug , choice_slug) => { 
    this.props.filter_list(category, field_slug, choice_slug);
    alert('hi')
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
      {this.props.product_list ? 
      this.props.product_list.category ? (
        this.props.product_list.category.filters ?(
     <Accordion list={this.props.product_list} func={this.filterList} />
     ):null
      ):null
      :null
     }
    </section>
   
    );
  }
}
const mapStateToProps = state => {
  return { currentListOfProducts: state.InitUserReducer.currentListOfProducts,
    product_list : state.InitUserReducer.product_list
   };
};
const mapDispatchToProps = {
  
  filter_list : filter_list

}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarMain);



class Accordion extends React.Component {
  render () {
    return (
        <ul {...{ className: 'accordion-list' }}>
          {this.props.list.category.filters.map((filter, key) => 
             (
              <li {...{ className: 'accordion-list__item', key }}>
                <AccordionItem filter={filter} category={this.props.list.category} filterFunc={this.props.func}/>
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
          onClick: () => { this.setState({ opened: true }) }
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
            <div {...{ className: 'accordion-item__content' ,
             onClick: () =>{this.props.filterFunc(this.props.category.slug , this.props.filter.slug ,choice.slug)}} }>
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

