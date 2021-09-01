import React, { useState } from "react";
import { useCalendarData } from "./CalendarContext";
import { SelectMenu } from "./SelectMenu";

const ChooseHoursMenu = () => {
    const [timeframeData, setTimeframeData] = useState({ indexHour: 1, halfBool: false, threeHoursBool: false, workingHours: 14 });
    const calendarData = useCalendarData();
    function setter(indexHour, halfBool, threeHoursBool) {
        setTimeframeData({ ...timeframeData, indexHour: indexHour, halfBool: halfBool, threeHoursBool: threeHoursBool });

        calendarData.insertSelect();
        calendarData.removeMenu();
    }

    const list = (
        <div className="hours grid">
            <span className="flex align-center relative h-p" onClick={() => setter(1, false, false)}>
                1 Hodina
            </span>
            <span className="flex align-center relative h-p" onClick={() => setter(1.5, true, false)}>
                1.5 Hodina
            </span>
            <span className="flex align-center relative h-p" onClick={() => setter(2, false, false)}>
                2 Hodina
            </span>
            <span className="flex align-center relative h-p" onClick={() => setter(3, false, true)}>
                3 Hodina
            </span>
        </div>
    );
    return (
        <div id="chooseHours">
            <div id="chooseHoursMenu" className="choose grid overflow-hidden">
                {list}
            </div>
            <SelectMenu key={timeframeData} timeframeData={timeframeData} />
        </div>
    );
};

export { ChooseHoursMenu };
