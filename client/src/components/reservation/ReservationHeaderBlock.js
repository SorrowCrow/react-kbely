import React from "react";
import { useFormDataContext } from "../Reservation";
import { useResponsive } from "../../DimensionsContext";
import logo from "../../assets/icon.svg";

const ReservationHeaderBlock = () => {
    const formData = useFormDataContext();
    const isMd = useResponsive().isMd;

    return (
        <div className="grid mx-auto ReservationHeaderBlock">
            {isMd && <img className="ReservationHeaderBlock-icon" src={logo} alt="Kbely Logo" />}
            <div className="title max-content">Rezervace</div>
            <div className="ReservationInfo flex h-fit-content">
                <div className="ReservationInfo-date">{formData.date}</div>
                {isMd && <div>,&nbsp;</div>}
                <div className="ReservationInfo-hours">{formData.time}</div>
            </div>
        </div>
    );
};

export { ReservationHeaderBlock };
