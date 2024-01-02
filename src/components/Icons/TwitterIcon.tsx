import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

function TwitterIcon(props: Props) {
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
      <path
        fill="#EEF1FB"
        d="M20 9.288a5.503 5.503 0 0 1-1.65.477 3.012 3.012 0 0 0 1.263-1.676c-.555.347-1.17.599-1.824.735a2.8 2.8 0 0 0-2.097-.957c-1.586 0-2.872 1.357-2.872 3.03 0 .237.026.469.075.69-2.387-.127-4.503-1.333-5.92-3.166a3.15 3.15 0 0 0-.389 1.524c0 1.05.507 1.978 1.278 2.52a2.754 2.754 0 0 1-1.301-.378v.038c0 1.468.99 2.693 2.304 2.97a2.737 2.737 0 0 1-1.297.053c.365 1.203 1.426 2.08 2.683 2.104A5.574 5.574 0 0 1 6 18.506a7.828 7.828 0 0 0 4.403 1.361c5.283 0 8.171-4.616 8.171-8.62 0-.13-.003-.261-.008-.391A6.033 6.033 0 0 0 20 9.288Z"
      />
    </svg>
  );
}

export default TwitterIcon;
