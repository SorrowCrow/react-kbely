import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dispatch, MouseEvent, createContext, useContext, useEffect, useReducer, useState } from "react";
import { CalendarData, useCalendarData } from "./book/CalendarContext";
import { ReservationFormBlock } from "./reservation/ReservationFormBlock";
import { ReservationHeaderBlock } from "./reservation/ReservationHeaderBlock";
import { SummaryBlock } from "./reservation/SummaryBlock";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51JC9K9BJ2QoFP7mPuFYpU6P3MSU7T2ytOURjiAAu9ZuG2JeRuKUi9tU8HV9Eh4BGuCSxsDnpxrQ02fvADiY1dDpD00i37yMksj");

const FormDataContext = createContext(
  {} as {
    formData: FormData;
    setFormData: DispatchType;
  }
);

export function useFormDataContext() {
  return useContext(FormDataContext);
}

const THEREST = {
  SET_DROPDOWN_FALSE: "setDropdownFalse",
  TOGGLE_OZDOBA: "toggleOzdoba",
  TOGGLE_PROSSECCO: "toggleProssecco",
  TOGGLE_MISA: "toggleMisa",
  TOGGLE_DROPDOWN: "toggleDropdown",
  UNSET_TOKEN: "unsetToken",
} as const;

const SETTERS = {
  SET_PERSONS: "setPersons",
  SET_TOKEN: "setToken",
  SET_FORMDATA: "setFormData",
} as const;

const ACTIONS = {
  ...SETTERS,
  ...THEREST,
} as const;

type FormData = {
  date: CalendarData["date"];
  time: CalendarData["time"];
  hours: CalendarData["hours"];
  persons: number;
  misa: boolean;
  prossecco: boolean;
  ozdoba: boolean;
  token: null | string;
  dropdown: boolean;

  email: string;
  phone: string;
  name: string;
  message: string;
};

type OverloadAction =
  | {
      type: (typeof THEREST)[keyof typeof THEREST];
    }
  | {
      type: (typeof SETTERS)[keyof typeof SETTERS];
      payload: FormData;
    };

type DispatchType = Dispatch<
  | {
      type: (typeof THEREST)[keyof typeof THEREST];
    }
  | {
      type: (typeof SETTERS)[keyof typeof SETTERS];
      payload: Partial<FormData>;
    }
>;

const Reservation = () => {
  const { calendarData, setCalendarData } = useCalendarData();
  const [OnlinePayments, setOnlinePayments] = useState(true);
  const [captchaHighlight, setCaptchaHighlight] = useState(false);

  const reducer: { (formData: FormData, action: OverloadAction): FormData } = (formData, action) => {
    switch (action.type) {
      case ACTIONS.SET_FORMDATA:
        return { ...formData, ...action.payload };
      case ACTIONS.UNSET_TOKEN:
        return { ...formData, token: null };
      case ACTIONS.SET_TOKEN:
        return { ...formData, token: action.payload.token };
      case ACTIONS.SET_DROPDOWN_FALSE:
        return { ...formData, dropdown: false };
      case ACTIONS.TOGGLE_DROPDOWN:
        return { ...formData, dropdown: !formData.dropdown };
      case ACTIONS.SET_PERSONS:
        return { ...formData, persons: action.payload.persons };
      case ACTIONS.TOGGLE_OZDOBA:
        return { ...formData, ozdoba: !formData.ozdoba };
      case ACTIONS.TOGGLE_MISA:
        return { ...formData, misa: !formData.misa };
      case ACTIONS.TOGGLE_PROSSECCO:
        return { ...formData, prossecco: !formData.prossecco };
      default:
        console.log("error");
        return formData;
    }
  };

  const [formData, setFormData] = useReducer(reducer, {
    date: calendarData.date,
    time: calendarData.time,
    hours: calendarData.hours,
    persons: 1,
    misa: false,
    prossecco: false,
    ozdoba: false,
    token: null,
    dropdown: false,

    email: "",
    phone: "",
    name: "",
    message: "",
  });

  function exit(e: MouseEvent<Element>) {
    e.stopPropagation();

    setCalendarData({ type: "setTime", payload: { time: undefined } });
  }

  function submit() {
    navigate("/", { replace: true });
    setCalendarData({ type: "unsetData" });
    document.body.style.overflow = "";
  }

  function dropdownFalse(e: MouseEvent<Element>) {
    e.stopPropagation();

    setFormData({ type: ACTIONS.SET_DROPDOWN_FALSE });
  }

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/reservation", { replace: true });
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="pre-reserv fixed overflow-hidden">
      <div className="Reservation x-hidden y-scroll scroll-hidden" onClick={exit.bind(this)}>
        <div className="Reservation__reservationForm mx-auto relative" id="reservation" onClick={dropdownFalse.bind(this)}>
          <div className="Reservation__reservationForm-exit h-p absolute flex content-center align-center" id="reservationExit" onClick={exit.bind(this)}>
            <svg viewBox="0 0 23 23">
              <rect x="3.01471" y="0.893433" width="27" height="3" rx="1.5" transform="rotate(45 3.01471 0.893433)" />
              <rect x="22.1066" y="3.01477" width="27" height="3" rx="1.5" transform="rotate(135 22.1066 3.01477)" />
            </svg>
          </div>
          <Elements stripe={stripePromise}>
            <FormDataContext.Provider value={{ formData, setFormData: setFormData as DispatchType }}>
              <ReservationHeaderBlock />
              <ReservationFormBlock setCaptchaHighlight={setCaptchaHighlight} OnlinePayments={OnlinePayments} exit={submit} />
              <SummaryBlock highlight={captchaHighlight} OnlinePayments={OnlinePayments} setOnlinePayments={setOnlinePayments} />
            </FormDataContext.Provider>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export { Reservation };
