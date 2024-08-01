"use client";
import { Row, Col } from "@/components/atomic";
import ApplyOuting from "@/components/dashboard/stay/add/ApplyOuting";
import ApplyPeriod from "@/components/dashboard/stay/add/ApplyPeriod";
import SetSeat from "@/components/dashboard/stay/add/SetSeat";
import StayPeriod from "@/components/dashboard/stay/add/StayPeriod";
import styled from "styled-components";

export default function Add() {
  return (
    <>
      <Container>
        <Col $fullw gap={"16px"}>
          <Row $fullw $flexAll gap={"16px"}>
            <Col gap={"16px"}>
              <StayPeriod />
              <ApplyPeriod />
            </Col>
            <ApplyOuting />
          </Row>
          <SetSeat />
        </Col>
      </Container>
    </>
  );
}

const Container = styled(Col)`
  gap: 16px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-clip: padding-box;
    border: #ebecf5;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
    border-radius: 10px;
  }
`;
