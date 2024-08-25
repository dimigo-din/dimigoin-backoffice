import { Body, Col, SvgContainer } from "@/components/atomic";
import { Row } from "@/components/atomic";
import styled from "styled-components";
import Arrow from "@material-symbols/svg-300/rounded/chevron_right.svg";
import React, { useState } from "react";
import { Button, Checkbox } from "antd";
import { toast } from "react-toastify";
import { createWasher } from "@/lib/api/laundry";

type floorType = "2층" | "3층" | "4층" | "5층";
type locationType = "왼쪽" | "오른쪽" | "가운데" | "구분 없음";
export default function WasherAdd() {
  const [open, setOpen] = useState<boolean>(true);
  const [gender, setGender] = useState<"M" | "F">("M");
  const [floor, setFloor] = useState<floorType>("2층");
  const [location, setLocation] = useState<locationType>("왼쪽");

  const handleMadeWasher = () => {
    createWasher({
      gender,
      floor: +floor[0],
      position:
        location === "오른쪽"
          ? "R"
          : location === "가운데"
          ? "M"
          : location === "왼쪽"
          ? "L"
          : "-",
    }).then((res) => {
      toast.success("세탁기가 생성되었습니다.");
    });
  };
  return (
    <>
      <LaundryContainer>
        <Row
          gap={"12px"}
          justify={"space-between"}
          padding={"20px"}
          style={{ cursor: "pointer" }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Body $strong $color={"--basic-grade7"}>
            새로운 세탁기
          </Body>
          <SvgContainer
            width={"20px"}
            height={"20px"}
            $fill={"--basic-grade7"}
            $rotate={open ? "180" : "90"}
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
                <Body $color={"--basic-grade5"}>건물</Body>
                <Row gap={"20px"}>
                  <Row gap={"8px"}>
                    {["학봉관", "우정학사"].map((value) => (
                      <React.Fragment key={value}>
                        <Checkbox
                          checked={gender === value}
                          onClick={() => setGender(value as "M" | "F")}
                        />
                        <Body
                          $strong
                          $color={
                            gender === value
                              ? "--core-status-accent"
                              : "--basic-grade5"
                          }
                        >
                          {value}
                        </Body>
                      </React.Fragment>
                    ))}
                  </Row>
                </Row>
              </Col>
              <Col gap={"12px"}>
                <Body $color={"--basic-grade5"}>세탁기 층</Body>
                <Row gap={"20px"}>
                  <Row gap={"8px"}>
                    {["2층", "3층", "4층", "5층"].map((value) => (
                      <React.Fragment key={value}>
                        <Checkbox
                          checked={floor === value}
                          onClick={() => setFloor(value as floorType)}
                        />
                        <Body
                          $strong
                          $color={
                            floor === value
                              ? "--core-status-accent"
                              : "--basic-grade5"
                          }
                        >
                          {value}
                        </Body>
                      </React.Fragment>
                    ))}
                  </Row>
                </Row>
              </Col>
              <Col gap={"12px"}>
                <Body $color={"--basic-grade5"}>세탁기 위치</Body>
                <Row gap={"20px"}>
                  <Row gap={"8px"}>
                    {["왼쪽", "오른쪽", "가운데", "구분 없음"].map((value) => (
                      <React.Fragment key={value}>
                        <Checkbox
                          checked={location === value}
                          onClick={() => setLocation(value as locationType)}
                        />
                        <Body
                          $strong
                          $color={
                            location === value
                              ? "--core-status-accent"
                              : "--basic-grade5"
                          }
                        >
                          {value}
                        </Body>
                      </React.Fragment>
                    ))}
                  </Row>
                </Row>
              </Col>
              <Row $fullw $flexAll gap={"12px"}>
                {/* <Button
                  style={{
                    padding: "12px",
                    height: "42px",
                    backgroundColor: "var(--basic-grade3)",
                  }}
                >
                  <Body $strong $color={"--basic-grade8"}>
                    삭제
                  </Body>
                </Button> */}
                <Button
                  style={{
                    padding: "12px",
                    height: "42px",

                    backgroundColor: "var(--core-status-accent)",
                  }}
                  onClick={() => {
                    handleMadeWasher();
                  }}
                >
                  <Body $strong $color={"--basic-grade1"}>
                    생성
                  </Body>
                </Button>
              </Row>
            </Col>
          </>
        )}
      </LaundryContainer>
    </>
  );
}

const LaundryContainer = styled.div`
  border-radius: 12px;
  background-color: var(--basic-grade2);
  overflow: auto;
`;
