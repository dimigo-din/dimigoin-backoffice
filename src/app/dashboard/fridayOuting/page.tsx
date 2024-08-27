"use client";
import { Body, Col, Heading, Row } from "@/components/atomic";
import {
  addStudentFrigo,
  getFridayCurrentOuting,
  makeFrigo,
  setFrigo,
  unSetFrigo,
} from "@/lib/api/friday";
import { currentFrigoType } from "@/lib/types/friday";
import { Button, DatePicker, Form, Input, List, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import FrigoList from "@/components/dashboard/frigo/frigoList";
import FrigoDayList from "@/components/dashboard/frigo/frigoDayList";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { toast } from "react-toastify";

export default function FridayOuting() {
  const [currentFrigo, setCurrentFrigo] = useState<currentFrigoType | null>(
    null
  );
  const [form] = Form.useForm();
  const [students, setStudents] = useState<student[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [filteredStudents, setFilteredStudents] = useState<student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<student | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    getFridayCurrentOuting()
      .then((res) => {
        setCurrentFrigo(res.data);
      })
      .catch((res) => {
        setCurrentFrigo(null);
      });
  }, []);

  useEffect(() => {
    fetchData();
    getAllStudent()
      .then((res) => {
        setStudents(res);
      })
      .catch((error) => {
        console.error("Failed to fetch students:", error);
        notification.error({
          message: "학생 정보 로딩 실패",
          description: "학생 정보를 가져오는데 실패했습니다.",
        });
      });
  }, [fetchData]);

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
    form.setFieldsValue({
      studentName: student.name,
    });
  };

  const handleSubmit = (values: any) => {
    if (!selectedStudent) {
      toast.error("학생을 선택해주세요.");
      return;
    }
    if (!currentFrigo) {
      toast.error("현재 활성화된 금요귀가가 없습니다.");
      return;
    }
    const { reason } = values;

    setLoading(true);
    addStudentFrigo({
      frigoId: currentFrigo?.frigo._id,
      studentId: selectedStudent._id,
      reason,
    })
      .then((res) => {
        toast.success("금요귀가가 추가되었습니다.");
        form.resetFields();
        setSelectedStudent(null);
        fetchData();
      })
      .catch((error) => {
        toast.error("오류가 발생하였습니다.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <ContentRow>
        <ScrollableContent>
          <FrigoList data={currentFrigo} refetch={fetchData} />
        </ScrollableContent>
        <ScrollableContent>
          <FrigoDayList refetch={fetchData} />
        </ScrollableContent>
      </ContentRow>
      <FormContainer>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="studentName"
            label="학생 이름"
            rules={[{ required: true, message: "학생 이름을 입력하세요" }]}
          >
            <Input
              placeholder="학생 이름을 입력하세요"
              value={searchName}
              onChange={(e) => handleNameSearch(e.target.value)}
            />
          </Form.Item>

          {filteredStudents.length > 0 && !!searchName && (
            <List
              size="small"
              bordered
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
              선택된 학생: {selectedStudent.name} ({selectedStudent.grade}
              학년 {selectedStudent.class}반 {selectedStudent.number}번)
            </p>
          )}

          <Form.Item
            name="reason"
            label="금요귀가 사유 [사유/귀가시간]"
            rules={[{ required: true, message: "금요귀가 사유를 입력하세요" }]}
          >
            <Input.TextArea placeholder="금요귀가 사유는 [사유/귀가시간] 형식으로 대괄호를 제외하고 입력해주세요." />
          </Form.Item>

          <Form.Item>
            <AccentBtn type="primary" htmlType="submit" loading={loading}>
              금요귀가 추가
            </AccentBtn>
          </Form.Item>
        </Form>
      </FormContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding-right: 5px;
`;

const ContentRow = styled(Row)`
  flex: 1;
  min-height: 100%;
  gap: 16px;
  overflow: hidden;
`;

const ScrollableContent = styled(Col)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: white;
`;

const FormContainer = styled.div`
  flex: 0 0 auto;
  padding: 16px;
  background-color: var(--background-standard-primary);
  border-radius: 8px;
  margin-top: 16px;
  max-height: 50vh;
  overflow-y: auto;
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
