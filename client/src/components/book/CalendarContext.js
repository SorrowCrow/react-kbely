import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";

const CalendarContext = createContext();
const SetCalendarContext = createContext();

export function useCalendarData() {
    return useContext(CalendarContext);
}

export function useSetCalendarData() {
    return useContext(SetCalendarContext);
}

export function CalendarProvider({ children }) {
    const ACTIONS = {
        GET_DATA: "getData",
        SET_SECOND_DATE: "setSecondDate",
        SET_DATE: "setDate",
        SET_MONTH: "setMonth",
        SET_YEARLOOP: "setYearloop",
        SET_TIME: "setTime",
        SET_INSERT_MENU: "setInsertMenu",
        SET_RESERVED_ARRAY: "setReservedArray",
        INCREASE_MONTH: "increaseMonth",
        DECREASE_MONTH: "decreaseMonth",
    };

    function reducer(calendarData, action) {
        switch (action.type) {
            case ACTIONS.GET_DATA:
                return { ...calendarData };
            case ACTIONS.SET_SECOND_DATE:
                return { ...calendarData, secondDate: action.payload.secondDate };
            case ACTIONS.SET_DATE:
                return { ...calendarData, date: action.payload.date };
            case ACTIONS.SET_RESERVED_ARRAY:
                return { ...calendarData, reservedArray: action.payload.reservedArray };
            case ACTIONS.INCREASE_MONTH:
                if (calendarData.month === 11 && calendarData.yearLoop === 0) {
                    return { ...calendarData, secondDate: 0, month: 0, yearLoop: 1 };
                } else if (!(calendarData.month === calendarData.currentMonth && calendarData.yearLoop === 1)) {
                    return { ...calendarData, secondDate: 0, month: calendarData.month + 1 };
                }
                return { ...calendarData };
            case ACTIONS.DECREASE_MONTH:
                if (calendarData.month === 0 && calendarData.yearLoop === 1) {
                    return { ...calendarData, secondDate: 0, month: 11, yearLoop: 0 };
                } else if (!(calendarData.month === calendarData.currentMonth && calendarData.yearLoop === 0)) {
                    return { ...calendarData, secondDate: 0, month: calendarData.month - 1 };
                }
                return { ...calendarData };
            case ACTIONS.SET_MONTH:
                return { ...calendarData, month: action.payload.month };
            case ACTIONS.SET_YEARLOOP:
                return { ...calendarData, yearLoop: action.payload.yearLoop };
            case ACTIONS.SET_TIME:
                if (action.payload.time !== "") return { ...calendarData, time: action.payload.time };
                document.getElementsByTagName("body")[0].style.overflow = "";
                return { ...calendarData, time: action.payload.time };
            case ACTIONS.SET_INSERT_MENU:
                return { ...calendarData, reservedArray: action.payload.reservedArray, secondDate: Number(action.payload.secondDate), date: action.payload.date };
            default:
                return console.log("error");
        }
    }

    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    const [calendarData, setCalendarData] = useReducer(reducer, {
        month: new Date().getMonth(),
        currentMonth: new Date().getMonth(),
        year: new Date().getFullYear(),
        yearLoop: 0,
        time: null,
        date: "1",
        hours: Number,

        secondDate: 0,
        reservedArray: [],

        ACTIONS: ACTIONS,

        insertSelect: insertSelect,
        insertMenu: insertMenu,
        removeMenu: removeMenu,
        removeSelect: removeSelect,
    });

    async function insertMenu(row, date, secondDate) {
        setCalendarData({ type: ACTIONS.SET_RESERVED_ARRAY, payload: { reservedArray: [] } });
        const response = await axios.get("/api/reservationItems/" + date);
        let reservedArray = [];
        for (let i = 0; i < Object.keys(response.data).length; i++) {
            let time = response.data[i].time;
            reservedArray[i] = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
        }
        setCalendarData({ type: ACTIONS.SET_INSERT_MENU, payload: { reservedArray: reservedArray, secondDate: Number(secondDate), date: date } });
        setTimeout(function () {
            window.requestAnimationFrame(function () {
                document.getElementsByClassName("choose")[0].classList.add("chooseUnhidden");
            });
        });

        if (row) {
            insertAfter(document.getElementById("chooseHours"), document.getElementsByClassName(row)[0]);
        }
    }

    function insertSelect() {
        setTimeout(function () {
            document.getElementById("openedRef").style.height = "auto";
            let height = document.getElementById("openedRef").clientHeight + "px";
            document.getElementById("openedRef").style.height = "";
            window.requestAnimationFrame(function () {
                setTimeout(function () {
                    document.getElementById("openedRef").style.height = height;
                });
            });
        });
    }

    function removeSelect(bloat) {
        document.getElementById("openedRef").style.height = "";
        if (bloat) {
            setCalendarData({ type: ACTIONS.SET_TIME, payload: { time: bloat } });
        }
    }

    function removeMenu() {
        document.getElementById("chooseHoursMenu").classList.remove("chooseUnhidden");
    }

    return (
        <CalendarContext.Provider value={calendarData}>
            <SetCalendarContext.Provider value={setCalendarData}>{children}</SetCalendarContext.Provider>
        </CalendarContext.Provider>
    );
}
