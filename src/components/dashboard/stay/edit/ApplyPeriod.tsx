import { Body, Heading, Row, Col } from "@/components/atomic";
import { DatePicker, TimePicker } from "antd";
import { styled } from "styled-components";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

interface Duration {
  start: string;
  end: string;
}

interface ApplyPeriodProps {
  onChange: (durations: Duration[]) => void;
  initialDurations: Duration[];
}

export default function ApplyPeriod({
  onChange,
  initialDurations,
}: ApplyPeriodProps) {
  const [durations, setDurations] = useState<Duration[]>(
    initialDurations.length
      ? initialDurations
      : [
          { start: "", end: "" },
          { start: "", end: "" },
          { start: "", end: "" },
        ]
  );

  useEffect(() => {
    if (initialDurations.length) {
      setDurations(initialDurations);
    }
  }, [initialDurations]);

  const handleDateTimeChange = (
    grade: number,
    type: "start" | "end",
    value: dayjs.Dayjs | null,
    dateOrTime: "date" | "time"
  ) => {
    const newDurations = [...durations];
    const currentDateTime = dayjs(newDurations[grade - 1][type] || undefined);

    let updatedDateTime;
    if (dateOrTime === "date") {
      updatedDateTime = value
        ? value
            .hour(currentDateTime.hour())
            .minute(currentDateTime.minute())
            .second(currentDateTime.second())
        : null;
    } else {
      updatedDateTime = value
        ? currentDateTime
            .hour(value.hour())
            .minute(value.minute())
            .second(value.second())
        : null;
    }

    newDurations[grade - 1] = {
      ...newDurations[grade - 1],
      [type]: updatedDateTime
        ? updatedDateTime.format("YYYY-MM-DD HH:mm:ss")
        : "",
    };

    setDurations(newDurations);
    onChange(newDurations);
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
                onChange={(date) =>
                  handleDateTimeChange(grade, "start", date, "date")
                }
                value={
                  durations[grade - 1].start
                    ? dayjs(durations[grade - 1].start)
                    : null
                }
              />
              <TimePicker
                style={{ flex: 1 }}
                onChange={(time) =>
                  handleDateTimeChange(grade, "start", time, "time")
                }
                value={
                  durations[grade - 1].start
                    ? dayjs(durations[grade - 1].start)
                    : null
                }
              />
            </Row>
            <Row gap={"12px"} align={"center"}>
              <DatePicker
                style={{ flex: 1 }}
                onChange={(date) =>
                  handleDateTimeChange(grade, "end", date, "date")
                }
                value={
                  durations[grade - 1].end
                    ? dayjs(durations[grade - 1].end)
                    : null
                }
              />
              <TimePicker
                style={{ flex: 1 }}
                onChange={(time) =>
                  handleDateTimeChange(grade, "end", time, "time")
                }
                value={
                  durations[grade - 1].end
                    ? dayjs(durations[grade - 1].end)
                    : null
                }
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
