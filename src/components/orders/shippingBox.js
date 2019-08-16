import React, { Component } from "react";
import { connect } from "react-redux";
import { init_card } from "../../actions/actions";

class ShippingBoxInfo extends Component {
  constructor() {
    super();

  }
  editAddress = () => {
    this.props.changeState()
  }
  render() {
   
    return (
      <div id="postBox-info">
        <h2>شیوه ارسال</h2>
      {this.props.cart.shipping_method ?(
            <div>
            <p>{this.props.cart.shipping_method.title}</p>
           {this.props.cart.shipping_interval != null ? (
                <p> زمان ارسال : {this.props.cart.shipping_interval.date}</p> 
            ): null}
            {this.props.cart.shipping_interval != null ? (
             <p> ساعت ارسال :{ this.props.cart.shipping_interval.start_time + '-' + this.props.cart.shipping_interval.end_time }
             </p>  
            ): null}
       
          <p onClick={this.editAddress}>ویرایش</p>
          </div>
      ):null}
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
  init_card: init_card
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingBoxInfo);
// export default PostBoxInfo;
