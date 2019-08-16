import React, { Component } from "react";
import "../style/sidebar.css";
// import navigationIcon from "../Icon Simplestore/apple-keyboard-control.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "../axios";
import { connect } from "react-redux";
import { filter_list, all_list } from "../actions/actions";
import { stat } from "fs";

class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: []
    };
  }
  filterList = (category, field_slug, choice_slug) => {
    this.props.filter_list(category, field_slug, choice_slug);
  };
  getlist = () => {
    this.props.init_list();
  };
  render() {
    const primaryFilter = [
      {
        title: "موجودی",
        choice_items: [
          {
            slug: "1",
            title: "موجود"
          }
        ],

        slug: "in_stock"
      }
      
    ];
    return (
      <section className="sidebar">
        <div className="logo">
          <Link to="/" onClick={this.getlist}>
            <img src={formaloo} />
            <p>فرم ساز آنلاین فرمالو</p>
          </Link>
        </div>
        {this.props.product_list ? (
          this.props.product_list.category ? (
            this.props.product_list.category.filters ? (
              <Accordion
                list={this.props.product_list}
                func={this.filterList}
                primary ={primaryFilter}
              />
            ) : (
              <PrimaryAccordion
                list={primaryFilter}
                func={this.filterList}
              />
            )
          ) : null
        ) : null
        }
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentListOfProducts: state.InitUserReducer.currentListOfProducts,
    product_list: state.InitUserReducer.product_list
  };
};
const mapDispatchToProps = {
  filter_list: filter_list,
  init_list: all_list
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarMain);

class Accordion extends React.Component {
  render() {
 

    return (
      <ul {...{ className: "accordion-list" }}>
        {this.props.list.category.filters.map((filter, key) => (
          <li {...{ className: "accordion-list__item", key }}>
            <AccordionItem
              filter={filter}
              category={this.props.list.category}
              filterFunc={this.props.func}
            />
          </li>
        ))}
        {this.props.primary.map((filter, key) => (
          <li {...{ className: "accordion-list__item", key }}>
            <AccordionItem
              filter={filter}
              category={this.props.list.category}
              filterFunc={this.props.func}
            />
          </li>
        ))}
      </ul>
    );
  }
}
class PrimaryAccordion extends React.Component {
  render() {
 

    return (
      <ul {...{ className: "accordion-list" }}>
        
        {this.props.list.map((filter, key) => (
          <li {...{ className: "accordion-list__item", key }}>
            <AccordionItem
              filter={filter}
              category={this.props.list.category}
              filterFunc={this.props.func}
            />
          </li>
        ))}
      </ul>
    );
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false
  };

  render() {
    const { opened } = this.state;

    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`
        }}
      >
        <div
          {...{
            className: "accordion-item__line",
            onClick: () => {
              this.setState({ opened: !this.state.opened });
            }
          }}
        >
          <h3 {...{ className: "accordion-item__title" }}>
            {this.props.filter.title}
          </h3>
          <span {...{ className: "accordion-item__icon" }} />
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          {this.props.filter.choice_items.map(choice => (
            <>
            <input  id={choice.slug} type='radio' name='filter'/>
            <label {...{
                className: "accordion-item__content",
                for : choice.slug,
                onClick : () => {
                  // console.log(this.props.location.search)
                  // window.location.path.push(`/?${this.props.category.slug}=${this.props.filter.slug}`)
                  this.props.filterFunc(
                    this.props.category,
                    this.props.filter.slug,
                    choice.slug
                  );
                }
              } 
            }
            >
              <p {...{ className: "accordion-item__paragraph" }}>
                {choice.title}
              </p>
            </label>
            </>
          ))}
        </div>
      </div>
    );
  }
}
