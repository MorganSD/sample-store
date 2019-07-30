import axios from 'axios';
import {connect} from 'react-redux';

// const token = JSON.parse(localStorage.getItem("jwtToken")).token;

const instance = axios.create({
    baseURL : 'http://api.projectant.aasoo.ir',
    // headers : { Authorization: `Token e4eb7493f0814fb9fc724b02c9284c1f848a188b`}
})


instance.defaults.headers.common = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
    accept: "application/json",
    "x-store-sub-address": "sib",

}

instance.interceptors.request.use(request => {
    
    if (!request.headers.Authorization) {
        const token = JSON.parse(localStorage.getItem("jwtToken")).token;
        console.log('token',token)
        if (token) {
          request.headers.Authorization = `Token ${token}`;

        }
      }else{
        console.log('!token')

      }
  
    return request
},error => {
    console.log(error)
    
}
)


const mapStateToProps = state => {
    return { token: state.InitUserReducer.currentUser.token };
  };

export default connect(
    mapStateToProps
  )(instance);