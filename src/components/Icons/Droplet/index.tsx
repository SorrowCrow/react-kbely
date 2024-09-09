import { FC, HTMLAttributes } from "react";

const Droplet: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="droplet" viewBox="0 0 71.437502 87.047919" preserveAspectRatio="none" {...props}>
    <path d="m 71.4375,51.329166 c 0,19.726921 -15.991829,35.71875 -35.71875,35.71875 C 15.991829,87.047916 0,71.056087 0,51.329166 0,41.465706 4.1014203,32.637851 10.46178,26.072196 L 35.71875,0 60.97572,26.072196 c 6.36036,6.565655 10.46178,15.39351 10.46178,25.25697 z" />
  </svg>
);

export default Droplet;
