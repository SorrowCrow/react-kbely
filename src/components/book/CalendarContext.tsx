import { useReducer, useContext, createContext, FC, HTMLAttributes, Dispatch } from "react";

const CalendarContext = createContext(
  {} as {
    calendarData: CalendarData;
    setCalendarData: DispatchType;
  }
);

export function useCalendarData() {
  return useContext(CalendarContext);
}

const SETTERS = {
  SET_DATE: "setDate",
  SET_MONTH: "setMonth",
  SET_YEARLOOP: "setYearloop",
  SET_TIME: "setTime",
  SET_INSERT_MENU: "setInsertMenu",
  SET_RESERVED_ARRAY: "setReservedArray",
} as const;

const THEREST = {
  GET_DATA: "getData",
  INCREASE_MONTH: "increaseMonth",
  DECREASE_MONTH: "decreaseMonth",
  UNSET_DATA: "unsetData",
} as const;

export const ACTIONS = {
  ...THEREST,
  ...SETTERS,
} as const;

export type CalendarData = {
  month: number;
  currentMonth: number;
  year: number;
  yearLoop: number;
  reservedArray: string[][] | undefined;
  time: string | undefined;
  date: string | undefined;
  hours: number | undefined;
};

type OverloadAction =
  | {
      type: (typeof THEREST)[keyof typeof THEREST];
    }
  | {
      type: (typeof SETTERS)[keyof typeof SETTERS];
      payload: CalendarData;
    };

type DispatchType = Dispatch<
  | {
      type: (typeof THEREST)[keyof typeof THEREST];
    }
  | {
      type: (typeof SETTERS)[keyof typeof SETTERS];
      payload: Partial<CalendarData>;
    }
>;

const resetData = { reservedArray: undefined, time: undefined, date: undefined, hours: undefined };

const reducer: { (calendarData: CalendarData, action: OverloadAction): CalendarData } = (calendarData, action) => {
  switch (action.type) {
    case ACTIONS.GET_DATA:
      return { ...calendarData };
    case ACTIONS.SET_DATE:
      return { ...calendarData, ...action.payload };
    case ACTIONS.SET_RESERVED_ARRAY:
      return { ...calendarData, reservedArray: action.payload.reservedArray };
    case ACTIONS.INCREASE_MONTH:
      if (calendarData.month === 11 && calendarData.yearLoop === 0) {
        return { ...calendarData, ...resetData, month: 0, yearLoop: 1 };
      } else if (!(calendarData.month === calendarData.currentMonth && calendarData.yearLoop === 1)) {
        return { ...calendarData, ...resetData, month: calendarData.month + 1 };
      }
      return { ...calendarData, ...resetData };
    case ACTIONS.DECREASE_MONTH:
      if (calendarData.month === 0 && calendarData.yearLoop === 1) {
        return { ...calendarData, month: 11, yearLoop: 0 };
      } else if (!(calendarData.month === calendarData.currentMonth && calendarData.yearLoop === 0)) {
        return { ...calendarData, month: calendarData.month - 1 };
      }
      return { ...calendarData };
    case ACTIONS.SET_MONTH:
      return { ...calendarData, month: action.payload.month };
    case ACTIONS.SET_YEARLOOP:
      return { ...calendarData, yearLoop: action.payload.yearLoop };
    case ACTIONS.SET_TIME:
      if (action.payload.time !== undefined) return { ...calendarData, time: action.payload.time };
      document.body.style.overflow = "";
      return { ...calendarData, time: action.payload.time };
    case "setInsertMenu":
      return { ...calendarData, reservedArray: action.payload.reservedArray, date: action.payload.date };
    case "unsetData":
      return { ...calendarData, ...resetData };
    default:
      console.log("error");
      return { ...calendarData };
  }
};

export const CalendarProvider: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  const [calendarData, setCalendarData] = useReducer(reducer, {
    month: new Date().getMonth(),
    currentMonth: new Date().getMonth(),
    year: new Date().getFullYear(),
    yearLoop: 0,
    time: undefined,
    date: undefined,
    hours: undefined,
    reservedArray: undefined,
  });

  return (
    <CalendarContext.Provider
      value={{
        calendarData,
        setCalendarData: setCalendarData as DispatchType,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
