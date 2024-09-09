import { useFormDataContext } from "../Reservation";
import { useResponsive } from "../../DimensionsContext";
import Logo from "../Icons/Logo";

const ReservationHeaderBlock = () => {
  const { formData } = useFormDataContext();
  const isMd = useResponsive().isMd;

  return (
    <div className="grid mx-auto ReservationHeaderBlock">
      {isMd && <Logo className="ReservationHeaderBlock-icon" />}
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
