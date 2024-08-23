import { student } from "./student";

export type frigoType = {
  _id: string;
  date: string;
  current: boolean;
};

export type frigoApplication = {
  _id: string;
  status: string;
  reason: string;
  student: student;
  frigo: frigoType;
};

export type currentFrigoType = {
  applications: frigoApplication[];
  frigo: frigoType;
};
