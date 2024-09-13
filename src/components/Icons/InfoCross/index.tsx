import { FC, HTMLAttributes } from "react";

const InfoCross: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
    <svg id="infoCross" viewBox="0 0 46 46" fill="none" {...props}>
        <circle cx="23" cy="23" r="22" stroke="#C7B6DA" strokeWidth="2" />
        <path d="M31.1299 30.87L30.6464 31.3536L23.1636 23.8709L15.2192 31.8153L14.6847 31.2808L22.6291 23.3364L15.1464 15.8537L15.63 15.3701L23.1127 22.8528L30.7808 15.1847L31.3153 15.7192L23.6472 23.3873L31.1299 30.87Z" fill="#C7B6DA" />
        <path fillRule="evenodd" clipRule="evenodd" d="M32.5442 30.87L30.6464 32.7678L23.1636 25.2851L15.2192 33.2295L13.2705 31.2808L21.2149 23.3364L13.7322 15.8537L15.63 13.9559L23.1127 21.4386L30.7808 13.7705L32.7295 15.7192L25.0614 23.3873L32.5442 30.87ZM31.3153 15.7192L30.7808 15.1847L23.1127 22.8528L15.63 15.3701L15.1464 15.8537L22.6291 23.3364L14.6847 31.2808L15.2192 31.8153L23.1636 23.8709L30.6464 31.3536L31.1299 30.87L23.6472 23.3873L31.3153 15.7192Z" fill="#C7B6DA" />
    </svg>
);

export default InfoCross;