import React, { Component } from "react";
import { connect } from "react-redux";
import {
  update_address,
  remove_address,
  init_selected_add,
  existing_address
} from "../../actions/costumerInfo";
import {
  post_req,
  post_load_success,
  post_load_failed
} from "../../actions/post";
import axios from "../../axios";
class Address extends Component {
  constructor() {
    super();
    this.state = {
      selected_state: "",
      enableCities: false,
      cities: {},
      states: {},
      isEdit: false,
      title: "",
      city: "",
      phone_number: "",
      postal_code: "",
      address: "",
      edited: {},
      errors: []
    };
  }

  componentWillMount() {
    axios
      .get("/locations/states/")
      .then(res => {
        if (res.status < 400) {
          // console.log("states", res.data.data);
          this.setState({
            states: res.data.data
          });
        }
      })
      .catch(error => console.log("states error", error));
  }
  setCity = e => {
    this.setState({
      edited: {
        ...this.state.edited,
        city: e.target.value
      }
    });
  };
  changeState = slug => {
    this.setState({
      selected_state: slug
    });
  };
  selectState = event => {
    axios
      .get(`/locations/states/state/${event.target.value}/cities/`)
      .then(res => {
        this.setState({
          enableCities: true,
          cities: res.data.data.cities
        });
      });
  };
  editAdd = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
   
  };
  removeAdd = (slug , length)=> {
    if(length > 1 ){
      this.props.removeAddress(slug);

    }else{
      alert('داشتن حداقل یک آدرس الزامی است')
    }
  };
  submitEditAdd = (e, address_slug) => {
    // this.props.post_req();
    e.preventDefault();
    if (this.state.edited != null) {
      axios
        .patch(
          `/v2/profiles/address/${address_slug}/update/`,
          this.state.edited
        )
        .then(res => {
          if (res.status < 400) {
            this.props.updateAddress();
            this.setState({
              title: "",
              city: "",
              phone_number: "",
              postal_code: "",
              address: "",
              edited: {},
              isEdit: false
            });
            // this.props.post_load_success();
          }
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors.form_errors
          });
        });
    } else {
      alert("هیچی برای آپدیت نیست ");
    }
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    // this.checkNull(event.target.name )
    if (event.target.value != "") {
      this.setState({
        edited: {
          ...this.state.edited,
          [event.target.name]: event.target.value
        }
      });
      // console.log(this.state.edited, "new address");
    }
  };

  select_address = (e, address_slug) => {
    if (e.target.checked) {
      this.props.selectAddress(address_slug);
    }
  };
  render() {
    let address = this.props.prop;
    let states = this.state.states.states;

    // console.log("edit address error", this.state.edited);
    return (
      <section>
        <div>
          <input
            type="radio"
            id={address.slug}
            name="address"
            onChange={e => {
              this.select_address(e, address.slug);
            }}
          />

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
                this.removeAdd(address.slug , this.props.addLength );
              }}
            >
              حذف
            </span>
          </div>
        </div>

        {this.state.isEdit ? (
          <div className="edit-address">
            <form
              onSubmit={e => {
                this.submitEditAdd(e, address.slug);
              }}
            >
              <input
                type="text"
                placeholder="عنوان آدرس"
                value={this.state.title}
                onChange={this.onChange}
                name="title"
              />
              {this.state.errors.title ? (
                <span className="form_errors">
                  {this.state.errors.title.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}

              {states ? (
                <select onChange={this.selectState}>
                  <option selected>استان</option>
                  {states.map(state => (
                    <option
                      value={state.slug}
                      onClick={() => {
                        this.changeState(state.slug);
                      }}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              ) : null}
              {this.state.enableCities ? (
                this.state.cities ? (
                  <select onChange={this.setCity}>
                    <option selected>شهر</option>
                    {this.state.cities.map(city => (
                      <option value={city.slug}>{city.name}</option>
                    ))}
                  </select>
                ) : null
              ) : null}
              {this.state.errors.city ? (
                <span className="form_errors">
                  {this.state.errors.city.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="آدرس"
                value={this.state.address}
                onChange={this.onChange}
                name="address"
              />
              {this.state.errors.address ? (
                <span className="form_errors">
                  {this.state.errors.address.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="کدپستی"
                value={this.state.postal_code}
                onChange={this.onChange}
                name="postal_code"
              />
              {this.state.errors.postal_code ? (
                <span className="form_errors">
                  {this.state.errors.postal_code.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}

              <input
                type="phone"
                placeholder="تلفن همراه"
                value={this.state.phone_number}
                onChange={this.onChange}
                name="phone_number"
              />
              {this.state.errors.phone_number ? (
                <span className="form_errors">
                  {this.state.errors.phone_number.map(e => (
                    <p>{e}</p>
                  ))}
                </span>
              ) : null}

              <button type="submit" className="update-btn">
                بروزرسانی{" "}
              </button>
            </form>
          </div>
        ) : null}
      </section>
    );
  }
}
const mapDispatchToProps = {
  updateAddress: existing_address,
  removeAddress: remove_address,
  selectAddress: init_selected_add,
  post_req: post_req,
  post_load_success: post_load_success,
  post_load_failed: post_load_failed
};
export default connect(
  null,
  mapDispatchToProps
)(Address);
