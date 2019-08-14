import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case 'ADD_USER': 
            return { [action.payload.email]: action.payload, ...state}
        case 'EDIT_USER':
            return {...state, [action.payload.email]: action.payload}
        case 'REMOVE_USER':
            const updatedState = _.omit(state, [action.payload]);
            return updatedState
        default :
            return state;
    }
}