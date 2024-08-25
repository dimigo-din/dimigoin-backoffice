import { Body, Col, SvgContainer } from "@/components/atomic";
import { Row } from "@/components/atomic";
import styled from "styled-components";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import Arrow from "@material-symbols/svg-300/rounded/chevron_right.svg";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { editWasherTimeTable } from "@/lib/api/laundry";
import { toast } from "react-toastify";
import { washerTimetableType, washerType } from "@/lib/types/laundry";

interface TimeTableOptionComponentProps {
  name: string;
  data: washerTimetableType;
  washer: washerType;
  onEdit?: (editedTimetable: washerTimetableType) => void;
  isNew?: boolean;
}

export default function TimeTableOptionComponent({
  name,
  data,
  washer,
  onEdit,
  isNew = false,
}: TimeTableOptionComponentProps) {
  const [selectedType, setSelectedType] = useState<
    "평일 시간표" | "잔류 시간표"
  >(data.type ? "잔류 시간표" : "평일 시간표");
  const [open, setOpen] = useState<boolean>(isNew);
  const [timetable, setTimeTable] = useState<(string | null)[]>(data.sequence);
  useEffect(() => {
    if (isNew) {
      setTimeTable([null]);
    }
  }, [isNew]);

  const handleEditTimeTable = () => {
    if (timetable.some((time) => time === null)) {
      toast.error("모든 시간을 입력해주세요.");
      return;
    }

    const validTimetable = timetable.filter(
      (time): time is string => time !== null
    );

    const updatedTimetable: washerTimetableType = {
      ...data,
      sequence: validTimetable,
      type: selectedType === "잔류 시간표" ? 1 : 0,
    };

    editWasherTimeTable({
      laundryId: washer._doc._id,
      sequence: validTimetable,
      gender: washer._doc.gender,
      type: updatedTimetable.type,
      grade: data.grade,
    })
      .then((res) => {
        toast.success("시간표가 수정되었습니다.");
        if (onEdit) {
          onEdit(updatedTimetable);
        }
      })
      .catch((error) => {
        toast.error("시간표 수정 중 오류가 발생했습니다.");
      });
  };

  const handleAddTime = () => {
    setTimeTable([...timetable, null]);
  };

  const handleTimeChange = (time: Dayjs | null, index: number) => {
    const newTimetable = [...timetable];
    newTimetable[index] = time ? time.format("HH:mm") : null;
    setTimeTable(newTimetable);
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
                <Body $color={"--basic-grade5"}>시간표 목록</Body>
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
              {timetable.map((time, index) => (
                <Row gap={"20px"} align={"center"} key={index}>
                  <FixedWidthLabel>
                    <Body $color={"--basic-grade7"} $noShrink>
                      {`${index + 1}타임`}
                    </Body>
                  </FixedWidthLabel>
                  <TimePicker
                    value={time ? dayjs(time, "HH:mm") : null}
                    onChange={(time) => handleTimeChange(time, index)}
                    format="HH:mm"
                  />
                </Row>
              ))}
            </Col>
            <Row justify={"flex-end"}>
              <AccentBtn onClick={handleEditTimeTable}>
                <Body $color={"--basic-grade1"}>저장</Body>
              </AccentBtn>
            </Row>
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

const AccentBtn = styled(Button)`
  background-color: var(--core-status-accent) !important;
  border-radius: 12px !important;
  border: none;
  padding: 16px 0;
  height: 44px;

  &:hover {
    background-color: var(--core-status-accent_translucent) !important;
  }
`;
