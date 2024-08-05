import { Body, Col, Row } from "@/components/atomic/index";
import { Button, Checkbox } from "antd";
import { styled } from "styled-components";
import React from "react";
export default function OutingInfoBox() {
  const [mealSelected, setMealSelected] = React.useState({
    breakFast: false,
    lunch: false,
    dinner: false,
  });
  return (
    <>
      <Container>
        <Col $fullw padding={"16px 20px"} gap={"20px"}>
          <Row $fullw gap={"8px"} align={"center"}>
            <Body
              $color={"--basic-grade8"}
              $strong
              style={{ flex: 1, textAlign: "left" }}
            >
              교문 앞 고무줄놀이
            </Body>
            <Button
              style={{
                backgroundColor: "var(--core-status-accent)",
                border: "none",
                padding: "8px 12px",
              }}
            >
              <Body $color={"--basic-grade1"} $strong>
                허가
              </Body>
            </Button>
            <Button
              style={{
                backgroundColor: "var(--basic-grade3)",
                border: "none",
                padding: "8px 12px",
              }}
            >
              <Body $color={"--basic-grade8"} $strong>
                거절
              </Body>
            </Button>
          </Row>
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
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"}>외출 사유</Body>
              <Body $color={"--basic-grade8"}>자기계발</Body>
            </Row>
          </Col>
        </Col>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: var(--basic-grade2);
  border-radius: var(--radius-400);
`;
