import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { ReservationHeaderBlock } from "./reservation/ReservationHeaderBlock";
import { ReservationFormBlock } from "./reservation/ReservationFormBlock";
import { useCalendarData, useSetCalendarData } from "./book/CalendarContext";
import { SummaryBlock } from "./reservation/SummaryBlock";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51JC9K9BJ2QoFP7mPuFYpU6P3MSU7T2ytOURjiAAu9ZuG2JeRuKUi9tU8HV9Eh4BGuCSxsDnpxrQ02fvADiY1dDpD00i37yMksj");

const FormDataContext = createContext();
const SetFormDataContext = createContext();

export function useFormDataContext() {
    return useContext(FormDataContext);
}

export function useSetFormDataContext() {
    return useContext(SetFormDataContext);
}

const ACTIONS = {
    SET_DROPDOWN_FALSE: "setDropdownFalse",
    SET_PERSONS: "setPersons",
    SET_TOKEN: "setToken",
    SET_FORMDATA: "setFormData",
    TOGGLE_OZDOBA: "toggleOzdoba",
    TOGGLE_PROSSECCO: "toggleProssecco",
    TOGGLE_MISA: "toggleMisa",
    TOGGLE_DROPDOWN: "toggleDropdown",
    UNSET_TOKEN: "unsetToken",
};

const Reservation = () => {
    const calendarData = useCalendarData();
    const setCalendarData = useSetCalendarData();
    const [OnlinePayments, setOnlinePayments] = useState(true);

    function reducer(formData, action) {
        switch (action.type) {
            case ACTIONS.SET_FORMDATA:
                return { ...formData, email: action.payload.email, phone: action.payload.phone, name: action.payload.name, message: action.payload.message };
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
                return console.log("error");
        }
    }

    const [formData, setFormData] = useReducer(reducer, {
        date: calendarData.date,
        time: calendarData.time,
        hours: calendarData.hours,
        persons: 1,
        misa: false,
        prossecco: false,
        ozdoba: false,
        token: null,

        //form
        dropdown: false,
        ACTIONS: ACTIONS,
    });

    function exit(e) {
        e.stopPropagation();

        setCalendarData({ type: calendarData.ACTIONS.SET_TIME, payload: { time: null } });
    }

    function dropdownFalse(e) {
        e.stopPropagation();

        setFormData({ type: ACTIONS.SET_DROPDOWN_FALSE });
    }

    useEffect(() => {
        document.getElementById("reservation").scrollIntoView(true);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
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
                        <FormDataContext.Provider value={formData}>
                            <SetFormDataContext.Provider value={setFormData}>
                                <ReservationHeaderBlock />
                                <ReservationFormBlock OnlinePayments={OnlinePayments} />
                                <SummaryBlock OnlinePayments={OnlinePayments} setOnlinePayments={setOnlinePayments} />
                            </SetFormDataContext.Provider>
                        </FormDataContext.Provider>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export { Reservation };
