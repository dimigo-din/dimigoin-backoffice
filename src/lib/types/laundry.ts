import { Application } from "./stay";
import { student } from "./student";
export type washerType = {
  $__: {
    skipId: boolean;
    activePaths: {
      paths: {
        floor: string;
        gender: string;
        position: string;
        _id: string;
      };
      states: {
        init: {
          floor: string;
          gender: string;
          position: string;
          _id: string;
        };
        require: {};
      };
    };
  };
  $isNew: boolean;
  timetable: washerTimetableType[];
  _doc: {
    _id: string;
    floor: number;
    position: "L" | "M" | "R";
    gender: "M" | "F";
  };
};
export type washerStatusType = {
  _id: string;
  floor: number;
  position: "L" | "M" | "R";
  gender: "M" | "F";
};

export type washerApplicationType = {
  student: student;
  timetable: washerTimetableType;
  time: number;
};

export type washerTimetableType = {
  _id: string;
  gender: "M" | "F";
  grade: number[];
  laundry: washerStatusType;
  sequence: string[];
  type: number;
};
export type currentWasherType = {
  applications: washerApplicationType[];
  timetables: washerTimetableType[];
};
