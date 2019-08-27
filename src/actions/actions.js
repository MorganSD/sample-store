import axios from "../axios";
import {Redirect} from 'react-router';
import { existing_address, clear_address } from "./costumerInfo";
import {
  card_requset,
  card_requset_success,
  card_requset_failed
} from "./card";
import { post_req, post_load_success, post_load_failed ,internal_server_500} from "./post";
export const CARD_DISPLAY = "CARD_DISPLAY";
export const INIT_SEARCH = "INIT_SEARCH";
export const INIT_GUEST = "INIT_GUEST";
export const CARD_LOADING = "CARD_LOADING";
export const DISPLAY_CARD_PRODUCT = "DISPLAY_CARD_PRODUCT";
export const INIT_LOGIN_USER = "INIT_LOGIN_USER";
export const INC_PRODUCT_COUNT = "INC_PRODUCT_COUNT";
export const UPDATE_FAVOURITES = "UPDATE_FAVOURITES";
export const FAVOURITE_DISPALY = "FAVOURITE_DISPALY";
export const INIT_USER_TOKEN = "INIT_USER_TOKEN";
export const INIT_LOGOUT_USER = "INIT_LOGOUT_USER";
export const INIT_LIST = "INIT_LIST";
export const NEXT_FIELD = 'NEXT_FIELD';
//start card actions

export const card_dispaly = () => {
  return {
    type: CARD_DISPLAY
  };
};
// export function card_call() {
//   return function(dispatch) {
//     dispatch(card_dispaly());
//     dispatch(card_requset());
//   };
// }
export const card_loading = () => {
  return {
    type: CARD_LOADING
  };
};
export const display_card_product = cart => {
  return {
    type: DISPLAY_CARD_PRODUCT,
    cart: cart
  };
};
export const next_field = (slug) =>{
  return{
    type : NEXT_FIELD ,
    next : slug
  }
}
// export const checkOption = (slug , options) =>{
//  return function (dispatch){ 
//    if(options){

// alert('add')
//   }else{
//     dispatch(add_to_card(slug))
//   }}
// }
export function add_to_card_options(slug){
  return function(dispatch){
    return axios.post(`/shelves/product/${slug}/sub_products/`).then(res =>{
      if(res.status < 400){
        // dispatch(next_field(res.data.data.next_field.slug))
        // console.log(res.data.data.next_field.slug,'slug')
      }
    }).catch(error =>{
      dispatch(post_load_failed(error.response.data.errors))
    })
  }
}
export function add_to_card(slug) {
  return function(dispatch) {
    dispatch(card_dispaly());
    dispatch(card_requset());

    return axios
      .post("/orders/cart/add/", {
        product: slug
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("orders/cart/show/")
            .then(response => {
              if (response.status < 400) {
                dispatch(display_card_product(response.data));
                dispatch(card_requset_success());
                localStorage.setItem(
                  "card",
                  JSON.stringify(response.data.data.cart)
                );
              }
            })
            .catch(error => {
              dispatch(card_requset_failed(error.responsive.data.errors))
              // console.log(error, "add cart error with catch");
            });
          // dispatch (display_card_product(res.data))
          // localStorage.setItem('card' , JSON.stringify(res.data.data))
        } 
      }).catch(error => {
        dispatch(post_load_failed(error.response.data.errors))
        dispatch(card_requset_failed(error.response.data.errors))
        // console.log('errrrrr',error.response.data.errors)
      })
  };
}

export function init_card() {
  return function(dispatch) {
    dispatch(card_requset());
    return axios
      .get("orders/cart/show/")
      .then(response => {
        if (response.status < 400) {
          dispatch(display_card_product(response.data));
          localStorage.setItem("card", JSON.stringify(response.data.data.cart));
          dispatch(card_requset_success());
        }
      })
      .catch(error => {
        // console.log(error.response, "init cart error with catch");
        dispatch(card_requset_failed(error.response.data.errors));
      });
  };
}

