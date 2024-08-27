"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button, List } from "antd";
import styled from "styled-components";
import SingleSeatSelect from "@/components/dashboard/studentAdd/SingleSeatSelect";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { addStudentStay } from "@/lib/api/stay";
import { toast } from "react-toastify";
import { Body } from "@/components/atomic";

export default function Add() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stayId = searchParams.get("stayId");

  const [reason, setReason] = useState<string>("");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [students, setStudents] = useState<student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchName, setSearchName] = useState<string>("");
  const [filteredStudents, setFilteredStudents] = useState<student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<student | null>(null);

  useEffect(() => {
    getAllStudent()
      .then((res) => {
        setStudents(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNameSearch = (value: string) => {
    setSearchName(value);
    if (students) {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleStudentSelect = (student: student) => {
    setSelectedStudent(student);
    setFilteredStudents([]);
    setSearchName("");
  };

  const handleSubmit = () => {
    if (!selectedStudent) {
      toast.error("학생을 선택해주세요.");
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
      seat: selectedSeat || "NONE",
      reason: selectedSeat ? reason : "기타",
    }).then((res) => {
      toast.success("추가되었습니다.");
      // 폼 초기화
      setSelectedStudent(null);
      setSearchName("");
      setSelectedSeat(null);
      setReason("");
    });
  };

  return (
    <Container>
      <Form>
        <InputWrapper>
          <label>학생 이름</label>
          <Input
            value={searchName}
            onChange={(e) => handleNameSearch(e.target.value)}
            placeholder="학생 이름을 입력하세요"
          />
        </InputWrapper>
        {filteredStudents.length > 0 && !!searchName && (
          <List
            size="small"
            bordered
            style={{ backgroundColor: "var(--background-standard-primary)" }}
            dataSource={filteredStudents}
            renderItem={(student) => (
              <List.Item
                key={student._id}
                actions={[
                  <AccentBtn onClick={() => handleStudentSelect(student)}>
                    <Body $color={"--basic-grade1"}>선택</Body>
                  </AccentBtn>,
                ]}
              >
                {`${student.name} (${student.grade}학년 ${student.class}반 ${student.number}번)`}
              </List.Item>
            )}
          />
        )}
        {selectedStudent && (
          <p>
            선택된 학생: {selectedStudent.name} ({selectedStudent.grade}학년{" "}
            {selectedStudent.class}반 {selectedStudent.number}번)
          </p>
        )}
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
