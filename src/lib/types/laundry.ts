import { Application } from "./stay";

export type washerType = {
  _id: string;
  floor: number;
  position: "L" | "M" | "R";
  gender: "M" | "F";
};

export type washerApplication = Application & {
  timetable: washerTimetableType;
  time: number;
};

export type washerTimetableType = {
  _id: string;
  gender: "M" | "F";
  grade: number[];
  laundry: washerType;
  sequence: string[];
  type: number;
};
export type currentWasherType = {
  applications: washerApplication[];
  timetables: washerTimetableType[];
};