export function inc_count(slug) {
  return function(dispatch) {
    dispatch(card_requset());
    return axios
      .post("/orders/cart/add/", {
        product: slug
      })
      .then(res => {
        if (res.status < 400) {
          dispatch(init_card());
        }
      })
      .catch(error => {
        dispatch(card_requset_failed(error.response.data.errors));
      });
  };
}
export function dec_count(slug, step_count) {
  return function(dispatch) {
    dispatch(card_requset());
    return axios
      .post("/orders/cart/set/", {
        product: slug,
        count: step_count
      })
      .then(res => {
        if (res.status < 400) {
          dispatch(init_card());
        }
      })
      .catch(error => {
        dispatch(card_requset_failed(error.response.data.errors));
      });
  };
}
export function delete_product(slug) {

  return function(dispatch) {
    dispatch(post_req());
    return axios
      .post("/orders/cart/remove/", {
        product: slug
      }).then(res => {
        if (res.status < 400) {
          dispatch(init_card());
          dispatch(post_load_success())
        }
      }).catch(error => {
        dispatch(post_load_failed(error.response.data.errors));
        // console.log(error.res, "dec count error with catch");
      });
  };
}
// end card actions

// start favourites actions
export const favourite_display = () => {
  return {
    type: FAVOURITE_DISPALY
  };
};
export const update_favourite = fav => {
  return {
    type: UPDATE_FAVOURITES,
    favourites: fav
  };
};
export function init_fav() {
  return function(dispatch) {
    dispatch(card_requset());
    return axios
      .get("/shelves/favorites/list/")
      .then(response => {
        if (response.status < 400) {
          dispatch(update_favourite(response.data.data));
          localStorage.setItem(
            "favourites",
            JSON.stringify(response.data.data.favorites)
          );
          dispatch(card_requset_success());
          // console.log("add favourite");
        }
      })
      .catch(error => {
        dispatch(card_requset_failed(error.response.data.errors));
        // console.log(error.response, "update fav error with catch");
      });
  };
}

export function add_favourite(slug) {
  return function(dispatch) {
    dispatch(card_requset());
    return axios
      .post("/shelves/favorites/add/", {
        product_slug: slug
      })
      .then(res => {
        if (res.status < 400) {
          dispatch(init_fav());
        }
      })
      .catch(error => {
        dispatch(card_requset_failed(error.response.data.errors));
        // console.log(error.res, "add fav error with catch");
      });
  };
}

export function delete_favourite(slug) {
  return function(dispatch) {
    dispatch(card_requset());
    return axios
      .post("/shelves/favorites/remove/", {
        product_slug: slug
      })
      .then(res => {
        if (res.status < 400) {
          dispatch(init_fav());
        }
      })
      .catch(error => {
        dispatch(card_requset_failed(error.response.data.errors));
        // console.log(error.res, "remove fav error with catch");
      });
  };
}
// end favourite actions

export const init_search = item => {
  return {
    type: INIT_SEARCH,
    item: item
  };
};

export const init_guest = guest => {
  return {
    type: INIT_GUEST,
    guest: guest
  };
};
export const init_login_user = user => {
  return {
    type: INIT_LOGIN_USER,
    user: user
  };
};
export const init_user_token = token => {
  return {
    type: INIT_USER_TOKEN,
    token: token
  };
};
export const logout_user = () => {
  return {
    type: INIT_LOGOUT_USER
  };
};
export function guest() {
  return function(dispatch) {
    return axios
      .post("/profiles/guest/")
      .then(res => {
        if (res.status < 400) {
          localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
          dispatch(init_guest(res.data.data));
          dispatch(init_card());
          dispatch(init_user_token(res.data.data.token));
          dispatch(post_load_success());
        }
      })
      .catch(error => {
        dispatch(post_load_failed(error.response.data.errors));
        // console.log(error, "login error with catch");
      });
  };
}

export function loginUser(username, password) {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .post("/auth/jwt/login/", {
        username: username,
        password: password
      })
      .then(res => {
        if (res.data.status < 400) {
          localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
          dispatch(init_login_user(res.data.data));
          dispatch(init_user_token(res.data.data.token));
          dispatch(init_fav());
          dispatch(existing_address());
          dispatch(init_card());
          dispatch(post_load_success())
          // dispatch(init_card());
          alert("خوش آمدید");
        }
      })
      .catch(error => {
        dispatch(post_load_failed(error.response.data.errors));
        // console.log(error, "login error with catch");
      });
  };
}
export function logout() {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .post("/auth/logout/")
      .then(res => {
        if (res.data.status < 400) {
          dispatch(guest());
          dispatch(logout_user());
          dispatch(clear_address());
          dispatch(post_load_success())
          alert("با موفقیت از حساب کاربری خود خارج شدید");
        }
      })
      .catch(error => {
        dispatch(post_load_failed(error.response.data.errors));
        // console.log(error, "logout error with catch");
      });
  };
}

