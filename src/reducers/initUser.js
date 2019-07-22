import axios from "../axios";

const initialState = {
  cardDisplay: false,
  currentUser: [],
  cardProduct: [],
  totalPrice: 0,
  favouriteDisplay: false,
  favouriteProducts: []
};

const InitUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_GUEST": {
      axios.post("/profiles/guest/").then(res => {
        localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
      });
      let guset = JSON.parse(localStorage.getItem("jwtToken"));
      return {
        ...state,
        currentUser: guset
      };
    }

    case "INIT_LOGIN_USER": {
      return {
        ...state,
        currentUser: JSON.parse(localStorage.getItem("jwtToken"))
      };
    }
    case "CARD_DISPLAY": {
      const display = !state.cardDisplay;
      return {
        ...state,
        cardDisplay: display
      };
    }
    case "ADD_TO_BASKET": {
      let product = initialState.cardProduct;
      let currentTotalPrice = 0;
      if (!product.find(item => item.address === action.item.address)) {
        product.push(action.item);
        console.log("mahsolate sabade kharid", product);
        product.map(item => (currentTotalPrice += item.price));

        return {
          ...state,
          cardProduct: product,
          totalPrice: currentTotalPrice
        };
      } else {
        alert("این محصول در سبد خرید شما قبلا ثیت شده است");
        return {
          ...state
        };
      }
    }
    case "FAVOURITE_DISPALY": {
      const display = !state.favouriteDisplay;
      return {
        ...state,
        favouriteDisplay: display
      };
    }
    case "ADD_TO_FAVOURITE": {
      let productt = state.favouriteProducts;

      if (!(productt.find(item => item.address === action.item.address))) {
        productt.push(action.item);
        console.log("mahsolate morede alaghe", productt);

        return {
          ...state,
          favouriteProducts: productt
        };
      } else {
        let updateFavourites = productt.filter(item => item.address != action.item.address)
        console.log('update  fav' , updateFavourites)
        return {
          ...state,
          favouriteProducts : updateFavourites
        };
      }
    }
    default:
      return state;
  }
};

export default InitUserReducer;
