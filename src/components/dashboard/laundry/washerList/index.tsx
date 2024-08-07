import { Body, Col, Heading, Row, SvgContainer } from "@/components/atomic";
import { Button } from "antd";
import { styled } from "styled-components";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import { useState } from "react";
import WasherOption from "./washerOption";
import WasherAdd from "./washerAdd";

interface WasherListProps {
  selectedWasher: string | null;
  setSelectedWasher: (washer: string | null) => void;
}

export default function WasherList({
  selectedWasher,
  setSelectedWasher,
}: WasherListProps) {
  const [location, setLocation] = useState<"학봉관" | "우정학사">("학봉관");
  const washers = [
    "2층 왼쪽 세탁기",
    "3층 왼쪽 세탁기",
    "4층 왼쪽 세탁기",
    "5층 왼쪽 세탁기",
  ];

  const handleWasherSelect = (washer: string) => {
    if (selectedWasher === washer) {
      setSelectedWasher(null);
    } else {
      setSelectedWasher(washer);
    }
  };

  return (
    <>
      <Container>
        <Row
          $fullw
          justify={"space-between"}
          align={"center"}
          padding={"4px 28px 0px 28px"}
          height={"80px"}
        >
          <Row gap={"20px"} align={"center"}>
            <Heading $strong color={"--basic-grade9"}>
              신청자 목록
            </Heading>
            <Body
              $color={
                location === "학봉관"
                  ? "--core-status-accent"
                  : "--basic-grade6"
              }
              style={{ cursor: "pointer" }}
              onClick={() => setLocation("학봉관")}
            >
              학봉관
            </Body>
            <Body
              $color={
                location === "우정학사"
                  ? "--core-status-accent"
                  : "--basic-grade6"
              }
              style={{ cursor: "pointer" }}
              onClick={() => setLocation("우정학사")}
            >
              우정학사
            </Body>
          </Row>

          <Button
            size="large"
            style={{
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#F6F7FA",
            }}
          >
            <Row align={"center"} gap={"4px"}>
              <Body $color={"--basic-grade7"}>세탁기 추가</Body>
              <SvgContainer $fill={"--basic-grade7"}>
                <Add />
              </SvgContainer>
            </Row>
          </Button>
        </Row>

        <ScrollableContent>
          <Col gap={"12px"}>
            {washers.map((washer) => (
              <WasherOption
                key={washer}
                name={washer}
                isSelected={selectedWasher === washer}
                onSelect={() => handleWasherSelect(washer)}
              />
            ))}
            <WasherAdd />
          </Col>
        </ScrollableContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;
