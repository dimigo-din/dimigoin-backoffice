import React, { useEffect, useMemo, useState } from "react";
import {
  Heading,
  Body,
  Row,
  Circle,
  Col,
  FootNote,
  SvgContainer,
} from "@/components/atomic/index";
import Close from "@material-symbols/svg-300/rounded/close.svg";
import styled from "styled-components";
const generateSeatData = () => {
  const rows = 10;
  const cols = 20;
  const data = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols + 1; j++) {
      if (j === 0) {
        row.push({
          label: ["#", 1, 2, 3, 4, 5, 6, 7, 8, 9][i],
          status: "leftLabel",
        });
      } else if (i === 0) {
        row.push({
          label: [
            "",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
          ][j],
          status: "label",
        });
        continue;
      } else if (j === 10) {
        row.push({ label: "", status: "aisle" });
      } else if (Math.random() < 0.1) {
        row.push({ label: "", status: "unavailable" });
      } else if (Math.random() < 0.3) {
        row.push({ label: "1234\n조현우", status: "reserved" });
      } else {
        row.push({ label: "1", status: "available" });
      }
    }
    data.push(row);
  }

  return data;
};

const Seats = () => {
  const [seatData, setSeatData] = useState<any>([]);

  useEffect(() => {
    setSeatData(generateSeatData()); // For hydration data match
  }, []);
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
      <ScrollableContent>
        <ScrollableHorizontal>
          <SeatGrid>
            {seatData.map((row: any[], idx: any) => (
              <Row key={idx}>
                {row.map(
                  (seat: { status: string; label: any }, seatIdx: any) => (
                    <Seat key={`${idx}-${seatIdx}`} status={seat.status}>
                      {seat.status === "unavailable" ? (
                        <SvgContainer
                          $fill="--basic-grade5"
                          width={"24px"}
                          height={"24px"}
                        >
                          <Close />
                        </SvgContainer>
                      ) : (
                        <FootNote
                          $color={
                            seat.status === "reserved"
                              ? "--basic-grade1"
                              : "--basic-grade7"
                          }
                          style={{
                            letterSpacing: "-0.12px",
                            lineHeight: "14px",
                          }}
                        >
                          {seat.label}
                        </FootNote>
                      )}
                    </Seat>
                  )
                )}
              </Row>
            ))}
          </SeatGrid>
        </ScrollableHorizontal>
      </ScrollableContent>
    </Container>
  );
};

export default Seats;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
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

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 0px 32px;
  margin-bottom: 16px;
`;

const ScrollableHorizontal = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const SeatGrid = styled.div`
  display: inline-block;
  white-space: nowrap;
`;

const Seat = styled.div<{ status: string }>`
  display: inline-flex;
  width: 50px;
  height: 35px;
  margin: 2px;
  align-items: center;
  justify-content: ${(props: { status: string }) =>
    props.status === "leftLabel" ? "left" : "center"};
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props: { status: string }) =>
    props.status === "available"
      ? "var(--basic-grade3)"
      : props.status === "reserved"
      ? "var(--basic-grade6)"
      : "transparent"};
  border: ${(props: { status: string }) =>
    props.status === "unavailable" ? "1px solid var(--basic-grade3)" : "none"};
  white-space: pre-wrap;
  text-align: center;
`;
