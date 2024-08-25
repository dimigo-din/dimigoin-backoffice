"use client";
import { Row, Col, Body } from "@/components/atomic";
import ApplyOuting from "@/components/dashboard/stay/add/ApplyOuting";
import ApplyPeriod from "@/components/dashboard/stay/add/ApplyPeriod";
import SetSeat from "@/components/dashboard/stay/edit/SetSeat";
import StayPeriod from "@/components/dashboard/stay/add/StayPeriod";
import { Button } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { makeStay } from "@/lib/api/stay";
import { seatType } from "@/lib/types/stay";
import { toast } from "react-toastify";

interface Duration {
  start: string;
  end: string;
}

interface Date {
  date: string;
  free: boolean;
}

interface StayData {
  duration: Duration[];
  start: string;
  end: string;
  dates: Date[];
  seat: seatType;
}

export default function Add() {
  const [stayData, setStayData] = useState<StayData>({
    duration: [],
    start: "",
    end: "",
    dates: [],
    seat: {
      _id: "",
      F1: ["A11",
        "A12",
        "A13",
        "A14",
        "A15",
        "A16",
        "A17",
        "A18",
        "B11",
        "B12",
        "B13",
        "B14",
        "B15",
        "B16",
        "B17",
        "B18",
        "C11",
        "C12",
        "C13",
        "C14",
        "C15",
        "C16",
        "C17",
        "C18"],
      F2: ["D11",
        "D12",
        "D13",
        "D14",
        "D15",
        "D16",
        "D17",
        "D18",
        "E11",
        "E12",
        "E13",
        "E14",
        "E15",
        "E16",
        "E17",
        "E18",
        "F11",
        "F12",
        "F13",
        "F14",
        "F15",
        "F16",
        "F17",
        "F18"],
      F3: ["G11",
        "G12",
        "G13",
        "G14",
        "G15",
        "G16",
        "G17",
        "G18",
        "H11",
        "H12",
        "H13",
        "H14",
        "H15",
        "H16",
        "H17",
        "H18"],
      M1: ["A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8"],
      M2: ["D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "E6",
        "E7",
        "E8",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8"],
      M3: ["G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "G8",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "H7",
        "H8",
        "I1",
        "I2",
        "I3",
        "I4",
        "I5",
        "I6",
        "I7",
        "I8"],
    },
  });

  const handleStayPeriodChange = (start: string, end: string) => {
    setStayData((prev) => ({ ...prev, start, end }));
  };

  const handleApplyPeriodChange = (duration: Duration[]) => {
    setStayData((prev) => ({ ...prev, duration }));
  };

  const handleApplyOutingChange = (dates: Date[]) => {
    setStayData((prev) => ({ ...prev, dates }));
  };

  const handleSetSeatChange = (seat: seatType) => {
    setStayData((prev) => ({ ...prev, seat }));
  };

  const handleAddStay = () => {
    makeStay(stayData)
      .then((res: any) => {
        toast.success("잔류가 추가되었습니다.");
        window.location.href = "/dashboard/stay";
      })
      .catch((error: any) => {
        console.error("Error adding stay:", error);
        // 여기에 에러 처리 로직을 추가할 수 있습니다.
      });
  };

  return (
    <>
      <Container>
        <Col $fullw gap={"16px"}>
          <Row $fullw $flexAll gap={"16px"}>
            <Col gap={"16px"}>
              <StayPeriod onChange={handleStayPeriodChange} />
              <ApplyPeriod onChange={handleApplyPeriodChange} />
            </Col>
            <ApplyOuting onChange={handleApplyOutingChange} />
          </Row>
          <SetSeat onChange={handleSetSeatChange} initialSeats={stayData.seat} />
          <WhiteBox>
            <Button style={{ width: "100%" }} onClick={handleAddStay}>
              <Body $color={"--basic-grade1"}>잔류 추가</Body>
            </Button>
          </WhiteBox>
        </Col>
      </Container>
    </>
  );
}
const Container = styled(Col)`
  gap: 16px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-clip: padding-box;
    border: #ebecf5;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
    border-radius: 10px;
  }
`;
const WhiteBox = styled.div`
  width: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  padding: 24px;

  & > button {
    background-color: var(--core-status-accent);
    border-radius: 12px !important;
    border: none;
    padding: 16px 0;
    height: 44px;
  }
  & > button:hover {
    background-color: var(--core-status-accent_translucent) !important;
  }
`;
