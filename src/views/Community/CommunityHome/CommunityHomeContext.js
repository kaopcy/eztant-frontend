import { createContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { COMMUNITY } from "../../../generalConfig";

import { v4 as uuid } from "uuid";

const actions = {
    ADD_POST: "ADD_POST",
    COMMENT_POST: "COMMENT_POST",
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case actions.ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: uuid(),
                        body: payload.newPost,
                        created_at: new Date(),
                        comments: [],
                        user: payload.user,
                    },
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
        default:
            return state;
    }
};

export const CommunityContext = createContext();

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, COMMUNITY);
    const { user } = useSelector(state => state.user);

    useEffect(()=>{
        console.log(state);
    },[state])

    const value = {
        community: state,
        addPost: newPost => {
            dispatch({ type: actions.ADD_POST, payload: { newPost, user } });
        },
        addComment: (newComment, index) => {
            dispatch({ type: actions.COMMENT_POST, payload: { newComment, user, index } });
        },
    };

    return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};
