import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import { init_card } from "../../actions/actions";
import {existing_address} from '../../actions/costumerInfo';

class PostInfo extends Component {
  constructor() {
    super();
    this.state = {
      cities: {},
      states: {},
      selected_state: "",
      enableCities: false,
      address :{
        title : '',
        city:'',
        postal_code:'',
        phone_number: '',
        address:''
      }
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
  changeData = (e) =>{
    this.setState({
      address :{
        ...this.state.address,
        [e.target.name] : e.target.value

      }
    })
  }
  setCity = (e) =>{
    this.setState({
      address : {
        ...this.state.address,
        city : e.target.value,
        phone_number : this.props.phone_number
      }
    })
  }
  submitAddress = (e) =>{
    e.preventDefault();
axios.post('/profiles/address/add/',this.state.address).then(res =>{
  if(res.status < 400){
    this.props.init_card();
    this.props.updateAddress();
    this.props.changeAddState();

  }else{alert('خطا ! دوباره تلاش کنید')}

  
}).catch(error => console.log(error, 'add new address error'))
  }
  render() {
    let states = this.state.states.states
console.log('staaaaa',this.state.address)
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
          name='title'
          value = {this.state.address.title}
          onChange={(e) =>{this.changeData(e)}}
          required
        />
        {states ? (
          <select onChange={this.selectState} >
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
              {this.state.cities.map(city => (
                <option value={city.slug}>{city.name}</option>
                ))}
            </select>
          ) : null
        ) : null}
        <input type="text" placeholder="آدرس" className="fullWidth" required    name='address'
          value = {this.state.address.address}
          onChange={(e) =>{this.changeData(e)}}/>
        <input
          type="text"
          value = {this.state.address.postal_code}
          name = 'postal_code'
          placeholder="کدپستی"
          className="fullWidth"
          onChange={(e) =>{this.changeData(e)}}

          required
        />
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

};
export default connect(
  null,
  mapDispatchToProps
)(PostInfo);
