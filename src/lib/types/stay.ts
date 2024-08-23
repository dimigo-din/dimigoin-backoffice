import { student } from "./student";

export type currentStayType = {
  applications: Application[];
  stay: stayType;
};

export type Application = {
  seat: string;
  stay: string;
  _id: string;
  student: student;
};

export type stayType = {
  _id: string;
  current: boolean;
  start: string;
  end: string;
  dates: stayDateType[];
  duration: stayDurationType[];
  seat: seatType;
};

export type seatType = {
  _id: string;
  F1: string[];
  F2: string[];
  F3: string[];
  M1: string[];
  M2: string[];
  M3: string[];
};
export type stayDateType = {
  date: string;
  free: boolean;
  _id: string;
};

export type stayDurationType = {
  _id: string;
  start: string;
  end: string;
};
