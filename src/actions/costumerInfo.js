import axios from "../axios";
import { init_card } from "../actions/actions";
export const INIT_ADDRESS = "INIT_ADDRESS";
export const CLEAR_ADDRESS = "CLEAR_ADDRESS";
export const INIT_SELECTED_ADD = "INIT_SELECTED_ADD";
export const INIT_SELECTED_SHIPPING = 'INIT_SELECTED_SHIPPING';
export const INIT_SELECTED_PAYMENT ='INIT_SELECTED_PAYMENT';
export const INIT_SELECTED_SHIPPING_DATE ='INIT_SELECTED_SHIPPING_DATE'
export const INIT_RATE = 'INIT_RATE';
export const INIT_COMMENT = 'INIT_COMMENT';
export const init_address = address => {
  return {
    type: INIT_ADDRESS,
    address: address.addresss
  };
};
export const clear_address = () => {
  return {
    type: CLEAR_ADDRESS
  };
};

// export function add_new_address() {
//   return function(dispatch) {
//     return axios.post(``);
//   };
// }
export function existing_address() {
  return function(dispatch) {
    return axios
      .get(`/profiles/address/list/`)
      .then(res => {
        dispatch(init_address(res.data.data));
      })
      .catch(error => console.log(error, "exiting address error"));
  };
}
export function update_address(address_slug, new_address) {
  return function(dispatch) {
    return axios
      .patch(`/v2/profiles/address/${address_slug}/update/`, new_address)
      .then(res => {
        if (res.status < 400) {
          dispatch(existing_address());
        }
      })
      .catch(error => console.log(error, "update address"));
  };
}

export function remove_address(address_slug) {
  return function(dispatch) {
    return axios
      .delete(`/v2/profiles/address/${address_slug}/update/`)
      .then(res => {
        if (res.status < 400) {
          dispatch(existing_address());
          alert("ادرس انتخاب شده حذف شد");
        }
      })
      .catch(error => console.log(error, "remove address"));
  };
}
export const init_selected_add = address => {
  return {
    type: INIT_SELECTED_ADD,
    address: address
  };
};
// export function update_cart_address(add) {
//   return function(dispatch) {
//     return axios
//       .patch(`/v2/orders/cart/update/`, {
//         delivering_address: add
//       })
//       .then(res => {
//         if (res.status < 400) {
//           dispatch(existing_address());
//           dispatch(init_card());
//         }
//       })
//       .catch(error => console.log("update add cart", error));
//   };
// }

export const init_selected_shipping = (selected_method) =>{
    return{
        type : INIT_SELECTED_SHIPPING ,
        method : selected_method
    }
}
export const init_selected_shipping_date = (selected_hour , selected_date) =>{
  return{
      type : INIT_SELECTED_SHIPPING_DATE ,
      date : selected_date,
      hour : selected_hour
  }
}
export const init_selected_payment = (selected_method) =>{
    return {
        type : INIT_SELECTED_PAYMENT ,
        method : selected_method
    }
}

export const init_rate = (rate) =>{
  return {
    type : INIT_RATE ,
    rate : rate
  }
}
export const init_comment=(comment) => {
  return{
    type : INIT_COMMENT,
    comment : comment
  }
}
// export function update_cart_shipping(selected_method){
//     return function(dispatch){
//         return axios.patch(`/v2/orders/cart/update/` ,{
//             shipping_method : selected_method
//         }).then(res => {
//             if(res.status < 400 ){
//                 dispatch(existing_address());
//                 dispatch(init_card());
//             }
//         }).catch(error => console.log("update shipping cart", error))
//     }

// }