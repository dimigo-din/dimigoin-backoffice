import { Body, Col, Heading, Row, SvgContainer } from "@/components/atomic";
import { Button } from "antd";
import { styled } from "styled-components";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import { useEffect, useState } from "react";
import WasherOption from "./washerOption";
import WasherAdd from "./washerAdd";
import { getWasher } from "@/lib/api/laundry";
import { washerType } from "@/lib/types/laundry";

interface WasherListProps {
  washers: washerType[];
  selectedWasher: string | null;
  setSelectedWasher: (washer: string | null) => void;
}
function getWasherName(floor: number, position: "L" | "M" | "R"): string {
  return `${floor}층 ${
    position === "L"
      ? "왼쪽"
      : position === "M"
      ? "가운데"
      : position === "R"
      ? "오른쪽"
      : ""
  } 세탁기`;
}
export default function WasherList({
  washers,
  selectedWasher,
  setSelectedWasher,
}: WasherListProps) {
  const [location, setLocation] = useState<"학봉관" | "우정학사">("학봉관");
  const [openWasher, setOpenWasher] = useState<string | null>(null);

  const handleWasherSelect = (washer: string) => {
    if (selectedWasher === washer) {
      setSelectedWasher(null);
    } else {
      setSelectedWasher(washer);
    }
  };

  const handleToggleOpen = (washer: string) => {
    setOpenWasher(openWasher === washer ? null : washer);
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
            {washers
              .filter(
                (elm) => elm.gender === (location === "학봉관" ? "M" : "F")
              )
              .map((washer) => (
                <WasherOption
                  key={washer._id}
                  name={getWasherName(washer.floor, washer.position)}
                  isSelected={
                    selectedWasher ===
                    getWasherName(washer.floor, washer.position)
                  }
                  isOpen={
                    openWasher === getWasherName(washer.floor, washer.position)
                  }
                  onSelect={() =>
                    handleWasherSelect(
                      getWasherName(washer.floor, washer.position)
                    )
                  }
                  onToggleOpen={() =>
                    handleToggleOpen(
                      getWasherName(washer.floor, washer.position)
                    )
                  }
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
