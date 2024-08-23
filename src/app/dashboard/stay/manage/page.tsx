"use client";
import { Col, Row } from "@/components/atomic/index";
import OutingList from "@/components/dashboard/stay/manage/OutingList/OutingList";
import OutingManage from "@/components/dashboard/stay/manage/OutingManage";
import StayManage from "@/components/dashboard/stay/manage/stayManage";
import { getStudentByID } from "@/lib/api/student";
import { student } from "@/lib/types/student";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";

export default function Manage() {
  const student = useRef<student | null>(null);
  const params = useSearchParams();
  useEffect(() => {
    const studentID: string | null = params.get("studentID");
    if (studentID)
      getStudentByID({ id: studentID }).then((res) => {
        student.current = res;
        console.log(res);
      });
  }, [params]);
  return (
    <>
      <Container>
        <Col $fullw gap={"16px"} $fullh>
          <Row gap={"16px"}>
            <StayManage />
            <OutingList />
          </Row>
          <OutingManage />
        </Col>
      </Container>
    </>
  );
}

const Container = styled.div`
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
