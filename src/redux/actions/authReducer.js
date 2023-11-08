const initialState = {
    user: null,
    authenticated: false,
    loading: true,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          authenticated: true,
          loading: false,
        };
      case 'REGISTER_FAIL':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      // handle other actions
      default:
        return state;
    }
  };
  
  export default authReducer;
  