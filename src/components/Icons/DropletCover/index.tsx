import { FC, HTMLAttributes } from "react";

const DropletCover: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="dropletCover" viewBox="0 0 188.9125 74.347919" width="714" height="281" preserveAspectRatio="none" {...props}>
    <path d="M 0 0 L 0 22 L 0 281 L 714 281 L 714 22 C 665.26167 22 619.93755 -1.511811e-06 571.19922 0 C 522.46089 1.511811e-06 477.13864 21.999996 428.40039 22 C 379.6621 22 334.3379 9.4739031e-15 285.59961 0 C 236.86126 -3.7795275e-06 191.53909 22 142.80078 22 C 94.062466 22 48.738313 -3.7795275e-06 0 0 z " transform="scale(0.26458334)" />
  </svg>
);

export default DropletCover;
