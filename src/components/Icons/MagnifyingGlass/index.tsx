import { FC, HTMLAttributes } from "react";

const MagnifyingGlass: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="magnifyingGlass" viewBox="0 0 50 50" fill="none" {...props}>
    <path d="M21.875 35.9375C29.6415 35.9375 35.9375 29.6415 35.9375 21.875C35.9375 14.1085 29.6415 7.8125 21.875 7.8125C14.1085 7.8125 7.8125 14.1085 7.8125 21.875C7.8125 29.6415 14.1085 35.9375 21.875 35.9375Z" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42.1874 42.1875L31.8218 31.8219" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default MagnifyingGlass;
