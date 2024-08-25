import { Body, Heading, Row, Col } from "@/components/atomic";
import { DatePicker, TimePicker } from "antd";
import { styled } from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

interface Duration {
  startDate: Dayjs | null;
  startTime: Dayjs | null;
  endDate: Dayjs | null;
  endTime: Dayjs | null;
}

interface ApplyPeriodProps {
  onChange: (durations: { start: string; end: string }[]) => void;
}

export default function ApplyPeriod({ onChange }: ApplyPeriodProps) {
  const defaultStartTime = dayjs().hour(0).minute(0);
  const defaultEndTime = dayjs().hour(22).minute(0);

  const [durations, setDurations] = useState<Duration[]>([
    {
      startDate: dayjs(),
      startTime: defaultStartTime,
      endDate: dayjs(),
      endTime: defaultEndTime,
    },
    {
      startDate: dayjs(),
      startTime: defaultStartTime,
      endDate: dayjs(),
      endTime: defaultEndTime,
    },
    {
      startDate: dayjs(),
      startTime: defaultStartTime,
      endDate: dayjs(),
      endTime: defaultEndTime,
    },
  ]);

  useEffect(() => {
    const formattedDurations = durations.map((duration) => {
      const start =
        duration.startDate && duration.startTime
          ? combineDateAndTime(duration.startDate, duration.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : "";
      const end =
        duration.endDate && duration.endTime
          ? combineDateAndTime(duration.endDate, duration.endTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : "";
      return { start, end };
    });
    onChange(formattedDurations);
  }, [durations, onChange]);

  const handleDateChange = (
    grade: number,
    type: "startDate" | "endDate",
    date: Dayjs | null
  ) => {
    const newDurations = [...durations];
    newDurations[grade - 1][type] = date;
    setDurations(newDurations);
  };

  const handleTimeChange = (
    grade: number,
    type: "startTime" | "endTime",
    time: Dayjs | null
  ) => {
    const newDurations = [...durations];
    newDurations[grade - 1][type] = time;
    setDurations(newDurations);
  };

  const combineDateAndTime = (date: Dayjs, time: Dayjs) => {
    return date.hour(time.hour()).minute(time.minute()).second(time.second());
  };

  return (
    <Container>
      <Row
        $fullw
        padding={"4px 28px 0px 28px"}
        height={"80px"}
        align={"center"}
      >
        <Heading $strong $color={"--basic-grade9"}>
          신청 기간
        </Heading>
      </Row>
      <Col padding={"0px 24px 24px 24px"} gap={"12px"}>
        {[1, 2, 3].map((grade) => (
          <Col key={grade} gap={"16px"}>
            <Body $padding={"0px 4px"} $color={"--basic-grade6"}>
              {grade}학년
            </Body>
            <Row gap={"12px"} align={"center"}>
              <DatePicker
                style={{ flex: 1 }}
                onChange={(date) => handleDateChange(grade, "startDate", date)}
                value={durations[grade - 1].startDate}
              />
              <TimePicker
                style={{ flex: 1 }}
                onChange={(time) => handleTimeChange(grade, "startTime", time)}
                value={durations[grade - 1].startTime}
                format={"HH:mm"}
              />
            </Row>
            <Row gap={"12px"} align={"center"}>
              <DatePicker
                style={{ flex: 1 }}
                onChange={(date) => handleDateChange(grade, "endDate", date)}
                value={durations[grade - 1].endDate}
              />
              <TimePicker
                style={{ flex: 1 }}
                onChange={(time) => handleTimeChange(grade, "endTime", time)}
                value={durations[grade - 1].endTime}
                format={"HH:mm"}
              />
            </Row>
          </Col>
        ))}
      </Col>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  display: flex;
  flex-direction: column;
`;
