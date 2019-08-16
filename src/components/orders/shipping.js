import React, { Component } from "react";
import { connect } from "react-redux";
import { init_selected_shipping , init_selected_shipping_date } from "../../actions/costumerInfo";

class Shipping extends Component {
  constructor() {
    super();
    this.state = {
      isDate: false
    };
  }
  selectShipping = method => {
    this.props.select_method(method);
  };

  render() {
    let cart = this.props.cart;
    return (
      <div id="shipping">
        <h2>روش ارسال</h2>
        <div>
          <Accordion cart={cart} selectShippingMethod={this.props.select_method} date={this.props.init_selected_shipping_date}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.InitUserReducer.card.cart
  };
};
const mapDispatchToProps = {
  select_method: init_selected_shipping,
  init_selected_shipping_date : init_selected_shipping_date
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shipping);




class Accordion extends React.Component {
  render() {
    return (
      <ul {...{ className: "accordion-list" }}>
        {this.props.cart.shipping_methods.map((method, key) => (
          <li {...{ className: "accordion-list__item", key }}>
            <AccordionItem
              parent={method}
              totalCart={this.props.cart}
              selectMethod ={this.props.selectShippingMethod}
              selectDate={this.props.date}
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
  setShippingMethod = ( e ) =>{
    this.props.selectMethod(e.target.value);
  }
  render() {
    const { opened } = this.state;

    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
      
        }}
      >
        <div
          {...{
            className: "accordion-item__line",
            onClick: () => {
              this.setState({ opened: !this.state.opened });
            }          }}
        >
          <h3 {...{ className: "accordion-item__title" }}>
            <input
              id={this.props.parent.slug}
              type="radio"
              name="shippingMethod"
              value={this.props.parent.slug}
             onChange={(e)=>{this.setShippingMethod(e)}}
            />
            <label for={this.props.parent.slug}>
              {this.props.parent.title}
            </label>
            
          </h3>
        </div>
        {this.props.parent.accepts_shipping_interval ? (
          <div {...{ className: "accordion-item__inner" }}>
            {this.props.totalCart.shipping_time_choices.map(choice => (
              <div
                {...{
                  className: "accordion-item__content"
                 
                }}
              >
                <p {...{ className: "accordion-item__paragraph" }}>
                 <p className='date'>{choice.date}</p> 
                  <InnerAccordion hours={choice} date={choice.date} interval_date={this.props.selectDate}/>
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

class InnerAccordion extends React.Component {
  render() {
    return (
      <ul {...{ className: "accordion-list" }}>
        {this.props.hours.hours.map((hour, key) => (
          <li {...{ className: "accordion-list__item", key }}>
            <InnerAccordionItem interval_hour={hour} shipping_date={this.props.date} select_interval_date={this.props.interval_date}/>
          </li>
        ))}
      </ul>
    );
  }
}

class InnerAccordionItem extends React.Component {
  state = {
    opened: false
  };

  setShippingDate = (e) =>{
    this.props.select_interval_date(e.target.value ,this.props.shipping_date );
  }
  render() {
    const { opened } = this.state;

    return (
      <div
        {...{
          className: `accordion-item, ${opened && "accordion-item--opened"}`,
          onClick: () => {
            this.setState({ opened: true });
          }
        }}
      >
        <div
          {...{
            className: "accordion-item__line"
          }}
        >
          <h3 {...{ className: "accordion-item__title hours" }}>
            <input
              id={this.props.interval_hour.slug}
              type="radio"
              name="shippingDate"
             value={this.props.interval_hour.slug}
             onChange ={(e)=>{this.setShippingDate(e)}}
            />
            <label for={this.props.interval_hour.slug} className='inner_label'>
              {this.props.interval_hour.start_time} + {" - "} +
              {this.props.interval_hour.end_time}
            </label>
          </h3>
        </div>
      </div>
    );
  }
}