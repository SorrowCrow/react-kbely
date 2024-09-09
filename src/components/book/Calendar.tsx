import { CalendarDays } from "./CalendarDays";
// import { Reservation } from "../Reservation";
import { useCalendarData } from "./CalendarContext";
import CalendarArrow from "../Icons/CalendarArrow";
import { Reservation } from "../Reservation";

const Calendar = () => {
  const months = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
  const { calendarData, setCalendarData } = useCalendarData();

  function getMonthIncrease() {
    // calendarData.removeMenu();
    // calendarData.removeSelect();
    setCalendarData({ type: "increaseMonth" });
  }

  function getMonthDecrease() {
    // calendarData.removeMenu();
    // calendarData.removeSelect();
    setCalendarData({ type: "decreaseMonth" });
  }
  return (
    <>
      <div className="cat h-fit-content overflow-hidden relative user-select-none">
        <div className="cat__header">
          <div className="month flex content-center align-center">
            <CalendarArrow className="leftArrow h-p" onClick={getMonthDecrease} />
            <div className="month-name flex content-center align-center text-center">{months[calendarData.month]}</div>
            <CalendarArrow className="h-p" onClick={getMonthIncrease} />
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
      </div>
      {calendarData.time ? <Reservation /> : null}
    </>
  );
};
export { Calendar };
