import { createContext, useContext, useState } from "react";
import { REQUEST_LIST } from "../../generalConfig";

const UserPostContext = createContext();
const SetUserPostContext = createContext();

export const RequestListProvider = ({ children }) => {
    const [userpost, setUserpost] = useState(REQUEST_LIST);
    return (
        <UserPostContext.Provider value={userpost}>
            <SetUserPostContext.Provider value={setUserpost}>{children}</SetUserPostContext.Provider>
        </UserPostContext.Provider>
    );
};

export const useUserPost = () => useContext(UserPostContext);

export const useHandleUserPost = (postNum, sectionNum, userNum) => {
    const setUserPost = useContext(SetUserPostContext);

    const setAccept = () => {
        setUserPost(oldValue => {
            return oldValue.map((post, index) => {
                if (index === postNum) {
                    return {
                        ...post,
                        tables: post.tables.map((section, i) => {
                            if (i === sectionNum) {
                                return {
                                    ...section,
                                    requested: section.requested.map((user, userI) => {
                                        if (userI === userNum) {
                                            return { ...user, is_accepted: true };
                                        }
                                        return user;
                                    }),
                                };
                            }
                            return section;
                        }),
                    };
                }
                return post;
            });
        });
    };

    const unAccept = () => {
        setUserPost(oldValue => {
            return oldValue.map((post, index) => {
                if (index === postNum) {
                    return {
                        ...post,
                        tables: post.tables.map((section, i) => {
                            if (i === sectionNum) {
                                return {
                                    ...section,
                                    requested: section.requested.map((user, userI) => {
                                        if (userI === userNum) {
                                            return { ...user, is_accepted: false };
                                        }
                                        return user;
                                    }),
                                };
                            }
                            return section;
                        }),
                    };
                }
                return post;
            });
        });
    };

    const reject = () => {
        setUserPost(oldValue => {
            return oldValue.map((post, index) => {
                if (index === postNum) {
                    return {
                        ...post,
                        tables: post.tables.map((section, i) => {
                            if (i === sectionNum) {
                                return {
                                    ...section,
                                    requested: section.requested.filter((_, userI) => userI !== userNum),
                                };
                            }
                            return section;
                        }),
                    };
                }
                return post;
            });
        });
    };

    return { setAccept, unAccept, reject };
};

export const useSetUserPost = () => useContext(SetUserPostContext);
