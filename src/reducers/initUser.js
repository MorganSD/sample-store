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
  INIT_LOGOUT_USER
} from "../actions/actions";

const initialState = {
  card: {
    cart: [],
    errors: null,
    isLoading: false
    // display : false
  },
  cardDisplay: false,
  favouriteDisplay: false,
  currentUser: [],
  totalPrice: 0,
  
  favouriteProducts: [],
  search_val: null,
  userLogedIn: false,
  userToken: null,
  currentListOfProducts: []
};

const InitUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GUEST: {
         return {
        ...state,
        currentUser: action.guset,
        // userToken: action.guset.token,
        userLogedIn: false
      };
    }

    case INIT_LOGIN_USER: {

      return {
        ...state,
        currentUser: action.user,
        userLogedIn: true
      };
    }
    case INIT_USER_TOKEN :{
      return{
        ...state,
        userToken: action.token 

      }
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
    case INIT_LOGOUT_USER : {
      return {
        ...state,
        userLogedIn: false
      };
    }
    case "UPDATE_CURRENT_LIST_OF_PRODUCTS": {
      console.log("current", action.data);
      return {
        ...state,
        currentListOfProducts: action.data
      };
    }
    default:
      return state;
  }
};

export default InitUserReducer;
