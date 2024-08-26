import { getStayCurrent } from "@/lib/api/stay";
import { currentStayType, Application } from "@/lib/types/stay";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Close from "@material-symbols/svg-300/rounded/close.svg";
import { SvgContainer, FootNote } from "@/components/atomic/index";

interface SeatData {
  label: string;
  status: string;
  color?: string;
  student?: {
    _id: string;
    id: string;
    name: string;
  };
}

interface SingleSeatSelectProps {
  onChange: (seat: string | null) => void;
  initialSeat: string | null;
}

const getSeatColor = (gender: string, grade: number) => {
  const gradeColor =
    grade === 1
      ? "var(--solid-translucent-blue)"
      : grade === 2
      ? "var(--solid-blue)"
      : "var(--core-status-accent)";

  return gender === "M" ? gradeColor : "var(--solid-translucent-pink)";
};

const SingleSeatSelect: React.FC<SingleSeatSelectProps> = ({
  onChange,
  initialSeat,
}) => {
  const [seatData, setSeatData] = useState<SeatData[][]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(initialSeat);

  useEffect(() => {
    getStayCurrent().then((res: currentStayType) => {
      const initialSeatData = generateSeatData(res);
      setSeatData(initialSeatData);
    });
  }, []);

  const generateSeatData = (res: currentStayType): SeatData[][] => {
    const rows = 15;
    const cols = 19;
    const data: SeatData[][] = [];

    const occupiedSeats = new Set(res.applications.map((app) => app.seat));

    for (let i = 0; i < rows; i++) {
      const row: SeatData[] = [];
      for (let j = 0; j < cols + 1; j++) {
        if (i === 0 && j === 0) {
          row.push({ label: "#", status: "leftLabel" });
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
          const seatData: SeatData = {
            label: seatLabel,
            status: "unavailable",
          };

          for (const [gender, grades] of Object.entries(res.stay.seat)) {
            for (const [grade, seats] of Object.entries(grades)) {
              if (seats.includes(seatLabel)) {
                seatData.status = "available";
                seatData.color = getSeatColor(gender, parseInt(grade.slice(1)));
                break;
              }
            }
            if (seatData.status === "available") break;
          }

          const application = res.applications.find(
            (app) => app.seat === seatLabel
          );
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

          if (seatLabel === initialSeat) {
            seatData.status = "selected";
          }

          row.push(seatData);
        }
      }
      data.push(row);
    }

    return data;
  };

  const handleSeatClick = (rowIndex: number, colIndex: number): void => {
    if (rowIndex === 0 || colIndex === 0 || colIndex === 10) return;

    const currentSeat = seatData[rowIndex][colIndex];
    const currentSeatLabel = currentSeat.label;
    const currentSeatStatus = currentSeat.status;

    if (currentSeatStatus === "selected") {
      const newSeatData = seatData.map((row) =>
        row.map((seat) =>
          seat.label === currentSeatLabel
            ? { ...seat, status: "available" }
            : seat
        )
      );
      setSelectedSeat(null);
      setSeatData(newSeatData);
      onChange(null);
    } else if (currentSeatStatus === "available") {
      const newSeatData = seatData.map((row) =>
        row.map((seat) =>
          seat.status === "selected" ? { ...seat, status: "available" } : seat
        )
      );

      newSeatData[rowIndex][colIndex].status = "selected";
      setSelectedSeat(currentSeatLabel);
      setSeatData(newSeatData);
      onChange(currentSeatLabel);
    }
  };

  return (
    <Container>
      <SeatBox>
        <SeatGrid>
          {seatData.map((row, rowIndex) => (
            <SeatRow key={rowIndex}>
              {row.map((seat, colIndex) => (
                <SeatCell
                  key={`${rowIndex}-${colIndex}`}
                  status={seat.status}
                  color={seat.color}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                  isHeader={rowIndex === 0 || colIndex === 0}
                  isAisle={colIndex === 10}
                >
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
                        seat.status === "reserved" || seat.status === "selected"
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
                </SeatCell>
              ))}
            </SeatRow>
          ))}
        </SeatGrid>
      </SeatBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
`;

const SeatBox = styled.div`
  border-radius: 12px;
  border: 1px solid #ebecf5;
  padding: 20px;
  overflow-x: auto;

  text-overflow: clip;
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
  color?: string;
  isHeader: boolean;
  isAisle: boolean;
  onClick: () => void;
}

const SeatCell = styled.div<SeatCellProps>`
  width: 50px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-100);
  font-size: 12px;
  margin: var(--spacing-50);
  cursor: ${({ isHeader, status, isAisle }) =>
    isHeader || status === "unavailable" || status === "reserved" || isAisle
      ? "default"
      : "pointer"};
  background-color: ${({ status, color, isHeader, isAisle }) => {
    if (isHeader || isAisle) return "transparent";
    switch (status) {
      case "available":
        return color || "var(--basic-grade3)";
      case "selected":
        return "var(--core-status-accent)";
      case "reserved":
        return "var(--basic-grade6)";
      case "unavailable":
        return "transparent";
      default:
        return "var(--basic-grade3)";
    }
  }};
  color: ${({ status, isHeader }) => {
    if (isHeader) return "#333";
    switch (status) {
      case "available":
        return "var(--basic-grade7)";
      case "selected":
      case "reserved":
        return "var(--basic-grade1)";
      default:
        return "#333";
    }
  }};
  border: ${({ status }) =>
    status === "unavailable" ? "1px solid var(--basic-grade3)" : "none"};
  font-weight: ${({ isHeader }) => (isHeader ? "bold" : "normal")};
`;

export default SingleSeatSelect;
