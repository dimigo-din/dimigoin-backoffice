import { Body, Col, Heading, Row } from "@/components/atomic";
import { Checkbox } from "antd";
import { styled } from "styled-components";
import React from "react";
export default function OutingManage() {
  const [mealSelected, setMealSelected] = React.useState({
    breakFast: false,
    lunch: false,
    dinner: false,
  });
  return (
    <>
      <Container>
        <Row
          $fullw
          justify={"space-between"}
          padding={"4px 28px 0px 28px"}
          height={"80px"}
          align={"center"}
        >
          <Heading $strong color={"--basic-grade9"}>
            외출 관리
          </Heading>
          <Heading $strong color={"--basic-grade6"}>
            토요일 외출 1
          </Heading>
        </Row>
        <Col padding={"0px 24px 24px 24px"}>
          <Row gap={"16px"} $fullw justify={"space-between"}>
            <Col gap={"12px"}>
              <Body $color={"--basic-grade5"}>급식 취소</Body>
              <Row gap={"20px"}>
                <Row gap={"8px"}>
                  <Checkbox
                    checked={mealSelected.breakFast}
                    onChange={(e) =>
                      setMealSelected((prev) => ({
                        ...prev,
                        breakFast: e.target.checked,
                      }))
                    }
                  />
                  <Body
                    $strong
                    $color={
                      mealSelected.breakFast
                        ? "--core-status-accent"
                        : "--basic-grade5"
                    }
                  >
                    아침
                  </Body>
                </Row>
                <Row gap={"8px"}>
                  <Checkbox
                    checked={mealSelected.lunch}
                    onChange={(e) =>
                      setMealSelected((prev) => ({
                        ...prev,
                        lunch: e.target.checked,
                      }))
                    }
                  />
                  <Body
                    $strong
                    $color={
                      mealSelected.lunch
                        ? "--core-status-accent"
                        : "--basic-grade5"
                    }
                  >
                    점심
                  </Body>
                </Row>
                <Row gap={"8px"}>
                  <Checkbox
                    checked={mealSelected.dinner}
                    onChange={(e) =>
                      setMealSelected((prev) => ({
                        ...prev,
                        dinner: e.target.checked,
                      }))
                    }
                  />
                  <Body
                    $strong
                    $color={
                      mealSelected.dinner
                        ? "--core-status-accent"
                        : "--basic-grade5"
                    }
                  >
                    저녁
                  </Body>
                </Row>
              </Row>
            </Col>
            <Row gap={"16px"}>
              <Body $color={"--basic-grade5"}>외출 사유</Body>
              <Body $color={"--basic-grade8"}>잔디를 만져야 해서</Body>
            </Row>
            <Row gap={"16px"}>
              <Body $color={"--basic-grade5"}>외출 시간</Body>
              <Body $color={"--basic-grade8"}>오전 12시 ~ 오후 11시</Body>
            </Row>
          </Row>
        </Col>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
`;
