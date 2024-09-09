import { FC, HTMLAttributes } from "react";

const OpenedArrow: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="openedArrow" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M2 9L12 19L22 9" strokeWidth="2" />
  </svg>
);

export default OpenedArrow;
