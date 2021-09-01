import React from "react";
import { useFormDataContext } from "../Reservation";
import { useResponsive } from "../../DimensionsContext";

const ReservationHeaderBlock = () => {
    const formData = useFormDataContext();
    const isMd = useResponsive().isMd;
    let logo, space;
    if (isMd) {
        logo = (
            <svg v-if="windowInfo.isMd" className="ReservationHeaderBlock-icon">
                <image href="../../../public/icon.svg" className="ReservationHeaderBlock-icon" />
            </svg>
        );
        space = <div>,&nbsp;</div>;
    }
    return (
        <div className="grid mx-auto ReservationHeaderBlock">
            {logo}
            <div className="title max-content">Rezervace</div>
            <div className="ReservationInfo flex h-fit-content">
                <div className="ReservationInfo-date">{formData.date}</div>
                {space}
                <div className="ReservationInfo-hours">{formData.time}</div>
            </div>
        </div>
    );
};

export { ReservationHeaderBlock };
