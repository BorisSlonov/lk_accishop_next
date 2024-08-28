import React from "react";

interface Props {
    className?: string;
}

function Arrow({ className }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="none"
            viewBox="0 0 13 13"
            className={className}
        >
            <path
                fill="#7BF2DA"
                d="M.293 11.293a1 1 0 101.414 1.414L.293 11.293zM13 1a1 1 0 00-1-1H3a1 1 0 000 2h8v8a1 1 0 102 0V1zM1.707 12.707l11-11L11.293.293l-11 11 1.414 1.414z"
            ></path>
        </svg>
    );
}

export default Arrow;