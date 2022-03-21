import { useContext, createContext } from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveContext = createContext();
export const useResponsive = () => {
    return useContext(ResponsiveContext);
};

export function ResponsiveProvider({ children }) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    return (
        <ResponsiveContext.Provider value={isMobile}>
            {children}
        </ResponsiveContext.Provider>
    );
}
