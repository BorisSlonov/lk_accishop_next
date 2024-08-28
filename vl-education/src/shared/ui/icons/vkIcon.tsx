import React from "react";

interface Props {
    className?: string;
}

const VKIcon = ({ className }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="61"
            fill="none"
            viewBox="0 0 60 61"
            className={className}
        >
            <circle cx="30" cy="30.5" r="30" fill="#7BF2DA"></circle>
            <path
                fill="#1E1E1E"
                d="M31.54 41.08c-10.938 0-17.178-7.498-17.438-19.978h5.482c.182 9.158 4.22 13.041 7.42 13.838V21.102h5.16v7.9c3.16-.34 6.48-3.94 7.6-7.9h5.16c-.86 4.881-4.46 8.481-7.018 9.96 2.558 1.2 6.662 4.339 8.222 10.022H40.45c-1.22-3.802-4.258-6.74-8.28-7.142v7.142h-.62l-.01-.005z"
            ></path>
        </svg>
    );
};

export default VKIcon;