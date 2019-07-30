import axios from "../axios";

export const CARD_DISPLAY = 'CARD_DISPLAY';
export const INIT_SEARCH = 'INIT_SEARCH';
export const INIT_GUEST ='INIT_GUEST';
export const CARD_LOADING = 'CARD_LOADING';
export const DISPLAY_CARD_PRODUCT = 'DISPLAY_CARD_PRODUCT';
export const INIT_LOGIN_USER = 'INIT_LOGIN_USER';
export const INC_PRODUCT_COUNT = 'INC_PRODUCT_COUNT';
export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES';
export const FAVOURITE_DISPALY = 'FAVOURITE_DISPALY';
export const INIT_USER_TOKEN = 'INIT_USER_TOKEN';
export const INIT_LOGOUT_USER ='INIT_LOGOUT_USER';
//start card actions

export const card_dispaly = () => {
    return {
        type : CARD_DISPLAY,
    }
}
export const card_loading = () => {
    return{    
        type : CARD_LOADING
    }
}
export const display_card_product = (cart) =>{
    return {
        type : DISPLAY_CARD_PRODUCT,
        cart : cart
    }
}
export function add_to_card (slug){
    return function(dispatch){
        dispatch(card_dispaly());
        dispatch (card_loading());
        return axios.post('/orders/cart/add/',{
            product : slug
        }).then(
            res => {
                if(res.data.status <400){
                    axios.get('orders/cart/show/').then(response => {
                        dispatch (display_card_product(response.data))
                        localStorage.setItem('card' , JSON.stringify(response.data.data.cart))
                    }).catch(error => {
                        console.log(error.response,'add cart error with catch')
                    });
                    // dispatch (display_card_product(res.data))
                    // localStorage.setItem('card' , JSON.stringify(res.data.data))
                }else{
                    console.log('add to cart errors :',res.data.errors.general_errors)
                }
            }
            
        )
        
    }
}

export function init_card (){
    return function (dispatch){
        return axios.get('orders/cart/show/').then(response => {
            dispatch (display_card_product(response.data))
            localStorage.setItem('card' , JSON.stringify(response.data.data.cart))
        }).catch(error => {
            console.log(error.response,'init cart error with catch')
        });
    }
}

export function inc_count (slug){
    return function(dispatch){
        return axios.post("/orders/cart/add/", {
          product: slug
        })
        .then(res => {
          if (res.status < 400) {
            axios.get('orders/cart/show/').then(response => {
                dispatch (display_card_product(response.data))
                localStorage.setItem('card' , JSON.stringify(response.data.data.cart))
                console.log('success add')
            }).catch(error => {
                console.log(error.response,'init cart error with catch')
            });
          } else {
            alert(res.errors.general_errors);
          }
        }).catch(error => {
            console.log(error.res,'inc count error with catch')
        });
    }
}
export function dec_count (slug , step_count){
    return function(dispatch){
        return axios.post("/orders/cart/set/", {
            product: slug,
            count : step_count
          })
          .then(res => {
            if (res.status < 400) {
              axios.get('orders/cart/show/').then(response => {
                  dispatch (display_card_product(response.data))
                  localStorage.setItem('card' , JSON.stringify(response.data.data.cart))
                  console.log('success add')
              }).catch(error => {
                  console.log(error.response,'init cart error with catch')
              });
            } else {
              alert(res.errors.general_errors);
            }
          }).catch(error => {
              console.log(error.res,'dec count error with catch')
          }); 
    }
}
export function delete_product (slug){
    return function(dispatch){
        return axios.post("/orders/cart/remove/", {
            product: slug
          })
          .then(res => {
            if (res.status < 400) {
              axios.get('orders/cart/show/').then(response => {
                  dispatch (display_card_product(response.data))
                  localStorage.setItem('card' , JSON.stringify(response.data.data.cart))
                  console.log('success add')
              }).catch(error => {
                  console.log(error.response,'init cart error with catch')
              });
            } else {
              alert(res.errors.general_errors);
            }
          }).catch(error => {
              console.log(error.res,'dec count error with catch')
          }); 
    }
}
// end card actions



