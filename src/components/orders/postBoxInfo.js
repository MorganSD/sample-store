import React, { Component } from "react";
import { connect } from "react-redux";
import { init_card } from "../../actions/actions";

class PostBoxInfo extends Component {
  constructor() {
    super();

  }
  editAddress = () => {
    console.log('ff')
    this.props.changeState()
  }
  render() {
   
    let cart = this.props.cart;
    return (
      <div id="postBox-info">
        <h2>آدرس ارسال</h2>
       {this.props.cart.delivering_address ? (
          <div>
          <p>عنوان آدرس : {this.props.cart.delivering_address.title}</p>
          <p> شهر : {this.props.cart.delivering_address.city != null ? (
              this.props.cart.delivering_address.city.name
          ): null}</p>
        <p>شماره تماس : {this.props.cart.delivering_address.phone_number}</p>
        <p>آدرس : {this.props.cart.delivering_address.address}</p>
        <p>کد پستی : {this.props.cart.delivering_address.postal_code}</p>
        <p onClick={this.editAddress}>ویرایش</p>
        </div>
       ):null
       }
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
)(PostBoxInfo);
// export default PostBoxInfo;
