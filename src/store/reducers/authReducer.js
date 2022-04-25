import { GET_USER, REQUEST_LOGIN, VIEW_NOTIFICATION, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILURE, LOGOUT } from "../actions/type";


const initState = { user: null, isLoading: false, error: false };

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USER:
        return{
            ...state,
            user: action?.payload
        };
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case REQUEST_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action?.payload,
            };
        case REQUEST_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                user: null,
            };
        case LOGOUT:
            return {
                user: null,
            };

        case VIEW_NOTIFICATION: {
            return {
                ...state,
                user: {
                    ...state.user,
                    notification: [],
                },
            };
        }

        default:
            return state;
    }
};

export default authReducer;
