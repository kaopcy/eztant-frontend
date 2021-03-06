import React, { useRef } from "react";

const Eztant = ({ className }) => {
    const teeRef = useRef(null);
    const zeeRef = useRef(null);
    return (
        <svg
            className={className}
            id="bd1524d9-c245-4615-8b9b-e175effaa0d5"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 874 576">
            <title>eztant</title>
            <g id="b840499b-d08c-42b3-b285-da0cc036cfce" data-name="Layer 2">
                <polygon points="0 0 874 0 874 499 440 576 0 499 0 0" fill="#fff" />
                <path
                    d="M489,23.3q-39.5,58-79,116H113v250l282,47,42,123.1L23,482.3V23.3Z"
                    transform="translate(-3 -3.29999)"
                    style={{ fill: "#2b3590" }}
                />
                <path
                    ref={zeeRef}
                    d="M501,23.3q-39.5,58-79,116H726q-159.5,148.5-319,297l42,123,408-77v-93l-320,47q160-148.5,320-297V23.3Z"
                    transform="translate(-3 -3.29999)"
                    style={{ fill: "#ef4623" }}
                />
                <path
                    ref={teeRef}
                    d="M407.2,328.8V227.6l-206.1-7.5q.45-31.9.9-63.8H133v219l69,12q-.45-33.35-.9-66.7Z"
                    transform="translate(-3 -3.29999)"
                    style={{ fill: "#2b3590" }}
                />
                <path d="M594,407.3q131.5-120.5,263-241v197Z" transform="translate(-3 -3.29999)" style={{ fill: "#ef4623" }} />
            </g>
        </svg>
    );
};

export default Eztant;
