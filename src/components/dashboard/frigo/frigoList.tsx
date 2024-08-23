import {
  Body,
  Col,
  Row,
  Heading,
  SvgContainer,
} from "@/components/atomic/index";
import { currentFrigoType } from "@/lib/types/friday";
import { Button } from "antd";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import RefreshOutlined from "@material-symbols/svg-300/rounded/refresh.svg";

export default function FrigoList({
  data,
  refetch,
}: {
  data: currentFrigoType | null;
  refetch: () => void;
}) {
  const handleDecision = (ok: boolean, id: string) => {
    // TODO: reject or accept an application (no api yet)
  };

  const [refreshKey, setRefreshKey] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(10);

  const handleRefresh = useCallback(() => {
    refetch();
    setRefreshKey((prev) => prev + 1);
    setRemainingSeconds(10);
  }, [refetch]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (data) {
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
  }, [data, handleRefresh]);

  return (
    <Container>
      <HeaderWrapper>
        <Row justify="space-between" align="center" style={{ width: "100%" }}>
          <Heading $color="--content-standard-primary">
            {data ? data.frigo.date : "현재 금요귀가 신청이 없습니다."}
          </Heading>
          {data && (
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
      <ScrollableContent>
        {data &&
          data.applications.map((elm) => (
            <Row
              key={elm._id}
              justify="space-between"
              style={{ marginBottom: "8px" }}
            >
              <Row gap="8px">
                <Row gap="4px">
                  <Body $color="--content-standard-primary">
                    {`${elm.student?.grade}${
                      elm.student?.class
                    }${elm.student?.number.toString().padEnd(2, "0")}`}
                  </Body>
                  <Body $color="--content-standard-primary">
                    {elm.student?.name}
                  </Body>
                </Row>
                <Body $color="--content-standard-secondary">
                  {elm.reason}, {elm.status}
                </Body>
              </Row>
              <Row gap="4px">
                <AccentBtn onClick={() => handleDecision(true, elm._id)}>
                  <Body $color="--basic-grade1">허가</Body>
                </AccentBtn>
                <Button
                  onClick={() => handleDecision(false, elm._id)}
                  style={{ border: "1px solid var(--line-outline)" }}
                >
                  <Body>반려</Body>
                </Button>
              </Row>
            </Row>
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

const HeaderWrapper = styled.div`
  flex-shrink: 0;
  height: 50px;
  padding: 24px 24px 48px;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 24px 24px;
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

const RefreshButton = styled(Button)`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
