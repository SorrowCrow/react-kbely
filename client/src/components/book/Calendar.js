import React from "react";
import { ChooseHoursMenu } from "./ChooseHoursMenu";
import { CalendarDays } from "./CalendarDays";
import { Reservation } from "../Reservation";
import { useCalendarData, useSetCalendarData } from "./CalendarContext";

const Calendar = () => {
    const months = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
    const calendarData = useCalendarData();
    const setCalendarData = useSetCalendarData();

    function getMonthIncrease() {
        calendarData.removeMenu();
        calendarData.removeSelect();
        setCalendarData({ type: calendarData.ACTIONS.INCREASE_MONTH });
    }

    function getMonthDecrease() {
        calendarData.removeMenu();
        calendarData.removeSelect();
        setCalendarData({ type: calendarData.ACTIONS.DECREASE_MONTH });
    }
    return (
        <>
            <div className="cat h-fit-content overflow-hidden relative user-select-none">
                <div className="cat__header">
                    <div className="month flex content-center align-center">
                        <svg className="leftArrow h-p" onClick={getMonthDecrease}>
                            <use href="#calendarArrow" />
                        </svg>
                        <div className="month-name flex content-center align-center text-center">{months[calendarData.month]}</div>
                        <svg className="h-p" onClick={getMonthIncrease}>
                            <use href="#calendarArrow" />
                        </svg>
                    </div>
                    <div className="weekdays flex align-center">
                        <div className="align-center text-center">Mon</div>
                        <div className="align-center text-center">Tue</div>
                        <div className="align-center text-center">Wed</div>
                        <div className="align-center text-center">Thu</div>
                        <div className="align-center text-center">Fri</div>
                        <div className="align-center text-center">Sat</div>
                        <div className="align-center text-center">Sun</div>
                    </div>
                </div>

                <CalendarDays />

                <ChooseHoursMenu />
            </div>
            {calendarData.time ? <Reservation /> : null}
        </>
    );
};
export { Calendar };
