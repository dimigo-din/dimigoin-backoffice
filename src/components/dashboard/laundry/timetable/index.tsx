import Add from "@material-symbols/svg-300/rounded/add.svg";
import { Heading, Body, SvgContainer, Row, Col } from "@/components/atomic";
import { Button, Input, Switch } from "antd";
import { styled } from "styled-components";
import TimeTableOptionComponent from "./timetableOption";
import { washerType } from "@/lib/types/laundry";

interface TimeTableProps {
  selectedWasher: washerType | null;
}

export default function TimeTable({ selectedWasher }: TimeTableProps) {
  return (
    <>
      <Container>
        <Row
          $fullw
          justify={"space-between"}
          align={"center"}
          padding={"4px 28px 0px 28px"}
          height={"80px"}
        >
          <Heading $strong color={"--basic-grade9"}>
            시간표 관리
          </Heading>

          {/* <Button
            size="large"
            style={{
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#F6F7FA",
            }}
          >
            <Row align={"center"} gap={"4px"}>
              <Body $color={"--basic-grade7"}>시간표 추가</Body>
              <SvgContainer $fill={"--basic-grade7"}>
                <Add />
              </SvgContainer>
            </Row>
          </Button> */}
        </Row>
        <ScrollableContent>
          {selectedWasher ? (
            <Col gap={"16px"}>
              {selectedWasher.timetable.map((elm, idx) => (
                <TimeTableOptionComponent
                  key={idx}
                  washer={selectedWasher}
                  data={elm}
                  name="시간표"
                />
              ))}

              {/* <TimeTableOptionComponent name="시간표 2" /> */}
            </Col>
          ) : (
            <NoWasherSelected>
              <Body $color={"--basic-grade5"}>선택된 세탁기가 없습니다.</Body>
            </NoWasherSelected>
          )}
        </ScrollableContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const NoWasherSelected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
