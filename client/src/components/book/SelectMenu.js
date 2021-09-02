import React from "react";
import { useCalendarData } from "./CalendarContext";

const SelectMenu = ({ timeframeData }) => {
    const calendarData = useCalendarData();

    function evenBoolSet() {
        if ((timeframeData.workingHours - 1) % 3 === 0 || timeframeData.workingHours % 3 === 0) {
            return false;
        } else {
            return true;
        }
    }

    function evenNumbers() {
        if (timeframeData.halfBool) {
            let i = timeframeData.workingHours;
            if (i % 3 === 0) {
                return i / 3;
            }
            while (i % 3 !== 0) {
                i--;
            }
            return i / 3;
        }
        if (timeframeData.threeHoursBool) {
            let i = timeframeData.workingHours;
            while (i % 3 !== 0) {
                i--;
            }
            return i / 3;
        }
        return [...Array(timeframeData.workingHours)].map((_, i) => i).filter((i) => i % timeframeData.indexHour === 0);
    }

    function timeframeClick(e) {
        const element = e.target;
        if (element.classList.contains("timeframe")) {
            const bloat = element.childNodes[0].innerText.toString();
            calendarData.removeSelect(bloat);
        } else {
            const bloat = element.textContent.toString().split(" ");
            calendarData.removeSelect(bloat);
        }
    }

    function checktime(hoursStart, hoursEnd, id = 0) {
        let n = new Date().getHours();
        let dd = Number(String(new Date().getDate()).padStart(2, "0"));
        if (hoursStart <= n && dd === calendarData.secondDate && (calendarData.month === calendarData.currentMonth || id !== 0) && calendarData.yearLoop !== 1) {
            if (timeframeData.halfBool && hoursStart % 3 === 0) {
                let n = new Date().getMinutes();
                if (n < 30) return true;
            }
            return false;
        }
        for (let i = 0; i < calendarData.reservedArray.length; i++) {
            if (hoursStart === Number(calendarData.reservedArray[i][0])) return false;
            else if (hoursStart > Number(calendarData.reservedArray[i][0]) && hoursEnd <= Number(calendarData.reservedArray[i][2])) return false;
            else if (hoursStart > Number(calendarData.reservedArray[i][0]) && hoursEnd <= Number(calendarData.reservedArray[i][2])) return false;
            else if (hoursStart < Number(calendarData.reservedArray[i][0]) && hoursEnd <= Number(calendarData.reservedArray[i][2]) && hoursEnd > Number(calendarData.reservedArray[i][0])) return false;
            else if (hoursStart < Number(calendarData.reservedArray[i][2]) && hoursEnd > Number(calendarData.reservedArray[i][2])) return false;
            else if (calendarData.reservedArray[i][3] === "30" && hoursStart === Number(calendarData.reservedArray[i][2]) && !timeframeData.halfBool) return false;
        }
        return true;
    }

    function onClick() {
        calendarData.removeSelect();
        calendarData.insertMenu(null, calendarData.date, calendarData.secondDate);
    }

    const timeframes = [];
    if (timeframeData.halfBool) {
        evenBoolSet();
        for (let index = 1; index <= evenNumbers(); index++) {
            const tf1 = index + 7 + (index - 1) * 2;
            const tf2 = index + 6 + index * 2;
            timeframes.push(
                <div key={tf1} className={checktime(tf1) ? "timeframe" : "timeframeReserved"} onClick={timeframeClick.bind(this)}>
                    <span>
                        {index + 7 + (index - 1) * 2}:00-{index + 8 + (index - 1) * 2}:30
                    </span>
                    <div className="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            );
            timeframes.push(
                <div key={tf2} className={checktime(tf2) ? "timeframe" : "timeframeReserved"} onClick={timeframeClick.bind(this)}>
                    <span>
                        {index + 6 + index * 2}:30-{index + 8 + index * 2}:00
                    </span>
                    <div className="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            );
        }
        if (evenBoolSet()) {
            timeframes.push(
                <div key={6 + timeframeData.workingHours} className={checktime(6 + timeframeData.workingHours, 7 + timeframeData.workingHours) ? "timeframe" : "timeframeReserved"} onClick={timeframeClick.bind(this)}>
                    <span>
                        {6 + timeframeData.workingHours}:00-{7 + timeframeData.workingHours}:30
                    </span>
                    <div className="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            );
        }
    } else if (timeframeData.threeHoursBool) {
        for (let index = 1; index <= evenNumbers(); index++) {
            timeframes.push(
                <div className={checktime((index - 1) * 3 + 8, (index - 1) * 3 + 8 + timeframeData.indexHour) ? "timeframe" : "timeframeReserved"} onClick={timeframeClick.bind(this)} key={(index - 1) * 3 + 8 + (index - 1) * 3 + 8 + timeframeData.indexHour}>
                    <span>
                        {(index - 1) * 3 + 8}:00-{(index - 1) * 3 + 8 + timeframeData.indexHour}:00
                    </span>
                    <div className="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            );
        }
    } else {
        const array = evenNumbers();
        array.forEach((index) => {
            timeframes.push(
                <div className={checktime(index + 8, index + 8 + timeframeData.indexHour) ? "timeframe" : "timeframeReserved"} onClick={timeframeClick.bind(this)} key={index + 8 + index + 8 + timeframeData.indexHour}>
                    <span>
                        {index + 8}:00-{index + 8 + timeframeData.indexHour}:00
                    </span>
                    <div className="rezervaceButton flex content-center align-center">Rezervace</div>
                </div>
            );
        });
    }

    const final = <div className="opened__inner-timeframes">{timeframes}</div>;
    return (
        <div id="openedRef" className="opened grid relative overflow-hidden">
            <div className="opened__inner">
                <div className="opened__inner-select flex content-between align-center h-p" onClick={onClick.bind(this)}>
                    <p className="pa relative">{timeframeData.indexHour} Hodina</p>
                    <svg className="relative">
                        <use href="#openedArrow" />
                    </svg>
                </div>
                {final}
            </div>
        </div>
    );
};

export { SelectMenu };
