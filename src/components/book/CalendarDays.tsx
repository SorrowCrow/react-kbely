import { useEffect, useState } from "react";
import { useCalendarData } from "./CalendarContext";
import axios from "axios";
import { ChooseHoursMenu } from "./ChooseHoursMenu";

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dd = Number(String(new Date().getDate()).padStart(2, "0"));

const CalendarDays = () => {
  const { calendarData, setCalendarData } = useCalendarData();

  const [firstDay, setFirstDay] = useState(1);
  const [lastDay, setLastDay] = useState(1);
  const [lastMonthDays, setLastMonthDays] = useState(1);
  const [thisMonthDays, setThisMonthDays] = useState(1);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

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

    setSelectedId(undefined);
  }, [calendarData.month]);

  function isToday(day: number) {
    return day === dd;
  }

  function isCurrentMonth(month = calendarData.month) {
    return month === calendarData.currentMonth;
  }

  function isCurrentYear() {
    return calendarData.year + calendarData.yearLoop === calendarData.year;
  }

  function isSmallerThanToday(index: number) {
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

  async function dataMonthClick(id: string, classList?: string) {
    if (id === selectedId) {
      setSelectedId(undefined);
      // calendarData.removeMenu();
      // calendarData.removeSelect();
      setCalendarData({ type: "unsetData" });
    } else if (classList && id && !classList.includes("daysGone")) {
      setSelectedId(id);
      const idNumber = Number(id);
      let date;
      if (idNumber > 36) {
        date = (idNumber - 36 + 1 + (lastMonthDays - firstDay)).toString() + " " + monthList[calendarData.month - 1] + " " + (calendarData.year + calendarData.yearLoop).toString();
      } else if (idNumber > 31) {
        date = (idNumber - 31).toString() + " " + monthList[calendarData.month + 1] + " " + (calendarData.year + calendarData.yearLoop).toString();
      } else {
        date = id + " " + monthList[calendarData.month];
      }
      // calendarData.removeSelect();
      // calendarData.insertMenu(element.parentElement.parentElement.classList[0], date);
      const response = await axios.get(process.env.REACT_APP_API + "reservationItems/" + date);
      const reservedArray = [];
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        const time = response.data[i].time;
        reservedArray[i] = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
      }
      setCalendarData({ type: "setInsertMenu", payload: { reservedArray: reservedArray as any, date: date } });
      //   setTimeout(function () {
      //     window.requestAnimationFrame(function () {
      //       document.getElementsByClassName("choose")[0].classList.add("chooseUnhidden");
      //     });
      //   });

      //   // if (row) {
      //   //   insertAfter(document.getElementById("chooseHours"), document.getElementsByClassName(row)[0]);
      //   // }

      // async function insertMenu(row, date, secondDate) {
      //   setCalendarData({ type: ACTIONS.SET_RESERVED_ARRAY, payload: { reservedArray: [] } });
      //   const response = await axios.get(process.env.REACT_APP_API + "reservationItems/" + date);
      //   let reservedArray = [];
      //   for (let i = 0; i < Object.keys(response.data).length; i++) {
      //     let time = response.data[i].time;
      //     reservedArray[i] = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
      //   }
      //   setCalendarData({ type: ACTIONS.SET_INSERT_MENU, payload: { reservedArray: reservedArray, secondDate: Number(secondDate), date: date } });
      //   setTimeout(function () {
      //     window.requestAnimationFrame(function () {
      //       document.getElementsByClassName("choose")[0].classList.add("chooseUnhidden");
      //     });
      //   });

      //   // if (row) {
      //   //   insertAfter(document.getElementById("chooseHours"), document.getElementsByClassName(row)[0]);
      //   // }
      // }
    }
  }

  const firstRow = [];
  const fullWeeks = [];
  const lastRow = [];

  //firstRow
  let chooseMenuRow = false;
  {
    const days = [];

    for (let index = 1; index < firstDay; index++) {
      const id = index + 36 + "";

      if (id === selectedId) {
        chooseMenuRow = true;
      }

      const classname = `nextMonthDates ${isSmallerThanToday(Number(id))} ${index === firstDay - 1 ? "dateOneTop" : ""} ${selectedId === id ? "secondDateCss" : ""}`;
      days.push(
        <div key={id} id={id} className={classname} onClick={() => dataMonthClick(id, classname)}>
          {index + 1 + (lastMonthDays - firstDay)}
        </div>
      );
    }
    for (let index = 1; index <= 7 - (firstDay - 1); index++) {
      const id = index + "";
      if (id === selectedId) {
        chooseMenuRow = true;
      }

      const classname = `${isSmallerThanToday(index)} ${selectedId === id ? "secondDateCss" : ""}`;
      days.push(
        <div key={id} id={id} className={classname} onClick={() => dataMonthClick(id, classname)}>
          {index}
        </div>
      );
    }

    firstRow.push(
      <div className="1row" key="1row">
        <div className="row grid">{days}</div>
      </div>
    );

    if (chooseMenuRow) {
      firstRow.push(<ChooseHoursMenu />);
    }
  }

  //fullweeks
  for (let index = 1; index <= fullweeks(); index++) {
    chooseMenuRow = false;
    const days = [];
    for (let bindex = 1; bindex <= 7; bindex++) {
      const id = bindex + 1 - firstDay + 7 * index + "";
      if (id === selectedId) {
        chooseMenuRow = true;
      }
      const classname = `${isSmallerThanToday(bindex + 1 - firstDay + 7 * index)} ${selectedId === id ? "secondDateCss" : ""}`;
      days.push(
        <div key={bindex + 1 - firstDay + 7 * index} id={id} className={classname} onClick={() => dataMonthClick(id, classname)}>
          {bindex + 1 - firstDay + 7 * index}
        </div>
      );
    }
    fullWeeks.push(
      <div key={`${(index + 1).toString()}row`} className={`${(index + 1).toString()}row`}>
        <div className="row grid">{days}</div>
      </div>
    );

    if (chooseMenuRow) {
      fullWeeks.push(<ChooseHoursMenu />);
    }
  }

  //lastRow
  chooseMenuRow = false;
  if (endsOnSundayCheck()) {
    const lastThhisMonthDates = [];
    for (let index = 1; index <= lastDay; index++) {
      const id = index + thisMonthDays - lastDay + "";

      if (id === selectedId) {
        chooseMenuRow = true;
      }
      const classname = `days-dates ${isSmallerThanToday(index + thisMonthDays - lastDay)} ${selectedId === id ? "secondDateCss" : ""}`;
      lastThhisMonthDates.push(
        <div key={id} className={classname} id={id} onClick={() => dataMonthClick(id, classname)}>
          {index + thisMonthDays - lastDay}
        </div>
      );
    }
    const id = thisMonthDays + 1 + "";

    if (id === selectedId) {
      chooseMenuRow = true;
    }
    const classname = `days-dates nextMonthDates dateOne ${selectedId === id ? "secondDateCss" : ""}`;
    lastThhisMonthDates.push(
      <div key={id} className={classname} id={id} onClick={() => dataMonthClick(id, classname)}>
        {1}
      </div>
    );
    for (let index = 1; index <= 7 - lastDay - 1; index++) {
      const id = index + thisMonthDays + 1 + "";

      if (id === selectedId) {
        chooseMenuRow = true;
      }
      const classname = `days-dates nextMonthDates ${selectedId === id ? "secondDateCss" : ""}`;
      lastThhisMonthDates.push(
        <div key={id} className={classname} id={id} onClick={() => dataMonthClick(id, classname)}>
          {index + 1}
        </div>
      );
    }
    lastRow.push(
      <div key={fullweeks() + 2 + "row"} className={`${(fullweeks() + 2).toString()}row`}>
        <div className="row grid">{lastThhisMonthDates}</div>
      </div>
    );

    if (chooseMenuRow) {
      lastRow.push(<ChooseHoursMenu />);
    }
  }
  return (
    <div className="calendarDays">
      {firstRow}
      {fullWeeks}
      {lastRow}
    </div>
  );
};

export { CalendarDays };
