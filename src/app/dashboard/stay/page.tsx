"use client";
import { Col, Row } from "@/components/atomic";
import ApplyList from "@/components/dashboard/stay/applyList";
import StayList from "@/components/dashboard/stay/stayList";

export default function Stay() {
  return (
    <>
      <Col $flexAll>
        <Row gap={"16px"}>
          <StayList />
          <ApplyList />
        </Row>
      </Col>
    </>
  );
}
