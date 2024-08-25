import React, { useEffect, useState } from "react";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import { Heading, Body, SvgContainer, Row, Col } from "@/components/atomic";
import { Button } from "antd";
import { styled } from "styled-components";
import TimeTableOptionComponent from "./timetableOption";
import { washerType, washerTimetableType } from "@/lib/types/laundry";

interface TimeTableProps {
  selectedWasher: washerType | null;
}

export default function TimeTable({ selectedWasher }: TimeTableProps) {
  const [isAddingTimetable, setIsAddingTimetable] = useState<boolean>(false);
  const [timetables, setTimetables] = useState<washerTimetableType[]>([]);
  useEffect(() => {
    setTimetables(selectedWasher?.timetable || []);
  }, [selectedWasher]);
  const handleAddTimetable = () => {
    setIsAddingTimetable(!isAddingTimetable);
    if (!isAddingTimetable && selectedWasher) {
      const newTimetable: washerTimetableType = {
        _id: `new-${Date.now()}`,
        gender: selectedWasher._doc.gender,
        grade: [],
        laundry: {
          _id: selectedWasher._doc._id,
          floor: selectedWasher._doc.floor,
          position: selectedWasher._doc.position,
          gender: selectedWasher._doc.gender,
        },
        sequence: [],
        type: 0,
      };
      setTimetables([...timetables, newTimetable]);
    }
  };

  const handleEditTimetable = (editedTimetable: washerTimetableType) => {
    const updatedTimetables = timetables.map((timetable) =>
      timetable._id === editedTimetable._id ? editedTimetable : timetable
    );
    setTimetables(updatedTimetables);
  };

  return (
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

        <Button
          size="large"
          style={{
            borderRadius: "20px",
            border: "none",
            backgroundColor: isAddingTimetable ? "#E6E8ED" : "#F6F7FA",
          }}
          onClick={handleAddTimetable}
        >
          <Row align={"center"} gap={"4px"}>
            <Body $color={"--basic-grade7"}>
              {isAddingTimetable ? "추가 취소" : "시간표 추가"}
            </Body>
            <SvgContainer $fill={"--basic-grade7"}>
              <Add />
            </SvgContainer>
          </Row>
        </Button>
      </Row>
      <ScrollableContent>
        {selectedWasher ? (
          <Col gap={"16px"}>
            {timetables.map((timetable, idx) => (
              <TimeTableOptionComponent
                key={timetable._id}
                washer={selectedWasher}
                data={timetable}
                name={`시간표 ${idx + 1}`}
                onEdit={handleEditTimetable}
              />
            ))}
          </Col>
        ) : (
          <NoWasherSelected>
            <Body $color={"--basic-grade5"}>선택된 세탁기가 없습니다.</Body>
          </NoWasherSelected>
        )}
      </ScrollableContent>
    </Container>
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
