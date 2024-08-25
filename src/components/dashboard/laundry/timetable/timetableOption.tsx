import { Body, Col, SvgContainer } from "@/components/atomic";
import { Row } from "@/components/atomic";
import styled from "styled-components";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import Arrow from "@material-symbols/svg-300/rounded/chevron_right.svg";
import React, { useState } from "react";
import { Checkbox, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { editWasherTimeTable } from "@/lib/api/laundry";
import { toast } from "react-toastify";
import { washerTimetableType, washerType } from "@/lib/types/laundry";
// {
//   "laundryId": {},
//   "sequence": [
//     "string"
//   ],
//   "grade": 0,
//   "gender": "string",
//   "type": 0
// }
export default function TimeTableOptionComponent({
  name,
  data,
  washer,
}: {
  name: string;
  data: washerTimetableType;
  washer: washerType;
}) {
  const [selectedType, setSelectedType] = useState<
    "잔류 시간표" | "평일 시간표"
  >("잔류 시간표");
  const [open, setOpen] = useState<boolean>(false);
  const [timetable, setTimeTable] = useState<washerTimetableType>(data);

  const handleEditTimeTable = () => {
    // editWasherTimeTable({
    //   laundryId: data._id,
    //   sequence: timetable.sequence,
    // }).then((res) => {
    //   toast.success("시간표가 수정되었습니다.");
    // });
  };

  const handleAddTime = () => {
    // setTimeTable([...timetable, null]); // 새로운 타임을 추가합니다.
  };

  const handleTimeChange = (time: Dayjs | null, index: number) => {
    // const newTimetable = [...timetable];
    // newTimetable[index] = time;
    // setTimeTable(newTimetable);
  };

  return (
    <TimeTableContainer>
      <Row
        gap={"16px"}
        justify={"space-between"}
        padding={"20px"}
        style={{ cursor: "pointer" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Row gap={"16px"} align={"center"}>
          <Body $strong $color={"--basic-grade7"}>
            {name}
          </Body>
        </Row>
        <SvgContainer
          width={"20px"}
          height={"20px"}
          $fill={"--basic-grade7"}
          $rotate={open ? "90" : "180"}
        >
          <Arrow />
        </SvgContainer>
      </Row>
      {open && (
        <>
          <Col
            padding={"24px 20px 20px 20px"}
            gap={"24px"}
            style={{ borderTop: "1px solid var(--basic-grade3)" }}
          >
            <Col gap={"12px"}>
              <Body $color={"--basic-grade5"}>시간표 종류</Body>
              <Row gap={"20px"}>
                {["잔류 시간표", "평일 시간표"].map((value) => (
                  <Row gap={"8px"} key={value}>
                    <Checkbox
                      checked={selectedType === value}
                      onChange={() =>
                        setSelectedType(value as "잔류 시간표" | "평일 시간표")
                      }
                    />
                    <Body
                      $strong
                      $color={
                        selectedType === value
                          ? "--core-status-accent"
                          : "--basic-grade5"
                      }
                    >
                      {value}
                    </Body>
                  </Row>
                ))}
              </Row>
            </Col>
            <Col gap={"12px"}>
              <Row align={"center"} justify={"space-between"}>
                <Body $color={"--basic- grade5"}>시간표 목록</Body>
                <Row
                  gap={"4px"}
                  align={"center"}
                  onClick={handleAddTime}
                  style={{ cursor: "pointer" }}
                >
                  <Body $color={"--basic-grade7"}>타임 추가</Body>
                  <SvgContainer $fill={"--basic-grade7"}>
                    <Add />
                  </SvgContainer>
                </Row>
              </Row>
              {timetable.sequence.map((time, index) => (
                <Row gap={"20px"} align={"center"} key={index}>
                  <FixedWidthLabel>
                    <Body $color={"--basic-grade7"} $noShrink>
                      {`${index + 1}타임`}
                    </Body>
                  </FixedWidthLabel>
                  <TimePicker
                    value={dayjs(time)}
                    // onChange={(time, string) => handleTimeChange(string, index)}
                  />
                </Row>
              ))}
            </Col>
          </Col>
        </>
      )}
    </TimeTableContainer>
  );
}

const TimeTableContainer = styled.div`
  border-radius: 12px;
  background-color: var(--basic-grade2);
  overflow: auto;
`;

const FixedWidthLabel = styled.div`
  width: 40px;
  flex-shrink: 0;
`;
