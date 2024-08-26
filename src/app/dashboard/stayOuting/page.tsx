"use client";
import {
  Body,
  Col,
  Row,
  Heading,
  SvgContainer,
} from "@/components/atomic/index";
import { currentStayType, Application, OutgoType } from "@/lib/types/stay";
import { Button, Switch } from "antd";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import RefreshOutlined from "@material-symbols/svg-300/rounded/refresh.svg";
import { getStayCurrent, decideStayOutgo } from "@/lib/api/stay";

type GradeType = "전체" | "1학년" | "2학년" | "3학년";

export default function StayOuting() {
  const [stayCurrent, setStayCurrent] = useState<currentStayType | null>(null);
  const [grade, setGrade] = useState<GradeType>("전체");
  const [refreshKey, setRefreshKey] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(10);
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const fetchStayCurrent = useCallback(async () => {
    const data = await getStayCurrent();

    const updatedData: currentStayType = {
      ...data,
      applications: data.applications.map((app) => ({
        ...app,
        outgo: app.outgo.map((outgo) =>
          outgo.free
            ? {
                ...outgo,
                reason: "자기계발 외출",
                duration: {
                  ...outgo.duration,
                  start: `${outgo.date} 10:20:00`,
                  end: `${outgo.date} 14:00:00`,
                },
              }
            : outgo
        ),
      })),
    };

    setStayCurrent(updatedData);
  }, []);

  useEffect(() => {
    fetchStayCurrent();
  }, [fetchStayCurrent]);

  const handleRefresh = useCallback(() => {
    fetchStayCurrent();
    setRefreshKey((prev) => prev + 1);
    setRemainingSeconds(10);
  }, [fetchStayCurrent]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (stayCurrent) {
      intervalId = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            handleRefresh();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [stayCurrent, handleRefresh]);

  const handleDecision = async (isApprove: boolean, stayOutGoId: string) => {
    try {
      await decideStayOutgo({ stayOutGoId, isApprove });
      await fetchStayCurrent(); // Refetch data after decision
    } catch (error) {
      console.error("Error making decision:", error);
    }
  };

  const filteredApplications =
    stayCurrent?.applications
      .filter((app) => {
        if (grade === "전체") return true;
        const gradeNumber = parseInt(grade);
        return app.student.grade === gradeNumber;
      })
      .filter((app) =>
        app.outgo.some((outgo) =>
          showOnlyPending ? outgo.status === "W" : true
        )
      )
      .filter((app) => app.outgo.length > 0) || [];

  const renderOutgoInfo = (outgo: OutgoType) => {
    const { duration, meal, reason, status } = outgo;
    const statusColor =
      status === "W"
        ? "--core-status-warning"
        : status === "A"
        ? "--solid-green"
        : "--solid-pink";

    return (
      <Col style={{ marginBottom: "8px" }}>
        {duration && (
          <Body $color="--content-standard-secondary">
            {`${duration.start} - ${duration.end}`}
          </Body>
        )}
        <Body $color="--content-standard-secondary">
          {`사유: ${reason || "미작성"}`}
        </Body>
        <Body $color={statusColor} $strong>
          {status === "W" ? "대기" : status === "A" ? "승인" : "반려"}
        </Body>
        <Row gap="8px">
          <MealText $active={meal.breakfast}>아침</MealText>
          <MealText $active={meal.lunch}>점심</MealText>
          <MealText $active={meal.dinner}>저녁</MealText>
        </Row>
        <Row gap="4px" style={{ marginTop: "4px" }}>
          <AccentBtn onClick={() => handleDecision(true, outgo._id)}>
            <Body $color="--basic-grade1">승인</Body>
          </AccentBtn>
          <RejectBtn onClick={() => handleDecision(false, outgo._id)}>
            <Body $color="--content-standard-primary">반려</Body>
          </RejectBtn>
        </Row>
      </Col>
    );
  };

  return (
    <Container>
      <HeaderWrapper>
        <Row justify="space-between" align="center" style={{ width: "100%" }}>
          <Heading $color="--content-standard-primary">
            {stayCurrent
              ? stayCurrent.stay.start
              : "현재 잔류 신청이 없습니다."}
          </Heading>
          {stayCurrent && (
            <Row gap="8px" align="center">
              <Body $color="--content-standard-secondary">
                {remainingSeconds}초
              </Body>
              <RefreshButton onClick={handleRefresh}>
                <SvgContainer $fill={"--basic-grade8"}>
                  <RefreshOutlined />
                </SvgContainer>
              </RefreshButton>
            </Row>
          )}
        </Row>
      </HeaderWrapper>
      <FilterContainer>
        <Row gap={"20px"} align="center">
          {(["전체", "1학년", "2학년", "3학년"] as const).map((elm) => (
            <FilterButton
              key={elm}
              onClick={() => setGrade(elm)}
              $active={grade === elm}
            >
              {elm}
            </FilterButton>
          ))}
          <Body $color="--content-standard-secondary">대기만 보기</Body>
          <Switch
            checked={showOnlyPending}
            onChange={() => setShowOnlyPending((prev) => !prev)}
          />
        </Row>
      </FilterContainer>
      <ScrollableContent>
        {filteredApplications.map((elm, index) => (
          <ApplicationWrapper key={elm._id}>
            <Row justify="space-between" style={{ marginBottom: "16px" }}>
              <Col>
                <Row gap="8px">
                  <Body $color="--content-standard-primary">
                    {`${elm.student?.grade}${elm.student?.class.toString()}${elm.student?.number.toString().padStart(2, "0")}`}
                  </Body>
                  <Body $color="--content-standard-primary">
                    {elm.student?.name}
                  </Body>
                </Row>
                {elm.student?.grade === 3 && (
                  <>
                    <Body $color="--content-standard-secondary">
                      좌석 : {elm.seat === "NONE" ? "미선택" : elm.seat}
                    </Body>
                  </>
                )}
              </Col>
              <Col align="flex-end">
                {elm.outgo.map((outgo, index) => (
                  <div key={outgo._id}>
                    {index > 0 && <OutgoDivider />}
                    {/* 외출 간에 분리선 추가 */}
                    {renderOutgoInfo(outgo)}
                  </div>
                ))}
              </Col>
            </Row>
            {index < filteredApplications.length - 1 && <ApplicationDivider />}
          </ApplicationWrapper>
        ))}
      </ScrollableContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
`;

const FilterContainer = styled.div`
  padding: 20px 24px;
  background-color: var(--component-fill-standard-primary);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) =>
    props.$active ? "var(--core-status-accent)" : "var(--basic-grade6)"};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 24px 24px;
`;

const RefreshButton = styled(Button)`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  flex-shrink: 0;
  height: 50px;
  padding: 24px 24px 48px;
`;

const MealText = styled(Body)<{ $active: boolean }>`
  color: ${(props) =>
    props.$active
      ? "var(--core-status-accent)"
      : "var(--content-standard-secondary)"};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const AccentBtn = styled(Button)`
  background-color: var(--core-status-accent) !important;
  border-radius: 8px;
`;

const RejectBtn = styled(Button)`
  background-color: var(--content-standard-primary);
  border: 2px solid var(--line-outline) !important;
  border-radius: 8px;
`;

const Divider = styled.div`
  border-bottom: 1px solid var(--line-outline);
  margin: 4px 0;
`;

const OutgoDivider = styled.div`
  border-bottom: 1px solid var(--line-outline);
  margin: 8px 0;
`;

const ApplicationDivider = styled.div`
  border-bottom: 2px solid var(--line-outline);
  margin: 16px 0;
`;

const ApplicationWrapper = styled.div`
  padding: 16px 0;
`;
