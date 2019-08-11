import axios from "../axios";
import {existing_address , clear_address} from './costumerInfo';
import {card_requset,card_requset_success,} from './card'
import {post_req,post_load_success,post_load_failed} from './post'
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

//start card actions

export const card_dispaly = () => {
  return {
    type: CARD_DISPLAY
  };
};
export function card_call(){
  return function(dispatch){
    
      dispatch(card_dispaly());
      dispatch(card_requset());
    
  }
}
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
export function add_to_card(slug) {
  return function(dispatch) {
    dispatch(card_dispaly());
    dispatch(card_requset())
    // dispatch(card_loading());
    return axios
      .post("/orders/cart/add/", {
        product: slug
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("orders/cart/show/")
            .then(response => {
              if(response.status < 400 ){
dispatch(display_card_product(response.data));
dispatch(card_requset_success());
              localStorage.setItem(
                "card",
                JSON.stringify(response.data.data.cart)
              );
              }
              
            })
            .catch(error => {
              console.log(error , "add cart error with catch");
            });
          // dispatch (display_card_product(res.data))
          // localStorage.setItem('card' , JSON.stringify(res.data.data))
        } else {
          alert("add to cart errors :", res.data.errors.general_errors);
        }
      });
  };
}

export function init_card() {
  return function(dispatch) {
    dispatch(post_req());
    return axios
      .get("orders/cart/show/")
      .then(response => {
        dispatch(post_load_success())
        if(response.status < 400){
          dispatch(display_card_product(response.data));
        localStorage.setItem("card", JSON.stringify(response.data.data.cart));
        }
      })
      .catch(error => {
        dispatch(post_load_failed())
        console.log(error.response, "init cart error with catch");
      });
  };
}

export function inc_count(slug) {
  return function(dispatch) {
    return axios
      .post("/orders/cart/add/", {
        product: slug
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("orders/cart/show/")
            .then(response => {
              dispatch(display_card_product(response.data));
              localStorage.setItem(
                "card",
                JSON.stringify(response.data.data.cart)
              );
              console.log("success add");
            })
            .catch(error => {
              console.log(error.response, "init cart error with catch");
            });
        } else {
          alert(res.errors.general_errors);
        }
      })
      .catch(error => {
        console.log(error.res, "inc count error with catch");
      });
  };
}
export function dec_count(slug, step_count) {
  return function(dispatch) {
    return axios
      .post("/orders/cart/set/", {
        product: slug,
        count: step_count
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("orders/cart/show/")
            .then(response => {
              dispatch(display_card_product(response.data));
              localStorage.setItem(
                "card",
                JSON.stringify(response.data.data.cart)
              );
              console.log("success add");
            })
            .catch(error => {
              console.log(error.response, "init cart error with catch");
            });
        } else {
          alert(res.errors.general_errors);
        }
      })
      .catch(error => {
        console.log(error.res, "dec count error with catch");
      });
  };
}
export function delete_product(slug) {
  return function(dispatch) {
    return axios
      .post("/orders/cart/remove/", {
        product: slug
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("orders/cart/show/")
            .then(response => {
              dispatch(display_card_product(response.data));
              localStorage.setItem(
                "card",
                JSON.stringify(response.data.data.cart)
              );
              console.log("success add");
            })
            .catch(error => {
              console.log(error.response, "init cart error with catch");
            });
        } else {
          alert(res.errors.general_errors);
        }
      })
      .catch(error => {
        console.log(error.res, "dec count error with catch");
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
    return axios
      .get("/shelves/favorites/list/")
      .then(response => {
        dispatch(update_favourite(response.data.data));
        localStorage.setItem(
          "favourites",
          JSON.stringify(response.data.data.favorites)
        );
        console.log("add favourite");
      })
      .catch(error => {
        console.log(error.response, "update fav error with catch");
      });
  };
}

export function add_favourite(slug) {
  return function(dispatch) {
    return axios
      .post("/shelves/favorites/add/", {
        product_slug: slug
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("/shelves/favorites/list/")
            .then(response => {
              dispatch(update_favourite(response.data.data));
              localStorage.setItem(
                "favourites",
                JSON.stringify(response.data.data.favorites)
              );
              console.log("add favourite");
            })
            .catch(error => {
              console.log(error.response, "update fav error with catch");
            });
        } else {
          console.log(res.errors.general_errors, "add fav error");
        }
      })
      .catch(error => {
        console.log(error.res, "add fav error with catch");
      });
  };
}

