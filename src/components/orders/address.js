import React, { Component } from "react";
import { connect } from "react-redux";
import { update_address, remove_address,init_selected_add,existing_address } from "../../actions/costumerInfo";
import axios from '../../axios';
class Address extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      title: "",
        city: "",
        phone_number: "",
        postal_code: "",
        address: "",
      // edited: {
      //   title: "",
      //   city: "",
      //   phone_number: "",
      //   postal_code: "",
      //   address: "",
      //   data : []
      // }
    };
  }
  editAdd = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };
  removeAdd = slug => {
    this.props.removeAddress(slug);
  };
  submitEditAdd = (e , address_slug) => {
    e.preventDefault();
    let editAdd = [];
    // let add = this.state.edited;
    if(this.state.title != ''){
      editAdd.push(this.state.title)
    }
    if(this.state.city !=''){
      editAdd.push(this.state.city)
    }
    if(this.state.phone_number !=''){
      editAdd.push(this.state.phone_number)
    }
    if(this.state.postal_code !=''){
      editAdd.push(this.state.postal_code)
    }
    if(this.state.address !=''){
      editAdd.push(this.state.address)
    }
    
    if(editAdd.length > 0){
      axios.patch(`/v2/profiles/address/${address_slug}/update/`, editAdd)
      .then(res => {
        if (res.status < 400) {
          this.props.updateAddress();
          this.setState({
            title: "",
              city: "",
              phone_number: "",
              postal_code: "",
              address: "",
            edited: {
              title: "",
              city: "",
              phone_number: "",
              postal_code: "",
              address: ""
            },
            isEdit:false
          })
        }else{alert('خطایی رخ داده است ! دوباره تلاش کنید')}
      })
      .catch(error => console.log(error, "update address"));
    }else{
      alert('هیچی برای آپدیت نیست ')
    }
  
    // this.props.updateAddress(slug, this.state.edited);
    // this.setState({
    //   isEdit: {
    //     slug: false
    //   }
    // });
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    // if (event.target.value != "") {
    //   this.setState({
    //     edited: {
    //       [event.target.name]: event.target.value
    //     }
    //   });
    //   console.log(this.state.edited, "new address");
    // }
  };
  select_address = (e,address_slug) =>{
    if(e.target.checked){
      this.props.selectAddress(address_slug)
    }
  }
  render() {
    let address = this.props.prop;
console.log('edit address error', this.state.edited)
    return (
      <section>
        <div>
          <input type="radio" id={address.slug} name="address" onChange={(e)=>{this.select_address(e,address.slug)}}/>
          <label for={address.slug}>
            <h3>{address.title}</h3>
            {address.city != null ? (
              <p>شهر : {address.city.name}</p>
            ) : (
              <p>شهر : - </p>
            )}
            <p>آدرس : {address.address}</p>
            <p>کد پستی :{address.postal_code}</p>
            <p>شماره تماس :{address.phone_number}</p>
          </label>
          <div>
            <span onClick={this.editAdd}>ویرایش</span>
            <span
              onClick={() => {
                this.removeAdd(address.slug);
              }}
            >
              حذف
            </span>
          </div>
        </div>

         {this.state.isEdit ? (
                  <div className='edit-address'>
                    <form
                      onSubmit={e => {
                        this.submitEditAdd(e, address.slug);
                      }}
                    >
                      <input
                        type="text"
                        placeholder='عنوان آدرس'
                        value={this.state.title}
                        onChange={this.onChange}
                        name="title"
                      />
                      <select>
                        <option>شهر</option>
                      </select>
                      <input
                        type="text"
                        placeholder='آدرس'
                        value={this.state.address}
                        onChange={this.onChange}
                        name="address"
                      />
                      <input
                        type="text"
                        placeholder='کدپستی'
                        value={this.state.postal_code}
                        onChange={this.onChange}
                        name="postal_code"
                      />
                      <input
                        type="phone"
                        placeholder='تلفن همراه'
                        value={this.state.phone_number}
                        onChange={this.onChange}
                        name="phone_number"
                      />

                      <button type="submit" className="update-btn">
                        بروزرسانی{" "}
                      </button>
                    </form>
                  </div>
         ):null}
              
      </section>
    );
  }
}
const mapDispatchToProps = {
  updateAddress: existing_address,
  removeAddress: remove_address,
  selectAddress : init_selected_add
};
export default connect(
  null,
  mapDispatchToProps
)(Address);
