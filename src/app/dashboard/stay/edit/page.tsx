"use client";
import { Row, Col, Body } from "@/components/atomic";
import ApplyOuting from "@/components/dashboard/stay/edit/ApplyOuting";
import ApplyPeriod from "@/components/dashboard/stay/edit/ApplyPeriod";
import SetSeat from "@/components/dashboard/stay/edit/SetSeat";
import StayPeriod from "@/components/dashboard/stay/edit/StayPeriod";
import { Button } from "antd";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { editStay, getStayById } from "@/lib/api/stay";
import { useRouter, useSearchParams } from "next/navigation";
import { currentStayType, seatType, stayType } from "@/lib/types/stay";
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

export default function Edit() {
  const searchParams = useSearchParams();

  const stayId = searchParams.get("stayId");

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

  useEffect(() => {
    if (stayId) {
      getStayById({ id: stayId }).then((res: currentStayType) => {
        setStayData({
          duration: res.stay.duration,
          start: res.stay.start,
          end: res.stay.end,
          dates: res.stay.dates,
          seat: res.stay.seat,
        });
      });
    }
  }, [stayId]);

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

  const handleEditStay = () => {
    if (stayId) {
      editStay(stayData, stayId as string)
        .then((res: any) => {
          toast.success("잔류가 수정되었습니다.");
          window.location.href = "/dashboard/stay";
        })
        .catch((error: any) => {
          console.error("Error editing stay:", error);
          // 여기에 에러 처리 로직을 추가할 수 있습니다.
        });
    }
  };

  return (
    <>
      <Container>
        <Col $fullw gap={"16px"}>
          <Row $fullw $flexAll gap={"16px"}>
            <Col gap={"16px"}>
              <StayPeriod
                onChange={handleStayPeriodChange}
                initialStart={stayData.start}
                initialEnd={stayData.end}
              />
              <ApplyPeriod
                onChange={handleApplyPeriodChange}
                initialDurations={stayData.duration}
              />
            </Col>
            <ApplyOuting
              onChange={handleApplyOutingChange}
              initialDates={stayData.dates}
            />
          </Row>
          <SetSeat
            onChange={handleSetSeatChange}
            initialSeats={stayData.seat}
          />
          <WhiteBox>
            <Button style={{ width: "100%" }} onClick={handleEditStay}>
              <Body $color={"--basic-grade1"}>수정하기</Body>
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
