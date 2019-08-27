import React, { Component } from "react";
import "../style/sidebar.css";
// import navigationIcon from "../Icon Simplestore/apple-keyboard-control.png";
import formaloo from "../Icon Simplestore/formaloo-01.png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "../axios";
import { connect } from "react-redux";
import { filter_list, all_list } from "../actions/actions";
import menu from "../Icon Simplestore/menu.png";

class SidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      sidebarDisplay: false,
      sidebar_style: {},
      closer_style: {},
      filters: [],
      currentCategory: ""
    };
  }
  componentDidUpdate(prevProps){
    
    // if(this.props.product_list.category && prevProps.product_list.category && prevProps.product_list.category.slug != this.props.product_list.category.slug){
    const { params } = this.props.match;
    if(params && prevProps.params && params.id !== prevProps.params.id){
      this.setState({
        filters : []
      })
    }
  }

  filterList = (e, category, field_slug, choice_slug) => {
    // console.log(this.state.currentCategory, category.slug);
    if (e.target.checked) {
      // if (this.state.currentCategory === category.slug) {
        const filter_list = this.state.filters;
        filter_list.push(`${field_slug}=${choice_slug}`);
        this.setState({
          filters: filter_list,
          currentCategory : this.props.product_list.category.slug
        });
        this.props.filtering(category , filter_list)
        console.log("filters", filter_list);
      // } else {
      //   const list = [];
      //   list.push(`${field_slug}=${choice_slug}`);
      //   this.setState({
      //     filters: list,
      //     currentCategory : this.props.product_list.category.slug

      //   });
      //   console.log("list", list);
      //   this.props.filtering(category , list)

      // }
    } else {
      const filter_list = this.state.filters;
      const new_list = filter_list.filter(
        item => item !== `${field_slug}=${choice_slug}`
      );
      this.setState({
        filters: new_list
      });
      console.log("filters new", new_list);
      this.props.filtering(category , new_list)

    }

    // this.props.filter_list(category, field_slug, choice_slug);
  };
  getlist = () => {
    this.props.init_list();
  };
  sidebar_display = () => {
    if (this.state.sidebarDisplay) {
      this.setState({
        sidebarDisplay: false,
        sidebar_style: {},
        closer_style: {}
      });
    } else {
      this.setState({
        sidebarDisplay: true,
        sidebar_style: { transform: "translateX(0)" },
        closer_style: { display: "block" }
      });
    }
  };
  close_sidebar = () => {
    this.setState({
      sidebarDisplay: false,
      sidebar_style: {},
      closer_style: {}
    });
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
      <>
        <span id="sidebar_check">
          <input
            type="checkbox"
            id="sidebar_input"
            checked={this.state.sidebarDisplay}
          />
          <label
            for="sidebar_input"
            onClick={() => {
              this.sidebar_display();
            }}
          >
            <img src={menu} />
            فیلتر
          </label>
        </span>
        <div
          className="sidebar_close"
          style={this.state.closer_style}
          onClick={() => {
            this.close_sidebar();
          }}
        ></div>
        <section className="sidebar" style={this.state.sidebar_style}>
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
                  key={this.props.match.params.id}
                  list={this.props.product_list}
                  func={this.filterList}
                  primary={primaryFilter}
                  close_side={this.close_sidebar}
                />
              ) : (
                <PrimaryAccordion
                  list={primaryFilter}
                  func={this.filterList}
                  close_side={this.close_sidebar}
                />
              )
            ) : null
          ) : null}
        </section>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    product_list: state.InitUserReducer.product_list || {}
  };
};
const mapDispatchToProps = {
  filtering: filter_list,
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
          <li {...{ className: "accordion-list__item", key : filter.slug }}>
            <AccordionItem
              filter={filter}
              category={this.props.list.category}
              filterFunc={this.props.func}
              close={this.props.close_side}
            />
          </li>
        ))}
        {this.props.primary.map((filter, key) => (
          <li {...{ className: "accordion-list__item", key  }}>
            <AccordionItem
              filter={filter}
              category={this.props.list.category}
              filterFunc={this.props.func}
              close={this.props.close_side}
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
              close={this.props.close_side}
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
              <input
                id={choice.slug}
                type="checkbox"
                name={this.props.filter.slug}
                onChange={e => {
                  this.props.filterFunc(
                    e,
                    this.props.category,
                    this.props.filter.slug,
                    choice.slug
                  );
                }}
              />
              <label
                {...{
                  className: "accordion-item__content",
                  for: choice.slug
                  // onClick : (e) => {
                  //   // console.log(this.props.location.search)
                  //   // window.location.path.push(`/?${this.props.category.slug}=${this.props.filter.slug}`)
                  // this.props.filterFunc(
                  //   e,
                  //   this.props.category,
                  //   this.props.filter.slug,
                  //   choice.slug
                  // );
                  // }
                }}
              >
                <p
                  {...{ className: "accordion-item__paragraph" }}
                  onClick={() => {
                    this.props.close();
                  }}
                >
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
