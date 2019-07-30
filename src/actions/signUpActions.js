import axios from "../axios";
import {Redirect} from 'react-router';
export function userSignUpRequest(userData) {
    return dispatch => {
        return axios.post('/profiles/profile/' , {

            password : userData.password,
            first_name : userData.name,
            email : userData.email,
            phone_number : userData.phone

        }).then(
            res => {
                const token = res.data.data.token
                console.log('token' , token)
                localStorage.setItem('jwtToken',JSON.stringify(res.data.data))
                // <Redirect path="*" to="/" />
            }
        )
    }
}