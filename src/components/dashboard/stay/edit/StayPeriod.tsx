import { Body, Heading, Row } from "@/components/atomic";
import { DatePicker } from "antd";
import { styled } from "styled-components";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface StayPeriodProps {
  onChange: (start: string, end: string) => void;
  initialStart: string;
  initialEnd: string;
}

export default function StayPeriod({
  onChange,
  initialStart,
  initialEnd,
}: StayPeriodProps) {
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      onChange(dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD"));
    }
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
          잔류 기간
        </Heading>
      </Row>
      <Row $fullw padding={"0px 24px 24px 24px"} gap={"12px"} align={"center"}>
        <DatePicker.RangePicker
          style={{ flex: 1 }}
          onChange={handleDateChange}
          value={[
            initialStart ? dayjs(initialStart) : null,
            initialEnd ? dayjs(initialEnd) : null,
          ]}
          defaultPickerValue={dayjs(initialStart)}
        />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
