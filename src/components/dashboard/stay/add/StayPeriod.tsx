import { Body, Heading, Row, SvgContainer } from "@/components/atomic";
import { DatePicker, ConfigProvider } from "antd";
import { styled } from "styled-components";

import Schedule from "@material-symbols/svg-300/rounded/schedule.svg";

export default function StayPeriod() {
  return (
    <>
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
        <Row
          $fullw
          padding={"0px 24px 24px 24px"}
          gap={"12px"}
          align={"center"}
        >
          <DatePicker />
          <Body $color={"--basic-grade5"}>~</Body>
          <DatePicker />
        </Row>
      </Container>
    </>
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