//start get list items actions
export const init_list = list => {
  return {
    type: INIT_LIST,
    list: list
  };
};

export function list_by_cat(category) {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .get(`/shelves/category/address/${category}/products/`)
      .then(res => {
        if (res.status < 400) {
          dispatch(init_list(res.data.data));
          dispatch(post_load_success());
        }
      })
      .catch(error => {
        if(error.response.data.status === 500){
          dispatch(internal_server_500());
        }
        dispatch(post_load_failed(error.response.data.errors))});
  };
}
export function all_list() {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .get("/shelves/products/")
      .then(res => {
        if (res.status < 400) {
          dispatch(init_list(res.data.data));
          dispatch(post_load_success());
        }
      })
      .catch(error => {
        
        dispatch(post_load_failed(error.response.data.errors));
        // console.log(error, "all list error with catch");
      });
  };
}
export function filter_list(category, filter) {
  return function(dispatch) {
    dispatch(post_req());
    if (category != null) {
      let filter_list = [];
      if(filter.length > 1){
        for(let i = 0;i< filter.length - 1 ; i++){
          filter_list = filter_list + filter[i] + '&'
        }
        filter_list = filter_list + filter[filter.length-1]
      }else{
        filter_list = filter_list + filter[0]

      }
      return axios
        .get(`/shelves/category/${category.slug}/products/?${filter_list}`)
        .then(res => {
          if (res.status < 400) {
            dispatch(init_list(res.data.data));
            dispatch(post_load_success());
          }
          // console.log('feilds',category,field,filter)
        })
        .catch(error => {
          // console.log(error, "list by cat error with catch");
          dispatch(post_load_failed(error.response.data.errors));
        });
    } else {
      let filter_list = '';
      if(filter.length > 1){
        for(let i = 0;i< filter.length - 1 ; i++){
          filter_list = filter_list + filter[i] + '&'
        }
        filter_list = filter_list + filter[filter.length-1]
      }else{
        filter_list = filter_list + filter[0]

      }
     

      return axios
        .get(`/shelves/products/?${filter_list}`)
        .then(res => {
          if (res.status < 400) {
            dispatch(init_list(res.data.data));
            dispatch(post_load_success());
          }
        })
        .catch(error => {
          // console.log(error, "list by cat error with catch");
          dispatch(post_load_failed(error.response.data.errors));
        });
    }
  };
}
export function sort_list(cat, sort) {
  return function(dispatch) {
    dispatch(post_req());
    if (cat === "" || cat === null) {
      return axios
        .get(`/shelves/products/?sort_by=${sort}`)
        .then(res => {
          if (res.status < 400) {
            dispatch(init_list(res.data.data));
            dispatch(post_load_success());
          }
        })
        .catch(error => {
          // console.log(error, "all list error with catch");
          dispatch(post_load_failed(error.response.data.errors));
        });
    } else {
      return axios
        .get(`/shelves/category/${cat}/products/?sort_by=${sort}`)
        .then(res => {
          if (res.status < 400) {
            dispatch(init_list(res.data.data));
            dispatch(post_load_success());
          }
        })
        .catch(error => {
          // console.log(error, "list by sort error with catch");
          dispatch(post_load_failed(error.response.data.errors));
        });
    }
  };
}
export function nextPaginate(next) {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .get(next)
      .then(res => {
        if (res.status < 400) {
          dispatch(post_load_success());
          dispatch(init_list(res.data.data));
        }
      })
      .catch(error => {
        // console.log(error, "next paginate list error with catch");
        dispatch(post_load_failed(error.response.data.errors));
      });
  };
}
export function prevPaginate(prev) {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .get(prev)
      .then(res => {
        if (res.status < 400) {
          dispatch(post_load_success());
          dispatch(init_list(res.data.data));
        }
      })
      .catch(error => {
        // console.log(error, "prev paginate list error with catch");
        dispatch(post_load_failed(error.response.data.errors));
      });
  };
}
export function search_filter(search) {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .get(`/shelves/products/?search=${search}`)
      .then(res => {
        if (res.status < 400) {
          dispatch(init_list(search));
          dispatch(init_list(res.data.data));
          dispatch(post_load_success());
        }
      })
      .catch(error => {
        // console.log(error, "search list error with catch");
        dispatch(post_load_failed(error.response.data.errors));
      });
  };
}

// end get list items actions
