"use client";
import { Row, Col, Body } from "@/components/atomic";
import ApplyOuting from "@/components/dashboard/stay/add/ApplyOuting";
import ApplyPeriod from "@/components/dashboard/stay/add/ApplyPeriod";
import SetSeat from "@/components/dashboard/stay/add/SetSeat";
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
      F1: [],
      F2: [],
      F3: [],
      M1: [],
      M2: [],
      M3: [],
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
          <SetSeat onChange={handleSetSeatChange} />
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
