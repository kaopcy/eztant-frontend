import React from "react";
import Teachersearchbar from './Teachersearchbar'
import Teacherdirectory from './Teacherdirectory'

const UserTeacherList = () => {
    return (
        <div>
          <div>
            <Teachersearchbar/>
          </div>
          <div>
            <Teacherdirectory/>
          </div>
        </div>
      )
};

export default UserTeacherList;
