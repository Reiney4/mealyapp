// authReducer.js
const initialState = {
    isAuthenticated: false,
    user: {},
    error: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                error: action.error
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                error: null
            };
        case 'REGISTER_SUCCESS':   // Added this case
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case 'REGISTER_FAIL':   // Added this case
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                error: action.payload
            };
        default:
            return state;
    }
}

export default authReducer;
