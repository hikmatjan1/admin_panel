import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const initState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isfetching: false,
    error: false,
    loader: true,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                error: true
            }
        // case EXIT:
        //     return {
        //         ...state,
        //         user: null
        //     }
        default: return state
    }
}

export default reducer;