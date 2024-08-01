import { Body, Heading, Row, Col, SvgContainer } from "@/components/atomic";
import { DatePicker, ConfigProvider } from "antd";
import { styled } from "styled-components";

export default function ApplyPeriod() {
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
            신청 기간
          </Heading>
        </Row>
        <Col padding={"0px 24px 24px 24px"} gap={"12px"}>
          <Col gap={"16px"}>
            <Body $padding={"0px 4px"} $color={"--basic-grade6"}>
              1학년
            </Body>
            <Row gap={"12px"} align={"center"}>
              <DatePicker />
              <Body $color={"--basic-grade5"}>~</Body>
              <DatePicker />
            </Row>
          </Col>
          <Col gap={"16px"}>
            <Body $padding={"0px 4px"} $color={"--basic-grade6"}>
              2학년
            </Body>
            <Row gap={"12px"} align={"center"}>
              <DatePicker />
              <Body $color={"--basic-grade5"}>~</Body>
              <DatePicker />
            </Row>
          </Col>
          <Col gap={"16px"}>
            <Body $padding={"0px 4px"} $color={"--basic-grade6"}>
              3학년
            </Body>
            <Row gap={"12px"} align={"center"}>
              <DatePicker />
              <Body $color={"--basic-grade5"}>~</Body>
              <DatePicker />
            </Row>
          </Col>
        </Col>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  display: flex;
  flex-direction: column;
`;
