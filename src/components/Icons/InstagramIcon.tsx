import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

function InstagramIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="26"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <circle cx="13" cy="13.867" r="13" fill="#2525F6" />
      <g
        stroke="#EEF1FB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#a)"
      >
        <path d="M16.332 7.2H9.665a3.333 3.333 0 0 0-3.333 3.333v6.666a3.333 3.333 0 0 0 3.333 3.334h6.667a3.333 3.333 0 0 0 3.333-3.334v-6.666a3.333 3.333 0 0 0-3.333-3.334Z" />
        <path d="M15.668 13.447a2.667 2.667 0 1 1-5.276.782 2.667 2.667 0 0 1 5.276-.782ZM16.668 10.2h.007" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M5 5.867h16v16H5z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default InstagramIcon;
