import { FC, HTMLAttributes } from "react";

const HeaderMenu: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
    <svg id="headerMenu" viewBox="0 0 60 60" preserveAspectRatio="none" {...props}>
        <circle cx="30" cy="30" r="30" fill="white" />
        <rect x="17" y="36" width="27" height="3" rx="1.5" />
        <rect x="17" y="28" width="27" height="3" rx="1.5" />
        <rect x="17" y="20" width="27" height="3" rx="1.5" />
    </svg>
);

export default HeaderMenu;
