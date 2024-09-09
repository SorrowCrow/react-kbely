import { FC, HTMLAttributes } from "react";

const CalendarArrow: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="calendarArrow" viewBox="0 0 54 54" fill="none" {...props}>
    <path d="M49.0725 27H5.19751" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M49.0725 27L42.3225 35.4375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M49.0725 27L42.3225 18.5625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CalendarArrow;
