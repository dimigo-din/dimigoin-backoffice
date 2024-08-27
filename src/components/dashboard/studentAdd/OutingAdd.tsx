"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Input,
  Button,
  Form,
  notification,
  Checkbox,
  DatePicker,
  Space,
  Card,
  Typography,
  Row,
  Col,
  List,
} from "antd";
import styled from "styled-components";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { addStudentStayOuting } from "@/lib/api/stay";
import dayjs, { Dayjs } from "dayjs";
import { Body } from "@/components/atomic";

const { Title } = Typography;

type StayOutingApiType = {
  stayId: string;
  studentId: string;
  free: boolean;
  date: string;
  reason: string;
  meal: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  duration: {
    start: string;
    end: string;
  };
};

export default function OutingAdd() {
  const searchParams = useSearchParams();
  const stayId = searchParams.get("stayId");

  const [form] = Form.useForm();
  const [students, setStudents] = useState<student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFreeOuting, setIsFreeOuting] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const [filteredStudents, setFilteredStudents] = useState<student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<student | null>(null);
  const [duration, setDuration] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: null,
    end: null,
  });

  useEffect(() => {
    setLoading(true);
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
    form.setFieldsValue({
      studentName: student.name,
    });
  };

  const handleSubmit = async (values: any) => {
    if (!selectedStudent) {
      notification.error({
        message: "학생을 선택해주세요.",
        description: "학생 이름을 검색하고 목록에서 선택하세요.",
      });
      return;
    }

    const { reason, outingDay, free, meal } = values;

    const studentData: StayOutingApiType = {
      studentId: selectedStudent._id,
      stayId: stayId as string,
      date: dayjs(outingDay).format("YYYY-MM-DD"),
      free: free ?? false,
      meal: {
        breakfast: meal?.breakfast || false,
        lunch: meal?.lunch || false,
        dinner: meal?.dinner || false,
      },
      duration: {
        start: duration.start
          ? duration.start.format("YYYY-MM-DD HH:mm:ss")
          : "",
        end: duration.end ? duration.end.format("YYYY-MM-DD HH:mm:ss") : "",
      },
      reason: reason ?? "",
    };

    try {
      setLoading(true);
      await addStudentStayOuting(studentData, stayId!, selectedStudent._id);
      notification.success({
        message: "외출 추가 완료",
        description: "학생의 외출 정보가 성공적으로 추가되었습니다.",
      });
      form.resetFields();
      setSelectedStudent(null);
      setDuration({ start: null, end: null });
    } catch (error) {
      notification.error({
        message: "추가 실패",
        description: "해당 학생이 잔류를 신청했는지 확인해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title level={3}>외출 추가</Title>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            outingDay: dayjs(),
          }}
          onValuesChange={(changedValues) => {
            if (changedValues.free !== undefined) {
              setIsFreeOuting(changedValues.free);
            }
          }}
        >
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
              선택된 학생: {selectedStudent.name} ({selectedStudent.grade}학년{" "}
              {selectedStudent.class}반 {selectedStudent.number}번)
            </p>
          )}

          <Form.Item name="free" valuePropName="checked" label="자기계발 외출">
            <Checkbox>자기계발 외출</Checkbox>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={["meal", "breakfast"]} valuePropName="checked">
                <Checkbox>아침 식사</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["meal", "lunch"]} valuePropName="checked">
                <Checkbox>점심 식사</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["meal", "dinner"]} valuePropName="checked">
                <Checkbox>저녁 식사</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="outingDay"
            label="외출 날짜 (잔류 기간 내의 날짜 선택)"
            rules={[{ required: true, message: "외출 날짜를 선택하세요" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          {!isFreeOuting && (
            <>
              <Form.Item name="reason" label="외출 사유">
                <Input.TextArea placeholder="외출 사유" />
              </Form.Item>
              <Form.Item
                label="외출 시간"
                rules={[{ required: true, message: "외출 시간을 선택하세요" }]}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="시작 시간"
                    style={{ width: "100%" }}
                    value={duration.start}
                    onChange={(value) =>
                      setDuration((prev) => ({ ...prev, start: value }))
                    }
                  />
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="종료 시간"
                    style={{ width: "100%" }}
                    value={duration.end}
                    onChange={(value) =>
                      setDuration((prev) => ({ ...prev, end: value }))
                    }
                  />
                </Space>
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              외출 추가
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
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
