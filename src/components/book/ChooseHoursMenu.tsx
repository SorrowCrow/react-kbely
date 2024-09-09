import { FC, HTMLAttributes, useLayoutEffect, useState } from "react";
import { useCalendarData } from "./CalendarContext";
import { SelectMenu } from "./SelectMenu";

const ChooseHoursMenu: FC<HTMLAttributes<HTMLElement>> = () => {
  const [timeframeData, setTimeframeData] = useState<
    | undefined
    | {
        indexHour: number;
        halfBool: boolean;
        threeHoursBool: boolean;
      }
  >(undefined);
  // }>({ indexHour: 1, halfBool: false, threeHoursBool: false, workingHours: 14 });
  const { calendarData } = useCalendarData();

  const { date, month } = calendarData;

  function setter(indexHour: number, halfBool: boolean, threeHoursBool: boolean) {
    setTimeframeData({ indexHour: indexHour, halfBool: halfBool, threeHoursBool: threeHoursBool });

    // calendarData.insertSelect();
    // calendarData.removeMenu();
  }

  useLayoutEffect(() => {
    setTimeframeData(undefined);
  }, [date, month]);

  // function removeMenu() {
  //   document.getElementById("chooseHoursMenu").classList.remove("chooseUnhidden");
  // }

  // function insertSelect() {
  //   setTimeout(function () {
  //     document.getElementById("openedRef").style.height = "auto";
  //     let height = document.getElementById("openedRef").clientHeight + "px";
  //     document.getElementById("openedRef").style.height = "";
  //     window.requestAnimationFrame(function () {
  //       setTimeout(function () {
  //         document.getElementById("openedRef").style.height = height;
  //       });
  //     });
  //   });
  // }

  const onClick = () => {
    setTimeframeData(undefined);
  };

  return (
    <div id="chooseHours">
      <div id="chooseHoursMenu" className={`choose grid overflow-hidden ${timeframeData ? "" : "chooseUnhidden"}`}>
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
      </div>

      <SelectMenu timeframeData={timeframeData} onclick={onClick} />
    </div>
  );
};

export { ChooseHoursMenu };
