export type gradeType = "전체" | "1학년" | "2학년" | "3학년";

export type student = {
  class: number;
  email: string;
  gender: "M" | "F";
  grade: number;
  groups: any[];
  name: string;
  number: number;
  permissions: any[];
  _id: string;
};