// start favourites actions
export const favourite_display = () =>{
    return {
        type : FAVOURITE_DISPALY
    }
}
export const update_favourite = (fav) =>{
return{
    type : UPDATE_FAVOURITES,
    favourites : fav
}
}
export function init_fav (){
return function(dispatch){
    return axios.get('/shelves/favorites/list/').then(response => {
        dispatch (update_favourite(response.data.data))
        localStorage.setItem('favourites',JSON.stringify(response.data.data.favorites))
        console.log('add favourite')
    }).catch(error =>{
        console.log(error.response,'update fav error with catch')
    })
}
}


export function add_favourite (slug){
    return function(dispatch){
        return axios.post('/shelves/favorites/add/',{
            product_slug : slug
        }).then(res =>{
            if(res.status < 400){
                axios.get('/shelves/favorites/list/').then(response => {
                    dispatch (update_favourite(response.data.data))
                    localStorage.setItem('favourites',JSON.stringify(response.data.data.favorites))
                    console.log('add favourite')
                }).catch(error =>{
                    console.log(error.response,'update fav error with catch')
                })
            }else{
                console.log(res.errors.general_errors , 'add fav error');

            }
        }).catch(error =>{
                console.log(error.res,'add fav error with catch')
        })
    }
}


export function delete_favourite (slug){
    return function(dispatch){
        return axios.post('/shelves/favorites/remove/',{
            product_slug : slug
        }).then(res =>{
            if(res.status < 400){
                axios.get('/shelves/favorites/list/').then(response => {
                    dispatch (update_favourite(response.data.data))
                    localStorage.setItem('favourites',JSON.stringify(response.data.data.favorites))
                    console.log('remove favourite')
                }).catch(error =>{
                    console.log(error.response,'update fav error with catch')
                })
            }else{
                console.log(res.errors.general_errors , 'remove fav error');

            }
        }).catch(error =>{
                console.log(error.res,'remove fav error with catch')
        })
    }
}
// end favourite actions

export const init_search = (item) => {
    return {
        type : INIT_SEARCH,
        item : item 
    }

}


export const init_guest = (guest) => {
    return {
        type : INIT_GUEST,
        guest : guest
    }

}
export const init_login_user = (user) => {
    return {
        type : INIT_LOGIN_USER,
        user : user
    }

}
export const init_user_token =(token) =>{
    return {
        type : INIT_USER_TOKEN,
        token : token
    }
}
export const logout_user =() =>{
    return {
        type : INIT_LOGOUT_USER
    }
}
export function guest(){
    return function(dispatch){
        return  axios.post("/profiles/guest/").then(res => {
            localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
            dispatch(init_guest(res.data.data))
            dispatch(init_user_token(res.data.data.token))

          });
    }
}

export function loginUser(username , password){
    return function(dispatch){
        return axios
        .post("/auth/jwt/login/", {
          username: username,
          password: password
        })
        .then(res => {
          if(res.data.status < 400){
          localStorage.setItem("jwtToken", JSON.stringify(res.data.data))
          dispatch(init_login_user(res.data.data));
          dispatch(init_user_token(res.data.data.token))
          dispatch(init_fav())
          alert('خوش آمدید')
          }else{
              alert('اطلاعات وارد شده صحیح نمی باشد')
          }
        }).catch(error =>{
            console.log(error.res,'login error with catch')
    })
    }
}
export function logout(){
    return function(dispatch){
        return  axios.post('/auth/logout/').then(res => {
           if(res.data.status < 400){
               dispatch(guest());
               alert('با موفقیت از حساب کاربری خود خارج شدید')
                dispatch(logout_user());

           }
        }).catch(error => {
            console.log(error.res,'logout error with catch')

        })
    }
}