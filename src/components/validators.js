import Validator from 'validator';
import isEmpty from 'validator/lib/isEmail';

export default function validateInput(data) {
    let errors = {};

    if(data.username == '' || data.username == null){

        errors.username = 'this field is required '
    }

    if (data.password == '' || data.password == null){
        errors.password = 'this field is required '
    }

    return {
        errors ,
        isValid : isEmpty(errors)
    }
}