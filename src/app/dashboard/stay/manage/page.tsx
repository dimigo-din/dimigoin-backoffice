"use client";
import { Col, Row } from "@/components/atomic/index";
import StayManage from "@/components/dashboard/stay/manage/stayManage";

export default function Manage() {
  return (
    <>
      <Col $fullw gap={"16px"}>
        <Row>
          <StayManage />
        </Row>
      </Col>
    </>
  );
}