export function delete_favourite(slug) {
  return function(dispatch) {
    return axios
      .post("/shelves/favorites/remove/", {
        product_slug: slug
      })
      .then(res => {
        if (res.status < 400) {
          axios
            .get("/shelves/favorites/list/")
            .then(response => {
              dispatch(update_favourite(response.data.data));
              localStorage.setItem(
                "favourites",
                JSON.stringify(response.data.data.favorites)
              );
              console.log("remove favourite");
            })
            .catch(error => {
              console.log(error.response, "update fav error with catch");
            });
        } else {
          console.log(res.errors.general_errors, "remove fav error");
        }
      })
      .catch(error => {
        console.log(error.res, "remove fav error with catch");
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
    return axios.post("/profiles/guest/").then(res => {
      localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
      dispatch(init_guest(res.data.data));
      dispatch(init_card());
      dispatch(init_user_token(res.data.data.token));
    });
  };
}

export function loginUser(username, password) {
  return function(dispatch) {
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
          // dispatch(init_card());
          alert("خوش آمدید");
        } else {
          alert("اطلاعات وارد شده صحیح نمی باشد");
        }
      })
      .catch(error => {
        console.log(error, "login error with catch");
      });
  };
}
export function logout() {
  return function(dispatch) {
    return axios
      .post("/auth/logout/")
      .then(res => {
        if (res.data.status < 400) {
          dispatch(guest());
          dispatch(logout_user());
          dispatch(clear_address());
          alert("با موفقیت از حساب کاربری خود خارج شدید");

        }
      })
      .catch(error => {
        console.log(error, "logout error with catch");
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
    return axios
      .get(`/shelves/category/address/${category}/products/`)
      .then(res => {
        dispatch(init_list(res.data.data));
      })
      .catch(error => console.log(error, "list by cat error with catch"));
  };
}
export function all_list () {
    return function(dispatch) {
        return axios.get('/shelves/products/').then(res =>{
            dispatch(init_list(res.data.data))
        }).catch(error => console.log(error, "all list error with catch"))
    }
}
export function filter_list (category , field , filter){
    return function(dispatch){
      if(category !=null){
        return axios.get(`/shelves/category/${category.slug}/products/?${field}=${filter}`).then(res =>{
          // console.log('feilds',category,field,filter)
          dispatch(init_list(res.data.data))
      }).catch(error => console.log(error, "list by cat error with catch"))
      }else{
        return axios.get(`/shelves/products/?${field}=${filter}`).then(res =>{
          // console.log('feilds',category,field,filter)
          dispatch(init_list(res.data.data))
      }).catch(error => console.log(error, "list by cat error with catch"))
      }
      
    }
}
export function sort_list(cat , sort){
    return function(dispatch){
      if( cat === '' || cat=== null){
        return axios.get(`/shelves/products/?sort_by=${sort}`).then(res =>{
          dispatch(init_list(res.data.data))
      }).catch(error => console.log(error, "all list error with catch"))
      }else{
         return axios.get(`/shelves/category/${cat}/products/?sort_by=${sort}`).then(res => {
            dispatch(init_list(res.data.data))
        }).catch(error => console.log(error, "list by sort error with catch"))
      }
       
    }
}
export function nextPaginate (next){
  return function(dispatch){
    return axios.get(next).then(res => {
      dispatch(init_list(res.data.data))
    }).catch(error => console.log(error, "next paginate list error with catch"))
  }
}
export function prevPaginate(prev){
  return function(dispatch){
    return axios.get(prev).then(res => {
      dispatch(init_list(res.data.data))
    }).catch(error => console.log(error, "prev paginate list error with catch"))
  }
}
export function search_filter(search){
  return function(dispatch){
    return axios.get(`/shelves/products/?search=${search}`).then(res => {
      dispatch(init_list(search))
      dispatch(init_list(res.data.data))
    }).catch(error => console.log(error, "search list error with catch"))
  }
}




// end get list items actions
