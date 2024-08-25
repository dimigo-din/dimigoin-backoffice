import { Body, Heading, Row, Col } from "@/components/atomic";
import { Switch, DatePicker, Button } from "antd";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface Date {
  date: string;
  free: boolean;
}

interface ApplyOutingProps {
  onChange: (dates: Date[]) => void;
  initialDates: Date[];
}

export default function ApplyOuting({
  onChange,
  initialDates,
}: ApplyOutingProps) {
  const [dates, setDates] = useState<Date[]>(initialDates);

  useEffect(() => {
    setDates(initialDates);
  }, [initialDates]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const newDate: Date = { date: date.format("YYYY-MM-DD"), free: false };
      const newDates = [...dates, newDate];
      setDates(newDates);
      onChange(newDates);
    }
  };

  const handleSwitchChange = (checked: boolean, dateString: string) => {
    const newDates = dates.map((d) =>
      d.date === dateString ? { ...d, free: checked } : d
    );
    setDates(newDates);
    onChange(newDates);
  };

  const handleDeleteDate = (dateToDelete: string) => {
    const newDates = dates.filter((d) => d.date !== dateToDelete);
    setDates(newDates);
    onChange(newDates);
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
          외출 관리
        </Heading>
      </Row>
      <Col padding={"0px 24px 24px 24px"} gap={"12px"}>
        <DatePicker onChange={handleDateChange} />
        {dates.map((date, index) => (
          <Option key={index}>
            <Col padding={"24px"} gap={"12px"}>
              <Row align={"center"} justify={"space-between"} gap={"12px"}>
                <Body $strong $color={"--basic-grade8"}>
                  {date.date}
                </Body>
                <Button onClick={() => handleDeleteDate(date.date)}>
                  삭제
                </Button>
              </Row>
              <Row align={"center"} justify={"space-between"} gap={"12px"}>
                <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                <Switch
                  checked={date.free}
                  onChange={(checked) => handleSwitchChange(checked, date.date)}
                />
              </Row>
            </Col>
          </Option>
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

const Option = styled.div`
  background-color: var(--basic-grade2);
  border-radius: 12px;
`;
