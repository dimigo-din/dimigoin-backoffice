import { Body, Col, Heading, Row, SvgContainer } from "@/components/atomic";
import { Button, Input } from "antd";
import { styled } from "styled-components";
import AccountCircle from "@material-symbols/svg-300/rounded/account_circle.svg";
import OutingInfoBox from "./OutingInfoBox";
export default function StayManage() {
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
            잔류 학생 관리
          </Heading>
        </Row>
        <Col $fullw gap={"20px"} padding={"0px 24px 24px 24px"}>
          <Col $fullw gap={"16px"}>
            <Row padding={"0px 4px"}>
              <Body $color={"--basic-grade6"}>학생 선택</Body>
            </Row>
            <Input
              suffix={
                <SvgContainer
                  width={"20px"}
                  height={"20px"}
                  $fill={"--basic-grade6"}
                >
                  <AccountCircle />
                </SvgContainer>
              }
              value={"Colodog"}
              disabled
            />
          </Col>
          <Col $fullw gap={"16px"}>
            <Row padding={"0px 4px"}>
              <Body $color={"--basic-grade6"}>좌석 미선택 사유</Body>
            </Row>
            <Input
              suffix={
                <SvgContainer
                  width={"20px"}
                  height={"20px"}
                  $fill={"--basic-grade6"}
                >
                  <AccountCircle />
                </SvgContainer>
              }
              value={"등산"}
              disabled
            />
          </Col>
          <Col $fullw gap={"16px"}>
            <Row padding={"0px 4px"}>
              <Body $color={"--basic-grade6"}>외출 목록</Body>
            </Row>
            <ScrollableContainer>
              <OutingInfoBox />
            </ScrollableContainer>
          </Col>
        </Col>
        <Row $fullw gap={"8px"} padding={"0px 24px 24px 24px"} $flexAll>
          <Button
            style={{ height: "50px", backgroundColor: "var(--basic-grade3)" }}
          >
            <Body $color={"--basic-grade8"} $strong>
              취소
            </Body>
          </Button>
          <Button
            style={{ height: "50px", backgroundColor: "var(--basic-grade3)" }}
          >
            <Body $color={"--basic-grade8"} $strong>
              삭제
            </Body>
          </Button>
          <Button
            style={{
              height: "50px",
              backgroundColor: "var(--core-status-accent)",
            }}
          >
            <Body $color={"--basic-grade1"} $strong>
              저장
            </Body>
          </Button>
        </Row>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
`;

const ScrollableContainer = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
