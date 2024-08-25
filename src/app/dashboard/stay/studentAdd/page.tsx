"use client";

import { Row, Title } from "@/components/atomic";
import Add from "@/components/dashboard/studentAdd/Add";
import OutingAdd from "@/components/dashboard/studentAdd/OutingAdd";
import { useState } from "react";

export default function StudentAdd() {
  const [mode, setMode] = useState(0);
  return (
    <>
      <Row gap={"16px"}>
        <Title
          onClick={() => setMode(0)}
          $color={
            mode === 0 ? "--core-status-accent" : "--content-standard-primary"
          }
          style={{ cursor: "pointer" }}
        >
          추가
        </Title>
        <Title
          onClick={() => setMode(1)}
          $color={
            mode === 1 ? "--core-status-accent" : "--content-standard-primary"
          }
          style={{ cursor: "pointer" }}
        >
          외출 추가
        </Title>
      </Row>
      {mode === 0 ? <Add /> : <OutingAdd />}
    </>
  );
}
