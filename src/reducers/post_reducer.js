import { POST_REQ, POST_LOAD_SUCCESS, POST_LOAD_FAILED ,POST_RESET_ERRORS} from "../actions/post";

const postState = {
  post_req: false,
  post_success: false,
  post_fail: false,
  post_error: []
};

const PostReducer = (state = postState, action) => {
  switch (action.type) {
    case POST_REQ: {
      return {
          ...state,
        post_req: true
       
      };
    }
    case POST_LOAD_SUCCESS: {
      return {
        post_req: false,
        post_success: true,
        post_fail: false,
        post_error: []
      };
    }
    case POST_LOAD_FAILED: {
      return {
        post_req: false,
        post_success: false,
        post_fail: true,
        post_error: action.error
      };
    }
    case POST_RESET_ERRORS :{
        return{
            ...state,
            post_fail : false
        }
    }
    default:
        return state;
  }
};
export default PostReducer