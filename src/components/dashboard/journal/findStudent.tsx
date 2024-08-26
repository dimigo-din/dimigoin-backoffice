import { Body, Row } from "@/components/atomic";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { Button, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function FindStudent({
  setStudent,
}: {
  setStudent: React.Dispatch<React.SetStateAction<student | null>>;
}) {
  const students = useRef<student[] | null>(null);

  const [inputs, setInputs] = useState({
    grade: "",
    classNumber: "",
    studentNumber: "",
  });
  useEffect(() => {
    getAllStudent().then((res) => {
      students.current = res;
    });
  }, []);

  const handleSubmit = () => {
    if (!students.current) {
      toast.error("아직 학생이 로드되지 않았습니다");
      return;
    }
    const selectedStudent: student = students.current.find(
      (student) =>
        student.grade.toString() === inputs.grade &&
        student.class.toString() === inputs.classNumber &&
        student.number.toString() === inputs.studentNumber
    )!;
    setStudent(selectedStudent!);
  };
  return (
    <>
      <WhiteBox>
        <Row justify={"space-between"} align={"center"} gap={"16px"}>
          <Row gap={"16px"}>
            <Row gap={"8px"} align={"center"}>
              <Body $color={"--content-standard-primary"}>학년</Body>
              <Input
                value={inputs.grade}
                onChange={(e) =>
                  setInputs({ ...inputs, grade: e.target.value })
                }
              />
            </Row>
            <Row gap={"8px"} align={"center"}>
              <Body $color={"--content-standard-primary"}>반</Body>
              <Input
                value={inputs.classNumber}
                onChange={(e) =>
                  setInputs({ ...inputs, classNumber: e.target.value })
                }
              />
            </Row>
            <Row gap={"8px"} align={"center"}>
              <Body $color={"--content-standard-primary"}>번호</Body>
              <Input
                value={inputs.studentNumber}
                onChange={(e) =>
                  setInputs({ ...inputs, studentNumber: e.target.value })
                }
              />
            </Row>
          </Row>
          <AccentBtn onClick={() => handleSubmit()}>
            <Body $color={"--basic-grade1"}>확인</Body>
          </AccentBtn>
        </Row>
      </WhiteBox>
    </>
  );
}
const WhiteBox = styled.div`
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  padding: 24px;
`;

const AccentBtn = styled(Button)`
  background-color: var(--core-status-accent) !important;
  border-radius: 12px !important;
  border: none;
  padding: 16px 0;
  height: 44px;

  &:hover {
    background-color: var(--core-status-accent_translucent) !important;
  }
`;
