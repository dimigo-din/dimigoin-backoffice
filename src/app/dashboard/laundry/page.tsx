"use client";
import { Col, Row } from "@/components/atomic";
import TimeTable from "@/components/dashboard/laundry/timetable";
import WasherList from "@/components/dashboard/laundry/washerList";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import WasherStatus from "@/components/dashboard/laundry/washerStatus";
import { getWasher } from "@/lib/api/laundry";
import { washerType } from "@/lib/types/laundry";

export default function Laundry() {
  const [selectedWasher, setSelectedWasher] = useState<washerType | null>(null);
  const [washers, setWashers] = useState<washerType[]>([]);

  useEffect(() => {
    getWasher().then((res) => {
      setWashers(res);
    });
  }, []);
  return (
    <>
      <Container>
        <EqualHeightSection>
          <WasherList
            washers={washers}
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
