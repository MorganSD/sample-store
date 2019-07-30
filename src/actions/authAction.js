import axios from '../axios';
import { browserHistory, Redirect } from 'react-router'

export function login(data){
    return dispatch => {
        return axios.post('/auth/jwt/login/' , data)
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('jwtToken' , token);
        })
    }
}