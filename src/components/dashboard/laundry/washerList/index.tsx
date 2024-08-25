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
  selectedWasher: washerType | null;
  setSelectedWasher: (washer: washerType | null) => void;
}
function getWasherName(floor: number, position: "L" | "M" | "R"): string {
  return `${floor > 10 ? floor - 10 : floor}층 ${
    position === "L"
      ? "왼쪽"
      : position === "M"
      ? "가운데"
      : position === "R"
      ? "오른쪽"
      : ""
  } ${floor > 10 ? "건조기" : "세탁기"}`;
}
export default function WasherList({
  washers,
  selectedWasher,
  setSelectedWasher,
}: WasherListProps) {
  const [location, setLocation] = useState<"학봉관" | "우정학사">("학봉관");
  const [openWasher, setOpenWasher] = useState<washerType | null>(null);
  const [isAddingWasher, setIsAddingWasher] = useState<boolean>(false);
  const handleWasherSelect = (washer: washerType) => {
    if (selectedWasher === washer) {
      setSelectedWasher(null);
    } else {
      setSelectedWasher(washer);
    }
  };

  const handleToggleOpen = (washer: washerType) => {
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
              backgroundColor: isAddingWasher
                ? "var(--core-status-accent)"
                : "#F6F7FA",
            }}
            onClick={() => setIsAddingWasher((prev) => !prev)}
          >
            <Row align={"center"} gap={"4px"}>
              <Body
                $color={isAddingWasher ? "--basic-grade1" : "--basic-grade7"}
              >
                세탁기 추가
              </Body>
              <SvgContainer
                $fill={isAddingWasher ? "--basic-grade1" : "--basic-grade7"}
              >
                <Add />
              </SvgContainer>
            </Row>
          </Button>
        </Row>

        <ScrollableContent>
          <Col gap={"12px"}>
            {isAddingWasher && (
              <>
                <WasherAdd />
              </>
            )}

            {washers
              .filter(
                (elm) => elm._doc.gender === (location === "학봉관" ? "M" : "F")
              )
              .map((washer) => (
                <WasherOption
                  key={washer._doc._id}
                  name={getWasherName(washer._doc.floor, washer._doc.position)}
                  isSelected={selectedWasher === washer}
                  isOpen={openWasher === washer}
                  onSelect={() => handleWasherSelect(washer)}
                  onToggleOpen={() => handleToggleOpen(washer)}
                />
              ))}
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
