export const POST_REQ = 'POST_REQ';
export const POST_LOAD_SUCCESS = 'POST_LOAD_SUCCESS';
export const POST_LOAD_FAILED = 'POST_LOAD_FAILED';
export const POST_RESET_ERRORS = 'POST_RESET_ERRORS';
export const INTERNAL_SERVER_500 = 'INTERNAL_SERVER_500';

export const post_req = () =>{
    return {
        type : POST_REQ
    }
}

export const post_load_success = () =>{
    return {
        type : POST_LOAD_SUCCESS
    }
}

export const post_load_failed = (error) =>{
    return {
        type : POST_LOAD_FAILED,
        error : error
    }
}
export const reset_errors =() =>{
    return{
        type : POST_RESET_ERRORS
    }
}
export const internal_server_500 = () =>{
    return{
        type : INTERNAL_SERVER_500,
        error : 'خطای سرور'
    }
}