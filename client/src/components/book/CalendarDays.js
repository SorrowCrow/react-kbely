import React, { useEffect, useState } from "react";
import { useCalendarData, useSetCalendarData } from "./CalendarContext";

const CalendarDays = () => {
    const calendarData = useCalendarData();
    const setCalendarData = useSetCalendarData();

    const [firstDay, setFirstDay] = useState(1);
    const [lastDay, setLastDay] = useState(1);
    const [lastMonthDays, setLastMonthDays] = useState(1);
    const [thisMonthDays, setThisMonthDays] = useState(1);

    const dd = Number(String(new Date().getDate()).padStart(2, "0"));
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        if (new Date(new Date().getFullYear(), calendarData.month, 1).getDay() === 0) {
            setFirstDay(7);
        } else {
            setFirstDay(new Date(new Date().getFullYear(), calendarData.month, 1).getDay());
        }
        if (new Date(new Date().getFullYear(), calendarData.month + 1, 0).getDay() === 0) {
            setLastDay(7);
        } else {
            setLastDay(new Date(new Date().getFullYear(), calendarData.month + 1, 0).getDay());
        }
        setLastMonthDays(new Date(new Date().getFullYear(), calendarData.month, 0).getDate());
        setThisMonthDays(new Date(new Date().getFullYear(), calendarData.month + 1, 0).getDate());
    }, [calendarData.month]);

    function isToday(day) {
        return day === dd;
    }

    function isCurrentMonth(month = calendarData.month) {
        return month === calendarData.currentMonth;
    }

    function isCurrentYear() {
        return calendarData.year + calendarData.yearLoop === calendarData.year;
    }

    function isSmallerThanToday(index) {
        if ((index < dd || index > 36) && isCurrentMonth() && isCurrentYear()) {
            return "daysGone";
        } else if (index > 36 && isCurrentMonth(calendarData.month - 1) && index - 36 + 1 + (lastMonthDays - firstDay) < dd) {
            return "daysGone";
        } else {
            if (isToday(index) && isCurrentMonth() && isCurrentYear()) {
                return "days-dates firstDateCss";
            }
            return "days-dates";
        }
    }

    function fullweeks() {
        if (firstDay > 4) {
            return 4;
        } else {
            return 3;
        }
    }

    function endsOnSundayCheck() {
        if (lastDay === 7) return false;
        else return true;
    }

    function dataMonthClick(event) {
        let element = event.target;
        if (element.id === "secondDate") {
            if (calendarData.secondDate === dd && isCurrentMonth() && isCurrentYear()) {
                document.getElementsByClassName("secondDateCss")[0].classList.add("firstDateCss");
            }
            element.classList.remove("secondDateCss");
            element.id = calendarData.secondDate;
            calendarData.removeMenu();
            calendarData.removeSelect();
            setCalendarData({ type: calendarData.ACTIONS.SET_SECOND_DATE, payload: { secondDate: 0 } });
        } else if (!element.classList.contains("daysGone")) {
            if (calendarData.secondDate !== 0) {
                document.getElementsByClassName("secondDateCss")[0].id = calendarData.secondDate;
                if (calendarData.secondDate === dd) {
                    document.getElementsByClassName("secondDateCss")[0].classList.add("firstDateCss");
                }
                document.getElementsByClassName("secondDateCss")[0].classList.remove("secondDateCss");
            }
            element.classList.remove("firstDateCss");
            element.classList.add("secondDateCss");
            let secondDate = element.id;
            let date;
            if (element.id > 36) {
                date = (element.id - 36 + 1 + (lastMonthDays - firstDay)).toString() + " " + monthList[calendarData.month - 1] + " " + (calendarData.year + calendarData.yearLoop).toString();
            } else if (element.id > 31) {
                date = (element.id - 31).toString() + " " + monthList[calendarData.month + 1] + " " + (calendarData.year + calendarData.yearLoop).toString();
            } else {
                date = element.id.toString() + " " + monthList[calendarData.month];
            }
            element.id = "secondDate";
            calendarData.removeSelect();
            calendarData.insertMenu(element.parentElement.parentElement.classList[0], date, secondDate);
        }
    }

    const firstRow = [];
    const fullWeeks = [];
    const lastRow = [];
    //firstRow
    for (let index = 1; index < firstDay; index++) {
        const id = index + 36;
        firstRow.push(
            <div key={id} id={`${id}`} className={`nextMonthDates ${isSmallerThanToday(id)} ${index === firstDay - 1 ? "dateOneTop" : ""}`} onClick={dataMonthClick.bind(this)}>
                {index + 1 + (lastMonthDays - firstDay)}
            </div>
        );
    }
    for (let index = 1; index <= 7 - (firstDay - 1); index++) {
        firstRow.push(
            <div key={index} id={`${index}`} className={`${isSmallerThanToday(index)}`} onClick={dataMonthClick.bind(this)}>
                {index}
            </div>
        );
    }
    //fullweeks
    for (let index = 1; index <= fullweeks(); index++) {
        const days = [];
        for (let bindex = 1; bindex <= 7; bindex++) {
            days.push(
                <div key={bindex + 1 - firstDay + 7 * index} id={`${bindex + 1 - firstDay + 7 * index}`} className={`${isSmallerThanToday(bindex + 1 - firstDay + 7 * index)}`} onClick={dataMonthClick.bind(this)}>
                    {bindex + 1 - firstDay + 7 * index}
                </div>
            );
        }
        fullWeeks.push(
            <div key={`${(index + 1).toString()}row`} className={`${(index + 1).toString()}row`}>
                <div className="row grid">{days}</div>
            </div>
        );
    }
    //lastRow
    if (endsOnSundayCheck()) {
        const lastThhisMonthDates = [];
        for (let index = 1; index <= lastDay; index++) {
            lastThhisMonthDates.push(
                <div key={index + thisMonthDays - lastDay} className={`days-dates ${isSmallerThanToday(index + thisMonthDays - lastDay)}`} id={index + thisMonthDays - lastDay} onClick={dataMonthClick.bind(this)}>
                    {index + thisMonthDays - lastDay}
                </div>
            );
        }
        lastThhisMonthDates.push(
            <div key={thisMonthDays + 1} className="days-dates nextMonthDates dateOne" id={thisMonthDays + 1} onClick={dataMonthClick.bind(this)}>
                {1}
            </div>
        );
        for (let index = 1; index <= 7 - lastDay - 1; index++) {
            lastThhisMonthDates.push(
                <div key={index + thisMonthDays + 1} className="days-dates nextMonthDates" id={index + thisMonthDays + 1} onClick={dataMonthClick.bind(this)}>
                    {index + 1}
                </div>
            );
        }
        lastRow.push(
            <div key={fullweeks() + 2} className={`${(fullweeks() + 2).toString()}row`}>
                <div className="row grid">{lastThhisMonthDates}</div>
            </div>
        );
    }
    return (
        <div className="calendarDays">
            <div className="1row">
                <div className="row grid">{firstRow}</div>
            </div>
            {fullWeeks}
            {lastRow}
        </div>
    );
};

export { CalendarDays };
