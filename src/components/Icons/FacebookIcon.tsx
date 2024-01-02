import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

function FacebookIcon(props: Props) {
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
      <path
        fill="#2525F6"
        d="M13.5 0C6.32 0 .5 5.82.5 13c0 6.517 4.801 11.9 11.056 12.84v-9.395H8.34v-3.417h3.216v-2.274c0-3.764 1.835-5.416 4.963-5.416 1.498 0 2.292.111 2.666.161v2.982h-2.134c-1.328 0-1.792 1.26-1.792 2.68v1.867h3.893l-.528 3.417H15.26v9.422C21.604 25.007 26.5 19.58 26.5 13c0-7.18-5.82-13-13-13Z"
      />
    </svg>
  );
}

export default FacebookIcon;
