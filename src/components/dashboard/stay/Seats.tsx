import React, { useEffect, useState } from "react";
import {
  Heading,
  Body,
  Row,
  Circle,
  FootNote,
  SvgContainer,
} from "@/components/atomic/index";
import Close from "@material-symbols/svg-300/rounded/close.svg";
import styled from "styled-components";
import Link from "next/link";
import { currentStayType, seatType, Application } from "@/lib/types/stay";

type SeatData = {
  label: string;
  status: string;
  color?: string;
  student?: {
    _id: string;
    id: string;
    name: string;
  };
};

const getSeatColor = (gender: string, grade: number) => {
  const genderColor = gender === "M" ? "blue" : "pink";
  const gradeColor =
    grade === 1
      ? "var(--solid-translucent-blue)"
      : grade === 2
      ? "var(--solid-blue)"
      : "var(--core-status-accent)";

  return gender === "M" ? gradeColor : "var(--solid-translucent-pink)";
};

const generateSeatData = (
  seatInfo: seatType,
  applications: Application[]
): SeatData[][] => {
  const rows = 15; // A부터 N까지 15행
  const cols = 19;
  const data: SeatData[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: SeatData[] = [];
    for (let j = 0; j < cols + 1; j++) {
      if (i === 0 && j === 0) {
        row.push({
          label: "#",
          status: "leftLabel",
        });
      } else if (i === 0) {
        row.push({
          label: [
            "",
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            "",
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
          ][j].toString(),
          status: "label",
        });
      } else if (j === 0) {
        row.push({
          label: [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
          ][i - 1],
          status: "leftLabel",
        });
      } else if (j === 10) {
        row.push({ label: "", status: "aisle" });
      } else {
        const seatLabel = `${
          [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
          ][i - 1]
        }${j > 10 ? j - 1 : j}`;
        const seatData: SeatData = { label: seatLabel, status: "unavailable" };

        for (const [gender, grades] of Object.entries(seatInfo)) {
          for (const [grade, seats] of Object.entries(grades)) {
            if (seats.includes(seatLabel)) {
              seatData.status = "available";
              seatData.color = getSeatColor(gender, parseInt(grade.slice(1)));
              break;
            }
          }
          if (seatData.status === "available") break;
        }

        const application = applications.find((app) => app.seat === seatLabel);
        if (application) {
          seatData.status = "reserved";
          seatData.color = "var(--basic-grade6)";
          seatData.student = {
            _id: application.student._id,
            id: `${
              application.student.grade
            }${application.student.class.toString()}${application.student.number
              .toString()
              .padStart(2, "0")}`,
            name: application.student.name,
          };
        }

        row.push(seatData);
      }
    }
    data.push(row);
  }

  return data;
};

const Seats = ({ data }: { data: currentStayType }) => {
  const [seatData, setSeatData] = useState<SeatData[][]>([]);

  useEffect(() => {
    setSeatData(generateSeatData(data.stay.seat, data.applications));
  }, [data]);

  return (
    <Container>
      <HeaderRow>
        <Heading $strong color={"--basic-grade9"}>
          잔류 좌석 현황
        </Heading>
        <LegendRow>
          <LegendItem>
            <Circle $color={"--solid-blue"} />
            <Body $color={"--basic-grade6"}>남학생</Body>
          </LegendItem>
          <LegendItem>
            <Circle $color={"--solid-pink"} />
            <Body $color={"--basic-grade6"}>여학생</Body>
          </LegendItem>
          <LegendItem>
            <Circle $color={"--basic-grade6"} />
            <Body $color={"--basic-grade6"}>예약된 좌석</Body>
          </LegendItem>
        </LegendRow>
      </HeaderRow>
      <ScrollableContent>
        <ScrollableHorizontal>
          <SeatGrid>
            {seatData.map((row, idx) => (
              <Row key={idx}>
                {row.map((seat, seatIdx) => (
                  <Link
                    href={
                      (seat.status === "reserved" &&
                        `/dashboard/stay/manage?studentID=${seat.student?._id}`) ||
                      ""
                    }
                    key={`${idx}-${seatIdx}`}
                  >
                    <Seat status={seat.status} color={seat.color}>
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
                          {seat.status === "reserved" && seat.student ? (
                            <>
                              {seat.student.id}
                              <br />
                              {seat.student.name}
                            </>
                          ) : (
                            seat.label
                          )}
                        </FootNote>
                      )}
                    </Seat>
                  </Link>
                ))}
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
  padding: var(--spacing-500) var(--spacing-550);
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const LegendRow = styled(Row)`
  gap: var(--spacing-400);
  align-items: center;
  flex-wrap: wrap;
`;

const LegendItem = styled(Row)`
  gap: var(--spacing-200);
  align-items: center;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--spacing-700) 0 var(--spacing-700);
  margin-bottom: var(--spacing-400);
`;

const ScrollableHorizontal = styled.div`
  overflow-x: auto;
  width: 100%;
  text-overflow: clip;
`;

const SeatGrid = styled.div`
  display: inline-block;
  white-space: nowrap;
`;

const Seat = styled.div<{ status: string; color?: string }>`
  display: inline-flex;
  width: 50px;
  height: 35px;
  margin: var(--spacing-50);
  align-items: center;
  justify-content: ${(props) =>
    props.status === "leftLabel" ? "left" : "center"};
  font-size: 12px;
  border-radius: var(--radius-100);
  cursor: pointer;
  background-color: ${(props) =>
    props.status === "available"
      ? props.color || "var(--basic-grade3)"
      : props.status === "reserved"
      ? "var(--basic-grade6)"
      : "transparent"};
  border: ${(props) =>
    props.status === "unavailable" ? "1px solid var(--basic-grade3)" : "none"};
  white-space: pre-wrap;
  text-align: center;
`;
