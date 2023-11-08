// orderReducer.js
const initialState = {
    orders: [],
    loading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_ORDERS_BEGIN':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_ORDERS_SUCCESS':
            return {
                ...state,
                orders: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_ORDERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default orderReducer;
