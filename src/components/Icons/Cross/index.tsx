import { FC, HTMLAttributes } from "react";

const Cross: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
    <svg id="cross" viewBox="0 0 36 35" preserveAspectRatio="none" {...props}>
        <path d="M35.112 32.8335L34.122 33.8234L18.2828 17.9842L2.01939 34.2477L0.888017 33.1163L17.1515 16.8528L1.31228 1.01365L2.30223 0.0236959L18.1414 15.8629L33.8392 0.165119L34.9706 1.29649L19.2728 16.9943L35.112 32.8335Z" />
    </svg>
);

export default Cross;
