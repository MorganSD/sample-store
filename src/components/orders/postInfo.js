import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import { init_card } from "../../actions/actions";
import { existing_address } from "../../actions/costumerInfo";
import { post_load_failed } from "../../actions/post";
class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      states: {},
      selected_state: "",
      enableCities: false,
      address: {
        title: "",
        city: "",
        postal_code: "",
        phone_number: "",
        address: ""
      },
      errors:[]
    };
  }
  componentWillMount() {
    axios
      .get("/locations/states/")
      .then(res => {
        if (res.status < 400) {
          console.log("states", res.data.data);
          this.setState({
            states: res.data.data
          });
        }
      })
      .catch(error => console.log("states error", error));
  }

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

  changeData = e => {
    this.setState({
      address: {
        ...this.state.address,
        [e.target.name]: e.target.value
      }
    });
  };
  setCity = e => {
    this.setState({
      address: {
        ...this.state.address,
        city: e.target.value,
        phone_number: this.props.phone_number
      }
    });
  };
  submitAddress = e => {
    e.preventDefault();
    axios
      .post("/profiles/address/add/", this.state.address)
      .then(res => {
        if (res.status < 400) {
          this.props.init_card();
          this.props.updateAddress();
          axios
            .patch("/v2/orders/cart/update/", {
              delivering_address: res.data.data.address.slug
            })
            .then(response => {
              if (response.status < 400) {
                this.props.changeAddState();
                this.props.init_card();
              }
            })
            .catch(error =>
              this.props.post_load_failed(error.response.data.errors)
            );
        }
      })
      .catch(error => {
        // this.props.post_load_failed(error.response.data.errors)
        this.setState({
          errors : error.response.data.errors.form_errors
          
        })
      });
  };
  render() {
    let states = this.state.states.states;
    console.log("staaaaa", this.state.errors);
    return (
      <form
        id="postInfo"
        class="order-box"
        onSubmit={e => {
          this.submitAddress(e);
        }}
      >
        <input
          type="text"
          placeholder="نام آدرس"
          className="fullWidth"
          name="title"
          value={this.state.address.title}
          onChange={e => {
            this.changeData(e);
          }}
          
        />
        {this.state.errors.title ? (<span className='form_errors'>{this.state.errors.title.map(e => <p>{e}</p>)}</span>) : null}
        {states ? (
          <>
          <select onChange={this.selectState} required>
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
          {/* {this.state.errors.city ? (<span className='form_errors'>{this.state.errors.city.map(e => <p>{e}</p>)}</span>) : null} */}
</>
        ) : null}
        {this.state.enableCities ? (
          this.state.cities ? (
            <>
            <select onChange={this.setCity} required>
                            <option selected>شهر</option>

              {this.state.cities.map(city => (
                <option value={city.slug}>{city.name}</option>
              ))}
            </select>
            {this.state.errors.city ? (<span className='form_errors'>{this.state.errors.city.map(e => <p>{e}</p>)}</span>) : null}
</>
          ) : null
        ) : null}

        <input
          type="text"
          placeholder="آدرس"
          className="fullWidth"
          
          name="address"
          value={this.state.address.address}
          onChange={e => {
            this.changeData(e);
          }}
        />
        {this.state.errors.address ? (<span className='form_errors'>{this.state.errors.address.map(e => <p>{e}</p>)}</span>) : null}

        <input
          type="text"
          value={this.state.address.postal_code}
          name="postal_code"
          placeholder="کدپستی"
          className="fullWidth"
          onChange={e => {
            this.changeData(e);
          }}
          
        />
        {this.state.errors.postal_code ? (<span className='form_errors'>{this.state.errors.postal_code.map(e => <p>{e}</p>)}</span>) : null}

        {/* <input type="checkbox" for="reminder" className="check" />
        <label fro="reminder">یادت بمونه</label> */}
        <button type="submit" className="submit-btn">
          ثبت
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = {
  init_card: init_card,
  updateAddress: existing_address,
  post_load_failed: post_load_failed
};
export default connect(
  null,
  mapDispatchToProps
)(PostInfo);
