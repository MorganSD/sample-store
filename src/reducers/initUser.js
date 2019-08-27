import axios from "../axios";
import {
  CARD_DISPLAY,
  CARD_LOADING,
  DISPLAY_CARD_PRODUCT,
  INIT_SEARCH,
  INIT_CARD,
  INIT_GUEST,
  INIT_LOGIN_USER,
  FAVOURITE_DISPALY,
  UPDATE_FAVOURITES,
  INIT_USER_TOKEN,
  INIT_LOGOUT_USER,
  INIT_LIST,
  NEXT_FIELD
} from "../actions/actions";
import {
  INIT_ADDRESS,
  CLEAR_ADDRESS,
  INIT_SELECTED_ADD,
  INIT_SELECTED_SHIPPING,
  INIT_SELECTED_PAYMENT,
  INIT_SELECTED_SHIPPING_DATE,
  INIT_RATE,
  INIT_COMMENT,
  init_comment
} from "../actions/costumerInfo";

const initialState = {
  card: {
    cart: []
  },
  cardDisplay: false,
  favouriteDisplay: false,
  currentUser: {
    user: [],
    selected_ad: "",
    selected_shipping: "",
    selected_payment: "",
    selected_shipping_date: "",
    rate: "",
    comment: "",
    next_field: '',
    complete_sub_pro : false ,
    address: {
      addresss: []
    }
  },
  favouriteProducts: [],
  search_val: null,
  userLogedIn: false,
  userToken: null,
  product_list: [],
  sub_products: []
};

const InitUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GUEST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser.address,

          user: action.guest
        },
        userLogedIn: false
      };
    }

    case INIT_LOGIN_USER: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser.address,
          user: action.user
        },
        userLogedIn: true
      };
    }
    case INIT_USER_TOKEN: {
      return {
        ...state,
        userToken: action.token
      };
    }
    case CARD_DISPLAY: {
      return {
        ...state,
        cardDisplay: !state.cardDisplay
      };
    }
    case CARD_LOADING: {
      return {
        ...state,
        card: {
          isLoading: !state.isLoading
        }
      };
    }
    case DISPLAY_CARD_PRODUCT: {
      return {
        ...state,
        card: {
          cart: action.cart.data.cart
        }
      };
    }
    // favourites reducers
    case FAVOURITE_DISPALY: {
      return {
        ...state,
        favouriteDisplay: !state.favouriteDisplay
      };
    }
    case UPDATE_FAVOURITES: {
      return {
        ...state,
        favouriteProducts: action.favourites.favorites
      };
    }
    case INIT_SEARCH: {
      // let filter = action.item
      return {
        ...state,
        search_val: action.item
      };
    }
    case INIT_LOGOUT_USER: {
      return {
        ...state,
        userLogedIn: false
      };
    }

    case INIT_LIST: {
      return {
        ...state,
        product_list: action.list
      };
    }
    case INIT_ADDRESS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser.user,
          address: action.address
        }
      };
    }
    case CLEAR_ADDRESS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          address: {}
        }
      };
    }
    case INIT_SELECTED_ADD: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          selected_ad: action.address
        }
      };
    }
    case INIT_SELECTED_SHIPPING: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          selected_shipping: action.method
        }
      };
    }
    case INIT_SELECTED_PAYMENT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          selected_payment: action.method
        }
      };
    }
    case INIT_SELECTED_SHIPPING_DATE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          selected_shipping_date: {
            date: action.date,
            hour: action.hour
          }
        }
      };
    }
    case INIT_RATE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          rate: action.rate
        }
      };
    }
    case INIT_COMMENT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          comment: action.comment
        }
      };
    }
    case NEXT_FIELD :{
      return{
        ...state,
        currentUser :{
          ...state.currentUser,
          next_field : action.next
        }
      }
    }
    // case ADD_SUB_PRODUCT: {
    //   let choice = state.currentUser.sub_products;
    //   choice.push(new_choice.action);
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       sub_products: choice
    //     }
    //   };
    // }
    default:
      return state;
  }
};

export default InitUserReducer;
