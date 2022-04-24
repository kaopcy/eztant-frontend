import { createContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { COMMUNITY } from "../../generalConfig";

import { v4 as uuid } from "uuid";

const actions = {
    ADD_POST: "ADD_POST",
    COMMENT_POST: "COMMENT_POST",
    TOGGLE_ISPLAY: "TOGGLE_ISPLAY",
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case actions.ADD_POST: {
            console.log(payload.file);
            return {
                ...state,
                posts: [
                    {
                        id: uuid(),
                        isPlay: true,
                        body: payload.newPost,
                        created_at: new Date(),
                        comments: [],
                        user: payload.user,
                        file: {
                            name: payload.file?.name,
                            size: payload.file?.size,
                            created_at: new Date(),
                        },
                    },
                    ...state.posts,
                ],
            };
        }
        case actions.COMMENT_POST: {
            return {
                ...state,
                posts: state.posts.map((old, index) => {
                    if (index === payload.index) {
                        return {
                            ...old,
                            comments: [
                                ...old.comments,
                                {
                                    id: uuid(),
                                    body: payload.newComment,
                                    created_at: new Date(),
                                    user: payload.user,
                                },
                            ],
                        };
                    }
                    return old;
                }),
            };
        }
        case actions.TOGGLE_ISPLAY: {
            return {
                ...state,
                posts: state.posts.map((old, index) => {
                    if (index === payload.index) {
                        return {
                            ...old,
                            isPlay: false,
                        };
                    }
                    return old;
                }),
            };
        }
        default:
            return state;
    }
};

export const CommunityContext = createContext();
export const CommunityActionContext = createContext();

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, COMMUNITY);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        console.log(state);
    }, [state]);

    const action = {
        addPost: (newPost, file) => {
            dispatch({ type: actions.ADD_POST, payload: { newPost, user, file } });
        },
        addComment: (newComment, index) => {
            dispatch({ type: actions.COMMENT_POST, payload: { newComment, user, index } });
        },
        toggleIsPlay: index => {
            dispatch({ type: actions.TOGGLE_ISPLAY, payload: { index } });
        },
    };

    return (
        <CommunityActionContext.Provider value={action}>
            <CommunityContext.Provider value={state}>{children}</CommunityContext.Provider>;
        </CommunityActionContext.Provider>
    );
};
