import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import OpenedArrow from "../Icons/OpenedArrow";
import { CalendarData, useCalendarData } from "./CalendarContext";

const workingHours = Number(process.env.REACT_APP_WORKINGHOURS);

type TimeframeData = {
  indexHour: number;
  halfBool: boolean;
  threeHoursBool: boolean;
};

function evenBoolSet() {
  if ((workingHours - 1) % 3 === 0 || workingHours % 3 === 0) {
    return false;
  } else {
    return true;
  }
}

function evenNumbers(timeframeData: TimeframeData) {
  if (timeframeData.halfBool) {
    let i = workingHours;
    if (i % 3 === 0) {
      return i / 3;
    }
    while (i % 3 !== 0) {
      i--;
    }
    return i / 3;
  }
  if (timeframeData.threeHoursBool) {
    let i = workingHours;
    while (i % 3 !== 0) {
      i--;
    }
    return i / 3;
  }
  return [...Array(workingHours)].map((_, i) => i).filter((i) => i % timeframeData.indexHour === 0);
}

function checktime({ hoursStart, hoursEnd, id = 0, timeframeData, calendarData }: { hoursStart: number; hoursEnd?: number; id?: number; timeframeData: TimeframeData; calendarData: CalendarData }) {
  const n = new Date().getHours();
  // const dd = Number(String(new Date().getDate()).padStart(2, "0"));
  const reservedArray = calendarData.reservedArray;

  if (!reservedArray) {
    return false;
  }

  if (hoursStart <= n && (calendarData.month === calendarData.currentMonth || id !== 0) && calendarData.yearLoop !== 1) {
    if (timeframeData.halfBool && hoursStart % 3 === 0 && hoursStart >= n) {
      const m = new Date().getMinutes();
      if (m < 30) return true;
    }
    return false;
  }

  if (!hoursEnd) {
    return false;
  }

  for (let i = 0; i < reservedArray.length; i++) {
    if (hoursStart === Number(reservedArray[i][0])) return false;
    else if (hoursStart > Number(reservedArray[i][0]) && hoursEnd <= Number(reservedArray[i][2])) return false;
    //   else if (hoursStart > Number(reservedArray[i][0]) && hoursEnd <= Number(reservedArray[i][2])) return false;
    else if (hoursStart < Number(reservedArray[i][0]) && hoursEnd <= Number(reservedArray[i][2]) && hoursEnd > Number(reservedArray[i][0])) return false;
    else if (hoursStart < Number(reservedArray[i][2]) && hoursEnd > Number(reservedArray[i][2])) return false;
    else if (reservedArray[i][3] === "30" && hoursStart === Number(reservedArray[i][2]) && !timeframeData.halfBool) return false;
  }
  return true;
}

const SelectMenu: FC<
  HTMLAttributes<HTMLElement> & {
    timeframeData: TimeframeData | undefined;
    onclick: () => void;
  }
> = ({ timeframeData: metaTimeframeData, onclick }) => {
  const { calendarData, setCalendarData } = useCalendarData();

  const [timeframeData, setTimeframeData] = useState<undefined | typeof metaTimeframeData>(undefined);
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      // 👉 Do something when the element is resized

      if (metaTimeframeData === undefined) {
        setHeight(0);
      } else {
        ref.current && setHeight(ref.current.clientHeight);
      }
    });

    observer.observe(ref.current);

    if (timeframeData === undefined || (metaTimeframeData !== undefined && timeframeData !== undefined)) {
      setTimeframeData(metaTimeframeData);
    }

    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect();
    };
  }, [metaTimeframeData]);

  const timeframes = [];
  if (timeframeData !== undefined) {
    const even = evenNumbers(timeframeData);
    if (timeframeData.halfBool && typeof even === "number") {
      for (let index = 1; index <= even; index++) {
        const tf1 = index + 7 + (index - 1) * 2;
        const tf2 = index + 6 + index * 2;
        const time1 = `${tf1}:00-${index + 8 + (index - 1) * 2}:30`;
        const time2 = `${tf2}:30-${index + 8 + index * 2}:00`;
        timeframes.push(
          <div key={tf1} className={checktime({ hoursStart: tf1, timeframeData, calendarData }) ? "timeframe" : "timeframeReserved"} onClick={() => setCalendarData({ type: "setTime", payload: { time: time1 } })}>
            <span>{time1}</span>
            <div className="rezervaceButton flex content-center align-center">Rezervace</div>
          </div>
        );
        timeframes.push(
          <div key={tf2} className={checktime({ hoursStart: tf2, timeframeData, calendarData }) ? "timeframe" : "timeframeReserved"} onClick={() => setCalendarData({ type: "setTime", payload: { time: time2 } })}>
            <span>{time2}</span>
            <div className="rezervaceButton flex content-center align-center">Rezervace</div>
          </div>
        );
      }
      if (evenBoolSet()) {
        const time = `${6 + workingHours}:00-${7 + workingHours}:30`;
        timeframes.push(
          <div key={6 + workingHours} className={checktime({ hoursStart: 6 + workingHours, hoursEnd: 7 + workingHours, timeframeData, calendarData }) ? "timeframe" : "timeframeReserved"} onClick={() => setCalendarData({ type: "setTime", payload: { time } })}>
            <span>{time}</span>
            <div className="rezervaceButton flex content-center align-center">Rezervace</div>
          </div>
        );
      }
    } else if (timeframeData.threeHoursBool && typeof even === "number") {
      for (let index = 1; index <= even; index++) {
        const time = `${(index - 1) * 3 + 8}:00-${(index - 1) * 3 + 8 + timeframeData.indexHour}:00`;
        timeframes.push(
          <div className={checktime({ hoursStart: (index - 1) * 3 + 8, hoursEnd: (index - 1) * 3 + 8 + timeframeData.indexHour, timeframeData, calendarData }) ? "timeframe" : "timeframeReserved"} onClick={() => setCalendarData({ type: "setTime", payload: { time } })} key={(index - 1) * 3 + 8 + (index - 1) * 3 + 8 + timeframeData.indexHour}>
            <span>{time}</span>
            <div className="rezervaceButton flex content-center align-center">Rezervace</div>
          </div>
        );
      }
    } else if (typeof even === "object") {
      even.forEach((index) => {
        const time = `${index + 8}:00-${index + 8 + timeframeData.indexHour}:00`;
        timeframes.push(
          <div className={checktime({ hoursStart: index + 8, hoursEnd: index + 8 + timeframeData.indexHour, timeframeData, calendarData }) ? "timeframe" : "timeframeReserved"} onClick={() => setCalendarData({ type: "setTime", payload: { time } })} key={index + 8 + index + 8 + timeframeData.indexHour}>
            <span>{time}</span>
            <div className="rezervaceButton flex content-center align-center">Rezervace</div>
          </div>
        );
      });
    }
  }

  return (
    <div id="openedRef" className={`${!metaTimeframeData ? "opened" : ""} grid relative overflow-hidden`} style={{ height }}>
      <div ref={ref}>
        <div className="opened__inner">
          <div className="opened__inner-select flex content-between align-center h-p" onClick={() => onclick()}>
            <p className="pa relative">{timeframeData && timeframeData.indexHour} Hodina</p>
            <OpenedArrow className="relative" />
          </div>
          <div className="opened__inner-timeframes">{timeframes}</div>
        </div>
      </div>
    </div>
  );
};

export { SelectMenu };
