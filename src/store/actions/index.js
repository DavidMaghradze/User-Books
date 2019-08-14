import {
    ADD_USER,
    EDIT_USER,
    REMOVE_USER
} from '../types';

export const addUser = user => {
    return {
        type: ADD_USER,
        payload: user
    }
}

// Using email as  id
export const removeUser = email => {
    return {
        type: REMOVE_USER,
        payload: email
    }
}

export const editUser = user => {
    return {
        type: EDIT_USER,
        payload: user
    }
}