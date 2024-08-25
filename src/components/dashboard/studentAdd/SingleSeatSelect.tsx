import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface SeatData {
  label: string;
  status: string;
}

interface SingleSeatSelectProps {
  onChange: (seat: string | null) => void;
  initialSeat: string | null;
}

const SingleSeatSelect: React.FC<SingleSeatSelectProps> = ({
  onChange,
  initialSeat,
}) => {
  const [seatData, setSeatData] = useState<SeatData[][]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(initialSeat);

  useEffect(() => {
    const initialSeatData = generateSeatData();
    if (initialSeat) {
      applyInitialSeat(initialSeatData, initialSeat);
    }
    setSeatData(initialSeatData);
  }, [initialSeat]);

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

  const applyInitialSeat = (seatData: SeatData[][], initialSeat: string) => {
    const row = initialSeat.charCodeAt(0) - 64;
    const col = parseInt(initialSeat.slice(1));
    if (seatData[row] && seatData[row][col]) {
      seatData[row][col].status = "selected";
    }
  };
  const handleSeatClick = (rowIndex: number, colIndex: number): void => {
    // Skip header and aisle cells
    if (rowIndex === 0 || colIndex === 0 || colIndex === 10) return;

    const currentSeatLabel = `${String.fromCharCode(64 + rowIndex)}${colIndex}`;
    const currentSeatStatus = seatData[rowIndex][colIndex].status;

    // Check if the seat is currently selected
    if (currentSeatStatus === "selected") {
      // Deselect the seat
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
    } else {
      // Deselect previously selected seat if any
      const newSeatData = seatData.map((row) =>
        row.map((seat) =>
          seat.status === "selected" ? { ...seat, status: "available" } : seat
        )
      );

      // Select the new seat
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
      case "selected":
        return "#4a90e2";
      default:
        return "#e0e0e0";
    }
  }};
  color: ${({ status, isHeader }) => {
    if (isHeader) return "#333";
    switch (status) {
      case "available":
        return "#333";
      case "selected":
        return "#fff";
      default:
        return "#333";
    }
  }};
  font-weight: ${({ isHeader }) => (isHeader ? "bold" : "normal")};
`;

export default SingleSeatSelect;
