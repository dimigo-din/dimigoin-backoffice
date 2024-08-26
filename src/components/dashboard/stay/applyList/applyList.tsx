"use client";
import {Heading, Body, SvgContainer, Col, Caption, Label} from "@/components/atomic";
import { Button } from "antd";
import { Row } from "@/components/atomic";
import { styled } from "styled-components";
import Download from "@material-symbols/svg-300/rounded/download.svg";
import DataList from "./dataList";
import { useEffect, useState } from "react";
import { downloadStay, getStay } from "@/lib/api/stay";
import { Application } from "@/lib/types/stay";
import {Text} from "domelementtype";
export type GradeType = "전체" | "1학년" | "2학년" | "3학년";

const ApplyList = ({ applications }: { applications: Application[] }) => {
  const [grade, setGrade] = useState<GradeType>("전체");

  const filteredApplications = applications.filter((app: Application) => {
    if (grade === "전체") return true;
    const gradeNumber = parseInt(grade);
    return app.student.grade === gradeNumber;
  });
  const handleDownload = () => {
    if (grade === "전체") {
      downloadStay({ grade: "1" });
      downloadStay({ grade: "2" });
      downloadStay({ grade: "3" });
      return;
    }
    downloadStay({ grade: grade[0] });
  };
  return (
    <Container>
      <Col $fullh>
        <Col padding={"20px 28px"} gap={"8px"}>
          <Row $fullw justify={"space-between"} align={"center"}>
            <Heading $strong color={"--basic-grade9"}>
              신청자 목록
              <Label style={{color: "gray"}}>
                &nbsp;&nbsp;이름을 클릭하시면 잔류를 취소시킬 수 있습니다.
              </Label>
            </Heading>
            <Button
              size="large"
              style={{
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#F6F7FA",
              }}
              onClick={handleDownload}
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
            {(["전체", "1학년", "2학년", "3학년"] as const).map((elm) => (
              <Body
                key={elm}
                style={{ cursor: "pointer" }}
                $color={
                  grade === elm ? "--core-status-accent" : "--basic-grade6"
                }
                onClick={() => {
                  setGrade(elm);
                }}
              >
                {elm}
              </Body>
            ))}
          </Row>
        </Col>
        <ScrollableDataList>
          <DataList applications={filteredApplications} />
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
