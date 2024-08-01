import { Body, Heading, Row, Col, SvgContainer } from "@/components/atomic";
import { DatePicker, ConfigProvider, Switch } from "antd";
import { styled } from "styled-components";

export default function ApplyOuting() {
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
            외출 관리
          </Heading>
        </Row>
        <Col padding={"0px 24px 24px 24px"} gap={"12px"}>
          <Row gap={"12px"} $flexAll>
            <Option>
              <Col padding={"24px"} gap={"12px"}>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $strong $color={"--basic-grade8"}>
                    2023년 9월 6일
                  </Body>
                  <Switch />
                </Row>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                  <Switch />
                </Row>
              </Col>
            </Option>
            <Option>
              <Col padding={"24px"} gap={"12px"}>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $strong $color={"--basic-grade8"}>
                    2023년 9월 3일
                  </Body>
                  <Switch />
                </Row>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                  <Switch />
                </Row>
              </Col>
            </Option>
          </Row>
          <Row gap={"12px"} $flexAll>
            <Option>
              <Col padding={"24px"} gap={"12px"}>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $strong $color={"--basic-grade8"}>
                    2023년 9월 1일
                  </Body>
                  <Switch />
                </Row>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                  <Switch />
                </Row>
              </Col>
            </Option>
            <Option>
              <Col padding={"24px"} gap={"12px"}>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $strong $color={"--basic-grade8"}>
                    2023년 9월 5일
                  </Body>
                  <Switch defaultChecked />
                </Row>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                  <Switch />
                </Row>
              </Col>
            </Option>
          </Row>
          <Row gap={"12px"} $flexAll>
            <Option>
              <Col padding={"24px"} gap={"12px"}>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $strong $color={"--basic-grade8"}>
                    2023년 9월 2일
                  </Body>
                  <Switch />
                </Row>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                  <Switch />
                </Row>
              </Col>
            </Option>
            <Option>
              <Col padding={"24px"} gap={"12px"}>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $strong $color={"--basic-grade5"}>
                    2023년 9월 6일
                  </Body>
                  <Switch disabled />
                </Row>
                <Row align={"center"} justify={"space-between"} gap={"12px"}>
                  <Body $color={"--basic-grade8"}>자기계발 외출</Body>
                  <Switch defaultChecked />
                </Row>
              </Col>
            </Option>
          </Row>
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

const Option = styled.div`
  background-color: var(--basic-grade2);
  border-radius: 12px;
`;
