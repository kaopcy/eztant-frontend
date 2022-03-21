import React, { useReducer, useContext, createContext } from "react";

const AuthContext = createContext({ 
    user: null,
    login: () => {},
    logout: () => {},
});

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            console.log(`username: ${action.payload.email}, password: ${action.payload.password}`);    
            return {
                ...state,
                user: action.payload,
            };
        }
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

const AuthProvider = (props) => {
    const [authState, dispatch] = useReducer(authReducer, { user: null });

    const login = (userData) => {
        dispatch({
            type: "LOGIN",
            payload: userData,
        });
    };

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user: authState.user,
                logout,
                login,
            }}
            {...props}
        />
    );
};

export { AuthContext, AuthProvider };
