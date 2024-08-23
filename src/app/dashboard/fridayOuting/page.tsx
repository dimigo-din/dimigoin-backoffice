"use client";
import { Body, Col, Heading, Row } from "@/components/atomic";
import { getFridayCurrentOuting, setFrigo, unSetFrigo } from "@/lib/api/friday";
import { currentFrigoType } from "@/lib/types/friday";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function FridayOuting() {
  const [currentFrigo, setCurrentFrigo] = useState<currentFrigoType | null>(
    null
  );
  useEffect(() => {
    getFridayCurrentOuting().then((res) => {
      setCurrentFrigo(res);
      console.log(res);
    });
  }, []);

  const handleDecision = (ok: boolean, id: string) => {
    if (ok) {
      setFrigo({ id });
    } else {
      unSetFrigo({ id });
    }
  };
  return (
    <>
      <Container>
        <Col
          $fullw
          $fullh
          gap={"8px"}
          padding={"24px"}
          style={{ overflowY: "auto", margin: "12px 0" }}
        >
          <Heading $color={"--content-standard-primary"}>
            {currentFrigo?.frigo.date}의 금요귀가
          </Heading>
          {currentFrigo?.applications.map((elm) => (
            <>
              <Row justify={"space-between"}>
                <Row gap={"8px"}>
                  <Row gap={"4px"}>
                    <Body $color={"--content-standard-primary"}>
                      {`${elm.student?.grade}${
                        elm.student?.class
                      }${elm.student?.number.toString().padEnd(2, "0")}`}
                    </Body>
                    <Body $color={"--content-standard-primary"}>
                      {elm.student?.name}
                    </Body>
                  </Row>
                  <Body $color={"--content-standard-secondary"}>
                    {elm.reason}, {elm.status}
                  </Body>
                </Row>

                <Row gap={"4px"}>
                  <AccentBtn onClick={() => handleDecision(true, elm._id)}>
                    <Body $color={"--basic-grade1"}>허가</Body>
                  </AccentBtn>
                  <Button
                    onClick={() => handleDecision(false, elm._id)}
                    style={{ border: "1px solid var(--line-outline)" }}
                  >
                    <Body>반려</Body>
                  </Button>
                </Row>
              </Row>
            </>
          ))}
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
  overflow: hidden;
`;

const AccentBtn = styled(Button)`
  background-color: var(--core-status-accent) !important;
  border-radius: 12px !important;
  border: none;
  padding: 16px 0;
  height: 44px;

  &:hover {
    background-color: var(--core-status-accent_translucent) !important;
  }
`;
