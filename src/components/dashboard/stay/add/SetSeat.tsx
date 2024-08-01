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
import { Radio } from "antd";

const Seats = () => {
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    setSeatData(generateSeatData());
  }, []);

  const generateSeatData = () => {
    const rows = 20;
    const cols = 18;
    const data = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 && j === 0) {
          row.push({ label: "#", status: "label" });
        } else if (i === 0) {
          row.push({ label: j, status: "label" });
        } else if (j === 0) {
          row.push({ label: String.fromCharCode(64 + i), status: "label" });
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

  const handleSeatClick = (rowIndex, colIndex) => {
    if (rowIndex === 0 || colIndex === 0) return; // 레이블 클릭 방지
    const seat = seatData[rowIndex][colIndex];
    if (seat.status === "available") {
      const newSeatData = [...seatData];
      newSeatData[rowIndex][colIndex].status =
        selectedGender === "male" ? "selectedMale" : "selectedFemale";
      setSeatData(newSeatData);
      setSelectedSeats([...selectedSeats, { row: rowIndex, col: colIndex }]);
    }
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
            <Body $color={"--basic-grade6"}>잔여 좌석</Body>
          </LegendItem>
          <LegendItem>
            <Circle $color={"--basic-grade6"} />
            <Body $color={"--basic-grade6"}>예약된 좌석</Body>
          </LegendItem>
          <LegendItem>
            <Circle $color={"--core-status-accent"} />
            <Body $color={"--basic-grade6"}>선택한 좌석</Body>
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
                    <>
                      <SeatCell
                        key={`${rowIndex}-${colIndex}`}
                        status={seat.status}
                        onClick={() => handleSeatClick(rowIndex, colIndex)}
                        isHeader={rowIndex === 0 || colIndex === 0}
                      >
                        {seat.status === "unavailable" ? (
                          <>
                            <SvgContainer
                              $fill="--basic-grade5"
                              width={"16px"}
                              height={"16px"}
                            >
                              <Close />
                            </SvgContainer>
                          </>
                        ) : (
                          <>{seat.label}</>
                        )}
                      </SeatCell>
                    </>
                  ))}
                </SeatRow>
              ))}
            </SeatGrid>
          </SeatBox>
        </LeftSection>
        <RightSection>
          <Col>
            <Row>
              <Option>
                <Row gap={"16px"}>
                  <Col gap={"8px"}>
                    <Body $color={"--basic-grade8"} $strong>
                      남자
                    </Body>
                    <Body $color={"--basic-grade5"}>남자</Body>
                  </Col>
                  <Radio />
                </Row>
              </Option>
            </Row>
          </Col>
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
`;

const SeatGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeatRow = styled.div`
  display: flex;
`;

const SeatCell = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  margin: 2px;
  cursor: ${({ isHeader, status }) =>
    isHeader || status === "unavailable" ? "default" : "pointer"};
  background-color: ${({ status, isHeader }) => {
    if (isHeader) return "transparent";
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

const Label = styled.label`
  font-size: 14px;
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

const Option = styled.div`
  background-color: var(--basic-grade2);
  border-radius: 12px;
  padding: 20px;
`;
export default Seats;
