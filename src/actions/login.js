import axios from '../axios';
import {Redirect} from 'react-router';

export function login(data){
    return dispatch => {
        return axios.post('/auth/jwt/login/' , {
            username : data.username,
            password : data.password
        }).then(res => {
            const token = res.data.data.token
            console.log('token' , token)
            localStorage.setItem('jwtToken',JSON.stringify(res.data.data))
          

        })
    }
}