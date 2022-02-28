import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="relative flex h-[80px] w-full items-center justify-end space-x-7 bg-slate-100 px-4 font-bold text-blue-700">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="login">Login</CustomLink>
            <CustomLink to="register">Register</CustomLink>
        </div>
    );
};

const CustomLink = ({ children, to, ...props }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });

    return (
        <Link style={{ color: match ? "red" : "inherit" }} to={to} {...props}>
            {children}
        </Link>
    );
};

export default Navbar;
