import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> { }

const ArrowSvg: React.FC<SvgProps> = (props) => (
    <svg
        className="why__aSvg"
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="13"
        viewBox="0 0 7 13"
        fill="none"
        {...props}
    >
        <path
            d="M1 1L6.35858 6.35858C6.43668 6.43668 6.43668 6.56332 6.35858 6.64142L1 12"
            stroke="#01ABAA"
            strokeLinecap="round"
        />
    </svg>
);

export default ArrowSvg;
