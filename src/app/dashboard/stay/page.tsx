"use client";
import { Col, Row } from "@/components/atomic";
import ApplyList from "@/components/dashboard/stay/applyList/applyList";
import Seats from "@/components/dashboard/stay/Seats";
import StayList from "@/components/dashboard/stay/stayList";
import styled from "styled-components";

export default function Stay() {
  return (
    <Container>
      <EqualHeightSection>
        <StayList />
        <ApplyList />
      </EqualHeightSection>
      <EqualHeightSection>
        <Seats />
      </EqualHeightSection>
    </Container>
  );
}

const Container = styled(Col)`
  gap: 16px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const EqualHeightSection = styled(Row)`
  gap: 16px;
  width: 100%;
  flex: 1;
  min-height: 0;
`;
