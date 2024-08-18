"use client";
import { Heading, Body, SvgContainer, Col } from "@/components/atomic";
import { Button } from "antd";
import { Row } from "@/components/atomic";
import { styled } from "styled-components";
import Download from "@material-symbols/svg-300/rounded/download.svg";
import DataList from "./dataList";
import { useEffect, useState } from "react";
import { gradeType } from "@/lib/types/student";
import { getStayApplication } from "@/lib/api/stay";

const ApplyList = () => {
  const [grade, setGrade] = useState<gradeType>("전체");

  useEffect(() => {
    getStayApplication().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <Container>
      <Col $fullh>
        <Col padding={"20px 28px"} gap={"8px"}>
          <Row $fullw justify={"space-between"} align={"center"}>
            <Heading $strong color={"--basic-grade9"}>
              신청자 목록
            </Heading>
            <Button
              size="large"
              style={{
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#F6F7FA",
              }}
            >
              <Row align={"center"} gap={"4px"}>
                <Body $color={"--basic-grade7"}>다운로드</Body>
                <SvgContainer $fill={"--basic-grade7"}>
                  <Download />
                </SvgContainer>
              </Row>
            </Button>
          </Row>
          <Row gap={"20px"}>
            {["전체", "1학년", "2학년", "3학년"].map((elm: string) => (
              <Body
                key={elm}
                style={{ cursor: "pointer" }}
                $color={
                  grade === elm ? "--core-status-accent" : "--basic-grade6"
                }
                onClick={() => {
                  setGrade(elm as gradeType);
                }}
              >
                {elm}
              </Body>
            ))}
          </Row>
        </Col>
        <ScrollableDataList>
          <DataList />
        </ScrollableDataList>
      </Col>
    </Container>
  );
};

export default ApplyList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ScrollableDataList = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  margin-bottom: 24px;
  border-radius: 12px;
`;
