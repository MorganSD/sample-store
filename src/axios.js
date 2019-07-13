import axios from 'axios';
import { promises } from 'fs';

const instance = axios.create({
    baseURL : 'http://api.projectant.aasoo.ir'
})

instance.defaults.headers.common = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-api-key": "0f855b9c2f5ee2a21e530bcaa82a645286724fba",
    accept: "application/json",
    "x-store-sub-address": "sib"
}

instance.interceptors.request.use(request => {
    console.log(request)
    return request
},error => {
    console.log(error)
    
}
)
export default instance;