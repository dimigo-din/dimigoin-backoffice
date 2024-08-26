"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
} from "antd";
import styled from "styled-components";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { addStudentStayOuting } from "@/lib/api/stay";
import dayjs from "dayjs";

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

  useEffect(() => {
    setLoading(true);
    getAllStudent()
      .then((res) => {
        setStudents(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (values: any) => {
    if (!students) {
      notification.error({
        message: "학생 정보를 불러오는 중입니다.",
        description: "잠시 후 다시 시도하세요.",
      });
      return;
    }

    const {
      grade,
      classNumber,
      studentNumber,
      reason,
      outingDay,
      free,
      meal,
      duration,
    } = values;

    const selectedStudent = students.find(
      (student) =>
        student.grade.toString() === grade &&
        student.class.toString() === classNumber &&
        student.number.toString() === studentNumber
    );

    if (!selectedStudent) {
      notification.error({
        message: "학생을 찾을 수 없습니다.",
        description: "정보를 다시 확인하세요.",
      });
      return;
    }
    const studentData: StayOutingApiType = {
      studentId: selectedStudent._id,
      stayId: stayId as string,
      date: dayjs(outingDay).format("YYYY-MM-DD"),
      free: free,
      meal: {
        breakfast: meal?.breakfast || false,
        lunch: meal?.lunch || false,
        dinner: meal?.dinner || false,
      },
      duration: {
        start: duration?.start
          ? dayjs(duration.start).format("YYYY-MM-DD HH:mm:ss")
          : "",
        end: duration?.end
          ? dayjs(duration.end).format("YYYY-MM-DD HH:mm:ss")
          : "",
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
            outingDay: dayjs(), // Set default value to today
            duration: {
              start: dayjs(),
              end: dayjs().add(1, "hour"),
            },
          }}
          onValuesChange={(changedValues) => {
            if (changedValues.free !== undefined) {
              setIsFreeOuting(changedValues.free);
            }
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="grade"
                label="학년"
                rules={[{ required: true, message: "학년을 입력하세요" }]}
              >
                <Input placeholder="학년을 입력하세요" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="classNumber"
                label="반"
                rules={[{ required: true, message: "반을 입력하세요" }]}
              >
                <Input placeholder="반을 입력하세요" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="studentNumber"
                label="번호"
                rules={[{ required: true, message: "번호를 입력하세요" }]}
              >
                <Input placeholder="번호를 입력하세요" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="free" valuePropName="checked" label="자기계발 외출">
            <Checkbox>자기계발 외출</Checkbox>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={["meal", "breakfast"]} valuePropName="checked">
                <Checkbox>아침 식사 취소</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["meal", "lunch"]} valuePropName="checked">
                <Checkbox>점심 식사 취소</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["meal", "dinner"]} valuePropName="checked">
                <Checkbox>저녁 식사 취소</Checkbox>
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
                name="duration"
                label="외출 시간"
                rules={[{ required: true, message: "외출 시간을 선택하세요" }]}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="시작 시간"
                    style={{ width: "100%" }}
                  />
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="종료 시간"
                    style={{ width: "100%" }}
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
