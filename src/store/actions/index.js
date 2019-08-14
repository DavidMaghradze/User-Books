export const addUser = user => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}

export const removeUser = email => {
    return {
        type: 'REMOVE_USER',
        payload: email
    }
}

export const editUser = user => {
    return {
        type: 'EDIT_USER',
        payload: user
    }
}