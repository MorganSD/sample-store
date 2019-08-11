import React, { Component } from "react";
import "../../style/formOrder.css";
import PostInfo from '../orders/postInfo';
import Address from '../orders/address';
class ExitingAdd extends Component {
  constructor() {
    super();
    this.state = {
     addAddress : false
    };
  }
//   editAdd = (e , slug) => {
//     this.setState({
//       isEdit: {
//         slug: true
//       }
//     });
//   };
//   removeAdd = slug =>{
//       this.props.removeAddress(slug);
//   }
//   submitEditAdd = (e, slug) => {
//     e.preventDefault();
//     this.props.updateAddress(slug, this.state.edited);
//     this.setState({
//         isEdit: {
//             slug: false
//           }
//     })
// };
//   onChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//     let newAddress;
//     if (event.target.value != "") {
//       this.setState({
//         edited: {
//           [event.target.name]: event.target.value
//         }
//       });
//       console.log(this.state.edited, "new address");
//     }
//   };
isaddAddress = () =>{
  this.setState({
    addAddress : !this.state.addAddress
  })
}
  render() {
    return (
      <div id="exiting-add">
        <h2>آدرس ها</h2>
        <p onClick={()=>{this.setState({addAddress : true})}} >افزودن آدرس جدید</p>
        {this.state.addAddress ? (
          <PostInfo changeAddState={this.isaddAddress} phone_number={this.props.phone}/>
        ): null
        }
        <div className="address">
          {this.props.address ? (
            this.props.address.map(add => (
              <Address prop={add} />
            ))
          ) : (
            <h2>ادرسی موجود نیست</h2>
          )}
        </div>
      </div>
    );
  }
}
export default ExitingAdd;
