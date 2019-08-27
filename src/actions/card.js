import axios from "../axios";

export const CARD_REQ = "CARD_REQ";
export const CARD_SUCCESS = "CARD_SUCCESS";
export const CARD_FAIL = "CARD_FAIL";
export const CARD_RESET_ERROR = 'CARD_RESET_ERROR'

export const card_requset = () => {
  return {
    type: CARD_REQ
  };
};

export const card_requset_success = () => {
  return {
    type: CARD_SUCCESS
  };
};

export const card_requset_failed = (error) => {
  return {
    type: CARD_FAIL,
    error : error
  };
};
export const card_reset_errors = () => {
  return {
    type : CARD_RESET_ERROR
  }
}
