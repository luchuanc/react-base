import {HIDECODE,SHOWCODE,CODENUMBER} from './actionTypes.js';
export default (state, action) => {
    switch(action.type) {
        case SHOWCODE: {
            return {...state,showCodeNumber:true};
        }
        case HIDECODE: {
            return {...state,showCodeNumber:false};
        }
        case CODENUMBER:{
            return {...state,codeNumber:action.value};
        }
        default: {
            return state===undefined?{}:state;
        }
    }
}