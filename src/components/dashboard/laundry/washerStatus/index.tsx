import { Heading, Body, Row, Col } from "@/components/atomic";
import {
  deleteAllWasherApplication,
  getCurrentWasher,
} from "@/lib/api/laundry";
import {
  currentWasherType,
  washerType,
  washerTimetableType,
  washerApplication,
} from "@/lib/types/laundry";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

function getWasherName(
  gender: "M" | "F",
  floor: number,
  position: "L" | "M" | "R" | "-"
): string {
  return `${gender === "M" ? "학봉관" : "우정학사"} ${
    floor >= 10 ? floor - 10 : floor
  }층 ${
    position === "L"
      ? "왼쪽"
      : position === "M"
      ? "가운데"
      : position === "R"
      ? "오른쪽"
      : position === "-"
      ? "중앙"
      : ""
  } ${floor >= 10 ? "건조기" : "세탁기"}`;
}

export default function WasherStatus() {
  const [currentWasher, setCurrentWasher] = useState<currentWasherType | null>(
    null
  );

  useEffect(() => {
    const getWasher = () => {
      getCurrentWasher().then((res: currentWasherType) => {
        setCurrentWasher(res);
        console.log(res);
      });
    };
    getWasher();
    const int = setInterval(() => getWasher(), 10000);
    return () => clearInterval(int);
  }, []);

  const handleDeleteAll = () => {
    deleteAllWasherApplication().then((res) => {
      toast.success("모든 신청이 삭제되었습니다.");
    });
  };
  if (!currentWasher) {
    return null; // 데이터를 불러오는 중이거나 데이터가 없는 경우 렌더링하지 않음
  }

  return (
    <StatusContainer>
      <Row
        $fullw
        justify="space-between"
        align="center"
        padding="4px 28px 0px 28px"
        height="80px"
      >
        <Heading $strong color="--basic-grade9">
          세탁 신청 현황
        </Heading>
        <AccentBtn onClick={() => handleDeleteAll()}>
          <Body $color={"--basic-grade1"}>모든 예약 초기화</Body>
        </AccentBtn>
      </Row>
      <ScrollableContent>
        <Col gap="24px">
          {currentWasher.timetables.map((timetable: washerTimetableType) => {
            const selectedApplications = currentWasher.applications.filter(
              (app) => app.timetable._id === timetable._id
            );
            return (
              <StatusGroup key={timetable._id}>
                <StatusTitle>
                  {getWasherName(
                    timetable.gender,
                    timetable.laundry.floor,
                    timetable.laundry.position
                  )}
                </StatusTitle>
                <StatusGrid>
                  {timetable.sequence.map((time, index) => {
                    const selectedApp = selectedApplications.find(
                      (app) => app.timetable.sequence[app.time] === time
                    );
                    return (
                      <StatusItem
                        key={index}
                        $selected={!!selectedApp}
                        style={{
                          backgroundColor: selectedApp
                            ? "var(--component-fill-standard-primary)"
                            : "var(--basic-grade2)",
                        }}
                      >
                        <Row justify="space-between">
                          <Body $color="--basic-grade6">{index + 1}타임</Body>
                          <Body $color="--basic-grade6">{time}</Body>
                        </Row>
                        {selectedApp && (
                          <Body $color="--basic-grade8">
                            {selectedApp.student.name}
                          </Body>
                        )}
                      </StatusItem>
                    );
                  })}
                </StatusGrid>
              </StatusGroup>
            );
          })}
        </Col>
      </ScrollableContent>
    </StatusContainer>
  );
}

const StatusContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0px 24px 24px 24px;
`;

const StatusGroup = styled(Col).attrs({
  gap: "12px",
})``;

const StatusTitle = styled(Body).attrs({
  $color: "--basic-grade7",
  $strong: true,
})``;

const StatusGrid = styled(Row).attrs({
  gap: "12px",
})`
  flex-wrap: wrap;
`;

const StatusItem = styled(Col).attrs({
  gap: "4px",
  padding: "12px",
})<{ $selected?: boolean }>`
  background-color: ${(props) =>
    props.$selected
      ? "var(--basic-grade2)"
      : "var(--component-fill-standard-primary)"};
  border: ${(props) => props.$selected && "1px solid var(--line-outline)"};
  border-radius: 8px;
  width: calc(20% - 9.6px);
`;
const AccentBtn = styled(Button)`
  background-color: var(--core-status-accent) !important;
  border-radius: 12px !important;
  border: none;
  padding: 16px 0;
  height: 44px;

  &:hover {
    background-color: var(--core-status-accent_translucent) !important;
  }
`;
