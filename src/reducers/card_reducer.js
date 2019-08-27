import { CARD_REQ, CARD_SUCCESS, CARD_FAIL,CARD_RESET_ERROR } from "../actions/card";

const cardState = {
  card_req: false,
  card_success: false,
  card_fail: false,
  card_error :''
};

const CardReducer = (state = cardState, action) => {
  switch (action.type) {
    case CARD_REQ : {
    console.log('init card jkabskjdjl')
      return {
        ...state,
        card_req: true
      };
    }
    case CARD_SUCCESS: {
      return {
        ...state,
        card_req: false,
        card_success: true,
        card_fail: false
      };
    }
    case CARD_FAIL: {
      return {
        
        card_req: false,
        card_success: false,
        card_fail: true,
        card_error : action.error
      };
    }
    case CARD_RESET_ERROR :{
      return{
        ...state,
        card_fail : false
      }
    }
    default:
      return state;
  }
};
export default CardReducer;
