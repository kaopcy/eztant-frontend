import {
    GET_USER,
    NEW_NOTIFICATION,
    RESET_ERROR,
    REQUEST_LOGIN,
    VIEW_NOTIFICATION,
    REQUEST_LOGIN_SUCCESS,
    REQUEST_LOGIN_FAILURE,
    LOGOUT,
} from "../actions/type";

const initState = { user: null, isLoading: false, error: false };

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case NEW_NOTIFICATION:
            {
                console.log(action.payload);
                console.log(state.user.notifications);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        notifications: action.payload
                    },
                };
            }
        case GET_USER:
            return {
                ...state,
                user: action?.payload,
            };
        case RESET_ERROR:
            return {
                ...state,
                error: false,
            };
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true,
                error: false,
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
