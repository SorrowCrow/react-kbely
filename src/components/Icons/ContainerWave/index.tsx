import { FC, HTMLAttributes } from "react";

const ContainerWave: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="containerWave" viewBox="0 0 132.29 5.82076" preserveAspectRatio="none" {...props}>
    <defs id="defs2" />
    <g id="layer1">
      <path id="rect31" d="m 0,0 v 23 c 34.130471,0 65.869529,0 100,0 34.13047,0 65.86949,0 100,0 34.13044,4e-6 65.86954,0 100,0 34.13046,0 65.86956,2e-6 100,0 34.13051,-2e-6 65.86953,0 100,0 v 0 C 465.86953,22.000002 434.13051,-1.5118301e-6 400,0 365.86956,1.5118301e-6 334.13046,21.999998 300,22 265.86954,22 234.13044,0 200,0 165.86949,-3.7795752e-6 134.13047,22 100,22 65.869529,22 34.130471,-3.7795752e-6 0,0 Z" transform="scale(0.26458)" />
    </g>
  </svg>
);

export default ContainerWave;
