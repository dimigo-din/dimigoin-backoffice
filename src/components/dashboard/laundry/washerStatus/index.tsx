import { Heading, Body, Row, Col } from "@/components/atomic";
import styled from "styled-components";

export default function WasherStatus() {
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
      </Row>
      <ScrollableContent>
        <Col gap="24px">
          <StatusGroup>
            <StatusTitle>학봉관 2층 왼쪽</StatusTitle>
            <StatusGrid>
              {[1, 2, 3, 4, 5].map((time) => (
                <StatusItem key={time}>
                  <Row justify="space-between">
                    <Body $color="--basic-grade6">{time}타임</Body>
                    <Body $color="--basic-grade6">18:35</Body>
                  </Row>
                  <Body $color="--basic-grade8">6323 즙수민</Body>
                </StatusItem>
              ))}
            </StatusGrid>
          </StatusGroup>
          <StatusGroup>
            <StatusTitle>학봉관 2층 가운데</StatusTitle>
            <StatusGrid>
              {[1, 2, 3, 4, 5].map((time) => (
                <StatusItem key={time}>
                  <Row justify="space-between">
                    <Body $color="--basic-grade6">{time}타임</Body>
                    <Body $color="--basic-grade6">18:35</Body>
                  </Row>
                  <Body $color="--basic-grade8">5113 남궁주헌</Body>
                </StatusItem>
              ))}
            </StatusGrid>
          </StatusGroup>
          <StatusGroup>
            <StatusTitle>학봉관 2층 오른쪽</StatusTitle>
            <StatusGrid>
              {[1, 2, 3, 4, 5].map((time) => (
                <StatusItem key={time}>
                  <Row justify="space-between">
                    <Body $color="--basic-grade6">{time}타임</Body>
                    <Body $color="--basic-grade6">18:35</Body>
                  </Row>
                  <Body $color="--basic-grade8">4431 홀두혁</Body>
                </StatusItem>
              ))}
            </StatusGrid>
          </StatusGroup>
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
})`
  background-color: var(--basic-grade2);
  border-radius: 8px;
  width: calc(20% - 9.6px);
`;
