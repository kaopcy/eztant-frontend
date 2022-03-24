import React from "react";
import { ReactComponent as GoogleSVG } from "../../../../assets/logos/google.svg";

const GoogleRegister = () => {
    return (
        <div className="flex cursor-pointer items-center justify-center space-x-2 rounded-full border px-2 py-1 text-sm text-text">
            <div className="h-[25px] w-[25px] rounded-full bg-transparent">
                <GoogleSVG />
            </div>
            <div>ลงทะเบียนด้วยบัญชี Google</div>
        </div>
    );
};

export default GoogleRegister;
