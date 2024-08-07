"use client";
import { Col, Row } from "@/components/atomic";
import TimeTable from "@/components/dashboard/laundry/timetable";
import WasherList from "@/components/dashboard/laundry/washerList";
import { styled } from "styled-components";
import { useState } from "react";
import WasherStatus from "@/components/dashboard/laundry/washerStatus";

export default function Laundry() {
  const [selectedWasher, setSelectedWasher] = useState<string | null>(null);

  return (
    <>
      <Container>
        <EqualHeightSection>
          <WasherList
            selectedWasher={selectedWasher}
            setSelectedWasher={setSelectedWasher}
          />
          <TimeTable selectedWasher={selectedWasher} />
        </EqualHeightSection>
        <EqualHeightSection>
          <WasherStatus />
        </EqualHeightSection>
      </Container>
    </>
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
