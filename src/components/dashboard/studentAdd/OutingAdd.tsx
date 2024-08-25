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
} from "antd";
import styled from "styled-components";
import { getAllStudent } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { addStudentStayOuting } from "@/lib/api/stay";
import moment from "moment";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const stayId = searchParams.get("stayId");

  const [form] = Form.useForm();
  const [students, setStudents] = useState<student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    const { grade, classNumber, studentNumber, reason, free, meal, duration } =
      values;

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
      free: free || false,
      date: new Date().toISOString(),
      reason: reason || "", // Handle empty reason
      meal: {
        breakfast: meal?.breakfast || false,
        lunch: meal?.lunch || false,
        dinner: meal?.dinner || false,
      },
      duration: {
        start:
          duration?.start?.format("YYYY-MM-DD HH:mm:ss") ||
          moment().format("YYYY-MM-DD HH:mm:ss"),
        end:
          duration?.end?.format("YYYY-MM-DD HH:mm:ss") ||
          moment().format("YYYY-MM-DD HH:mm:ss"),
      },
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
        description: "외출 추가 중 오류가 발생했습니다. 다시 시도하세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="grade"
          label="학년"
          rules={[{ required: true, message: "학년을 입력하세요" }]}
        >
          <Input placeholder="학년을 입력하세요" />
        </Form.Item>
        <Form.Item
          name="classNumber"
          label="반"
          rules={[{ required: true, message: "반을 입력하세요" }]}
        >
          <Input placeholder="반을 입력하세요" />
        </Form.Item>
        <Form.Item
          name="studentNumber"
          label="번호"
          rules={[{ required: true, message: "번호를 입력하세요" }]}
        >
          <Input placeholder="번호를 입력하세요" />
        </Form.Item>
        <Form.Item name="reason" label="좌석 미선택 시, 미선택 사유">
          <Input placeholder="좌석 미선택 사유를 입력하세요" />
        </Form.Item>
        <Form.Item name="free" valuePropName="checked" label="자기계발 외출">
          <Checkbox>자기계발 외출</Checkbox>
        </Form.Item>
        <Form.Item
          name={["meal", "breakfast"]}
          valuePropName="checked"
          label="아침 식사"
        >
          <Checkbox>아침</Checkbox>
        </Form.Item>
        <Form.Item
          name={["meal", "lunch"]}
          valuePropName="checked"
          label="점심 식사"
        >
          <Checkbox>점심</Checkbox>
        </Form.Item>
        <Form.Item
          name={["meal", "dinner"]}
          valuePropName="checked"
          label="저녁 식사"
        >
          <Checkbox>저녁</Checkbox>
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
              onChange={(date) =>
                form.setFieldsValue({
                  duration: { ...form.getFieldValue("duration"), start: date },
                })
              }
            />
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="종료 시간"
              style={{ width: "100%" }}
              onChange={(date) =>
                form.setFieldsValue({
                  duration: { ...form.getFieldValue("duration"), end: date },
                })
              }
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            외출 추가
          </Button>
        </Form.Item>
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
