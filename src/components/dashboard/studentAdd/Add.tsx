"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "antd";
import styled from "styled-components";
import SingleSeatSelect from "@/components/dashboard/studentAdd/SingleSeatSelect";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { addStudentStay } from "@/lib/api/stay";
import { toast } from "react-toastify";

export default function Add() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stayId = searchParams.get("stayId");

  const [grade, setGrade] = useState<string>("");
  const [classNumber, setClassNumber] = useState<string>("");
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [students, setStudents] = useState<student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllStudent()
      .then((res) => {
        setStudents(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = () => {
    if (!grade || !classNumber || !studentNumber) {
      alert("모든 정보를 입력하세요.");
      return;
    }

    if (!students) {
      alert("학생 정보를 불러오는 중입니다. 잠시 후 다시 시도하세요.");
      return;
    }

    const selectedStudent = students.find(
      (student) =>
        student.grade.toString() === grade &&
        student.class.toString() === classNumber &&
        student.number.toString() === studentNumber
    );

    if (!selectedStudent) {
      alert("해당 학생을 찾을 수 없습니다. 정보를 다시 확인하세요.");
      return;
    }

    const studentData = {
      studentId: selectedStudent._id,
      stayId: stayId,
      seat: selectedSeat,
    };
    addStudentStay({
      stayId: studentData.stayId!,
      studentId: studentData.studentId,
      seat: selectedSeat || "",
      reason: selectedSeat ? reason : "기타",
    }).then((res) => {
      toast.success("추가되었습니다.");
    });
  };

  return (
    <Container>
      <Form>
        <InputWrapper>
          <label>학년</label>
          <Input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="학년을 입력하세요"
          />
        </InputWrapper>
        <InputWrapper>
          <label>반</label>
          <Input
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
            placeholder="반을 입력하세요"
          />
        </InputWrapper>
        <InputWrapper>
          <label>번호</label>
          <Input
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder="번호를 입력하세요"
          />
        </InputWrapper>
        <InputWrapper>
          <label>좌석 미선택 시, 미선택 사유</label>
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="좌석 미선택 사유를 입력하세요"
          />
        </InputWrapper>
        <SingleSeatSelect
          onChange={setSelectedSeat}
          initialSeat={selectedSeat}
        />
        <Button type="primary" onClick={handleSubmit} disabled={loading}>
          잔류 추가
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  overflow-y: auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: bold;
  }
`;
