import React from "react";
import Teachersearchbar from "./Teachersearchbar";
// import Teacherlist from './Teacherlist'
import Teacherdirectory from "./Teacherdirectory";

const index = () => {
    return (
        <div>
            <div>
                <Teachersearchbar />
            </div>
            <div>
                <Teacherdirectory />
            </div>
        </div>
    );
};

export default index;
