import { store } from './store';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export const setLoginSuccess = (data) => {
    store.dispatch({ type: LOGIN_SUCCESS, payload: data });
}

export const setLoginFailure = () => {
    store.dispatch({ type: LOGIN_FAILURE, payload: null });
}

// export const setExit = () => {
//     store.dispatch({ type: EXIT, payload: null });
// }

// export const setLoader = (data) => {
//     store.dispatch({ type: GET_POST_LOADER, payload: data });
// }