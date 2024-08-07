import { Body, Col, SvgContainer } from "@/components/atomic";
import { Row } from "@/components/atomic";
import styled from "styled-components";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import Arrow from "@material-symbols/svg-300/rounded/chevron_right.svg";
import Schedule from "@material-symbols/svg-300/rounded/schedule.svg";
import React, { useState } from "react";
import { Checkbox, Input, Switch } from "antd";
import { SwitchClickEventHandler } from "antd/es/switch";

export default function TimeTableOptionComponent({ name }: { name: string }) {
  const [selectedType, setSelectedType] = useState<
    "잔류 시간표" | "평일 시간표"
  >("잔류 시간표");
  const [open, setOpen] = useState<boolean>(false);
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
          <div onClick={(e) => e.stopPropagation()}>
            <Switch />
          </div>

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
                <Row gap={"4px"} align={"center"}>
                  <Body $color={"--basic-grade7"}>타임 추가</Body>
                  <SvgContainer $fill={"--basic-grade7"}>
                    <Add />
                  </SvgContainer>
                </Row>
              </Row>
              <Row gap={"20px"} align={"center"}>
                <Body $color={"--basic-grade7"} $noShrink>
                  1타임
                </Body>
                <InputWithIcon>
                  <Input
                    placeholder="시작 일시"
                    style={{ paddingRight: "40px" }}
                  />
                  <IconWrapper>
                    <SvgContainer $fill={"--basic-grade5"}>
                      <Schedule />
                    </SvgContainer>
                  </IconWrapper>
                </InputWithIcon>
              </Row>
              <Row gap={"20px"} align={"center"}>
                <Body $color={"--basic-grade7"} $noShrink>
                  2타임
                </Body>
                <InputWithIcon>
                  <Input
                    placeholder="시작 일시"
                    style={{ paddingRight: "40px" }}
                  />
                  <IconWrapper>
                    <SvgContainer $fill={"--basic-grade5"}>
                      <Schedule />
                    </SvgContainer>
                  </IconWrapper>
                </InputWithIcon>
              </Row>
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

const InputWithIcon = styled.div`
  position: relative;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;
