import {
  Row,
  Heading,
  Body,
  Circle,
  Col,
} from "@/components/atomic";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Button, Radio} from "antd";
import { seatType } from "@/lib/types/stay";

interface SeatData {
  label: string;
  status: string;
}

type SeatMode = "male1" | "male2" | "male3" | "female1" | "female2" | "female3" | "block" | "unblock" | null;

interface SetSeatProps {
  onChange: (seats: seatType) => void;
  initialSeats: seatType;
}

const SetSeat: React.FC<SetSeatProps> = ({ onChange, initialSeats }) => {
  const [seatData, setSeatData] = useState<SeatData[][]>([]);
  const [selectedMode, setSelectedMode] = useState<SeatMode>(null);

  useEffect(() => {
    const initialSeatData = generateSeatData();
    applyInitialSeats(initialSeatData, initialSeats);
    setSeatData(initialSeatData);
  }, [initialSeats]);

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
          row.push({
            label: "",
            status: "available",
          });
        }
      }
      data.push(row);
    }

    return data;
  };

  const applyInitialSeats = (
    seatData: SeatData[][],
    initialSeats: seatType
  ) => {
    (Object.keys(initialSeats) as Array<keyof seatType>).forEach((key) => {
      if (key !== "_id") {
        const status = key.startsWith("M") ? "male"+key.substring(1,2) : "female"+key.substring(1,2);
        initialSeats[key].forEach((seat) => {
          const row = seat.charCodeAt(0) - 64;
          const col = parseInt(seat.slice(1));
          if (seatData[row] && seatData[row][col]) {
            seatData[row][col].status = status;
            seatData[row][col].label = key.substring(1,2);
          }
        });
      }
    });
  };

  const handleSeatClick = (rowIndex: number, colIndex: number): void => {
    if (rowIndex === 0 || colIndex === 0 || colIndex === 10) return;
    const newSeatData = [...seatData];

    switch (selectedMode) {
      case "male1":
      case "male2":
      case "male3":
      case "female1":
      case "female2":
      case "female3":
        newSeatData[rowIndex][colIndex].status = selectedMode;
        newSeatData[rowIndex][colIndex].label = selectedMode.startsWith("male") ? selectedMode.substring(4, 5) : selectedMode.substring(6, 7);
        break;
      case "block":
          newSeatData[rowIndex][colIndex].status = "unavailable";
        break;
      case "unblock":
          newSeatData[rowIndex][colIndex].status = "available";
        break;
      default:
        return;
    }

    setSeatData(newSeatData);
    updateSeatsData(newSeatData);
  };

  const updateSeatsData = (data: SeatData[][]) => {
    const seats: seatType = {
      _id: initialSeats._id,
      M1: [],
      M2: [],
      M3: [],
      F1: [],
      F2: [],
      F3: [],
    };

    console.log(data)

    data.forEach((row, rowIndex) => {
      row.forEach((seat, colIndex) => {
        if (
          seat.status.startsWith("male") ||
          seat.status.startsWith("female")
        ) {
          const seatLabel = `${String.fromCharCode(64 + rowIndex)}${colIndex}`;
          const gender = seat.status.startsWith("male") ? "M" : "F";
          const grade = seat.status.startsWith("male") ? seat.status.substring(4, 5) : seat.status.substring(6, 7);
          const key = `${gender}${grade}` as keyof seatType;
          if (key in seats) {
            if (key !== "_id") {
              seats[key].push(seatLabel);
            }
          }
        }
      });
    });
    onChange(seats);
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
                      {seat.label}
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
                    1학년 남자
                  </Body>
                  <Body $color={"--basic-grade5"}>1학년 남자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "male1"}
                  onChange={() => setSelectedMode("male1")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    2학년 남자
                  </Body>
                  <Body $color={"--basic-grade5"}>1학년 남자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "male2"}
                  onChange={() => setSelectedMode("male2")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    3학년 남자
                  </Body>
                  <Body $color={"--basic-grade5"}>1학년 남자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "male3"}
                  onChange={() => setSelectedMode("male3")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    1학년 여자
                  </Body>
                  <Body $color={"--basic-grade5"}>1학년 여자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "female1"}
                  onChange={() => setSelectedMode("female1")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    2학년 여자
                  </Body>
                  <Body $color={"--basic-grade5"}>2학년 여자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "female2"}
                  onChange={() => setSelectedMode("female2")}
                />
              </Row>
            </Option>
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    3학년 여자
                  </Body>
                  <Body $color={"--basic-grade5"}>3학년 여자 좌석 선택</Body>
                </Col>
                <Radio
                  checked={selectedMode === "female3"}
                  onChange={() => setSelectedMode("female3")}
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
            <Option>
              <Row gap={"16px"} justify={"space-between"}>
                <Col gap={"8px"}>
                  <Body $color={"--basic-grade8"} $strong>
                    전체 좌석 해제
                  </Body>
                  <Button style={{ width: "match-parent" }} onClick={() => setSeatData(generateSeatData())}>
                    <Body $color={"black"}>전체 해제</Body>
                  </Button>
                </Col>
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
      case "male1":
      case "male2":
      case "male3":
        return "#4a90e2";
      case "female1":
      case "female2":
      case "female3":
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
      case "male1":
      case "male2":
      case "male3":
      case "female1":
      case "female2":
      case "female3":
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

export default SetSeat;
