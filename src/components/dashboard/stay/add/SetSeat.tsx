import {
  SvgContainer,
  Row,
  Heading,
  Body,
  Circle,
  Col,
} from "@/components/atomic";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Close from "@material-symbols/svg-300/rounded/close.svg";
import { Radio, RadioChangeEvent } from "antd";

interface SeatData {
  label: string;
  status: string;
}

type SeatMode = "male" | "female" | "block" | "unblock" | null;

const Seats: React.FC = () => {
  const [seatData, setSeatData] = useState<SeatData[][]>([]);
  const [selectedMode, setSelectedMode] = useState<SeatMode>(null);

  useEffect(() => {
    setSeatData(generateSeatData());
  }, []);

  const generateSeatData = (): SeatData[][] => {
    const rows = 10;
    const cols = 20;
    const data: SeatData[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: SeatData[] = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 && j === 0) {
          row.push({ label: "#", status: "label" });
        } else if (i === 0) {
          if (j === 10) {
            row.push({ label: "", status: "aisle" });
          } else {
            row.push({
              label: j > 10 ? (j - 1).toString() : j.toString(),
              status: "label",
            });
          }
        } else if (j === 0) {
          row.push({ label: String.fromCharCode(64 + i), status: "label" });
        } else if (j === 10) {
          row.push({ label: "", status: "aisle" });
        } else {
          const isUnavailable = Math.random() < 0.1;
          row.push({
            label: "",
            status: isUnavailable ? "unavailable" : "available",
          });
        }
      }
      data.push(row);
    }

    return data;
  };

  const handleSeatClick = (rowIndex: number, colIndex: number): void => {
    if (rowIndex === 0 || colIndex === 0 || colIndex === 10) return;
    const seat = seatData[rowIndex][colIndex];
    const newSeatData = [...seatData];

    switch (selectedMode) {
      case "male":
        if (seat.status === "available" || seat.status === "selectedFemale") {
          newSeatData[rowIndex][colIndex].status = "selectedMale";
        }
        break;
      case "female":
        if (seat.status === "available" || seat.status === "selectedMale") {
          newSeatData[rowIndex][colIndex].status = "selectedFemale";
        }
        break;
      case "block":
        if (seat.status !== "unavailable") {
          newSeatData[rowIndex][colIndex].status = "unavailable";
        }
        break;
      case "unblock":
        if (seat.status !== "available") {
          newSeatData[rowIndex][colIndex].status = "available";
        }
        break;
      default:
        return;
    }

    setSeatData(newSeatData);
  };

  return (
    <Container>
      <HeaderRow>
        <Heading $strong color={"--basic-grade9"}>
          잔류 좌석 현황
        </Heading>
        <LegendRow>
          <LegendItem>
            <Circle $color={"--basic-grade3"} />
            <Body $color={"--basic-grade6"}>빈 좌석</Body>
          </LegendItem>
          <LegendItem>
            <Circle $color={"--solid-blue"} />
            <Body $color={"--basic-grade6"}>남자</Body>
          </LegendItem>
          <LegendItem>
            <Circle $color={"--core-status-accent"} />
            <Body $color={"--basic-grade6"}>여자</Body>
          </LegendItem>
        </LegendRow>
      </HeaderRow>
      <Row padding={"0px 24px 24px 24px"} gap={"24px"}>
        <LeftSection>
          <SeatBox>
            <SeatGrid>
              {seatData.map((row, rowIndex) => (
                <SeatRow key={rowIndex}>
                  {row.map((seat, colIndex) => (
                    <SeatCell
                      key={`${rowIndex}-${colIndex}`}
                      status={seat.status}
                      onClick={() => handleSeatClick(rowIndex, colIndex)}
                      isHeader={rowIndex === 0 || colIndex === 0}
                      isAisle={colIndex === 10}
                    >
                      {seat.status === "unavailable" ? (
                        <SvgContainer
                          $fill="--basic-grade5"
                          width={"16px"}
                          height={"16px"}
                        >
                          <Close />
                        </SvgContainer>
                      ) : (
                        seat.label
                      )}
                    </SeatCell>
                  ))}
                </SeatRow>
              ))}
            </SeatGrid>
          </SeatBox>
        </LeftSection>
        <RightSection>
          <OptionGrid>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    남자
                  </Body>
                  <Body $color={"--basic-grade5"}>남자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "male"}
                  onChange={() => setSelectedMode("male")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    여자
                  </Body>
                  <Body $color={"--basic-grade5"}>여자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "female"}
                  onChange={() => setSelectedMode("female")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    좌석 차단
                  </Body>
                  <Body $color={"--basic-grade5"}>좌석 사용 불가 설정</Body>
                </Col>
                <Radio
                  checked={selectedMode === "block"}
                  onChange={() => setSelectedMode("block")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    좌석 해제
                  </Body>
                  <Body $color={"--basic-grade5"}>모든 설정 해제</Body>
                </Col>
                <Radio
                  checked={selectedMode === "unblock"}
                  onChange={() => setSelectedMode("unblock")}
                />
              </Row>
            </Option>
          </OptionGrid>
        </RightSection>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
`;

const LeftSection = styled.div``;

const SeatBox = styled.div`
  border-radius: 12px;
  border: 1px solid #ebecf5;
  padding: 20px;
  overflow-x: auto;
`;

const SeatGrid = styled.div`
  display: inline-block;
  white-space: nowrap;
`;

const SeatRow = styled.div`
  display: flex;
`;

interface SeatCellProps {
  status: string;
  isHeader: boolean;
  isAisle: boolean;
  onClick: () => void;
}

const SeatCell = styled.div<SeatCellProps>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  margin: 2px;
  cursor: ${({ isHeader, status, isAisle }) =>
    isHeader || status === "unavailable" || isAisle ? "default" : "pointer"};
  background-color: ${({ status, isHeader, isAisle }) => {
    if (isHeader || isAisle) return "transparent";
    switch (status) {
      case "available":
        return "#e0e0e0";
      case "selectedMale":
        return "#4a90e2";
      case "selectedFemale":
        return "#e84393";
      case "unavailable":
        return "";
      default:
        return "#e0e0e0";
    }
  }};
  color: ${({ status, isHeader }) => {
    if (isHeader) return "#333";
    switch (status) {
      case "available":
        return "#333";
      case "selectedMale":
      case "selectedFemale":
        return "#fff";
      case "unavailable":
        return "#999";
      default:
        return "#333";
    }
  }};
  font-weight: ${({ isHeader }) => (isHeader ? "bold" : "normal")};
  border: ${({ status }) =>
    status === "unavailable" ? "1px solid var(--basic-grade3)" : "none"};
`;

const RightSection = styled.div`
  flex: 1;
`;

const HeaderRow = styled(Row)`
  padding: 20px 28px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const LegendRow = styled(Row)`
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const LegendItem = styled(Row)`
  gap: 8px;
  align-items: center;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Option = styled.div`
  background-color: var(--basic-grade2);
  border-radius: 12px;
  padding: 20px;
`;

export default Seats;
