import { FC, HTMLAttributes } from "react";

const Arrow: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="arrow" width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
    <circle cx="40" cy="40" r="30" transform="rotate(180 40 40)" fill="white" />
    <path d="M35.2105 26.3594C35.0019 26.3594 34.7979 26.4214 34.6245 26.5373C34.4511 26.6532 34.316 26.818 34.2362 27.0107C34.1564 27.2035 34.1356 27.4156 34.1763 27.6201C34.2171 27.8247 34.3176 28.0126 34.4652 28.1601L46.7199 40.4149L34.4652 52.6696C34.273 52.8686 34.1667 53.135 34.1691 53.4115C34.1715 53.688 34.2825 53.9526 34.478 54.1481C34.6736 54.3437 34.9381 54.4546 35.2146 54.457C35.4911 54.4594 35.7576 54.3531 35.9565 54.161L48.9572 41.1602C49.155 40.9624 49.266 40.6942 49.266 40.4145C49.266 40.1349 49.155 39.8666 48.9572 39.6689L35.9565 26.6681C35.8585 26.5702 35.7422 26.4925 35.6142 26.4395C35.4862 26.3866 35.349 26.3593 35.2105 26.3594Z" />
  </svg>
);

export default Arrow;