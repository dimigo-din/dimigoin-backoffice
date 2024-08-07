"use client";

import React from "react";
import styled from "styled-components";
import { Body, Col, Label, Row, SvgContainer } from "../atomic";
import Image from "next/image";
import Logout from "@material-symbols/svg-300/rounded/logout-fill.svg";
import LocalLaundryService from "@material-symbols/svg-300/rounded/local_laundry_service.svg";
import Home from "@material-symbols/svg-300/rounded/home.svg";
import Run from "@material-symbols/svg-300/rounded/directions_run.svg";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getIconColor(pathname: string, key: string, exact?: boolean): string {
  return (exact ? pathname === "/" + key : pathname.includes("/" + key))
    ? "--core-status-accent"
    : "--basic-grade7";
}

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <Container>
        <Col $fullw gap={"24px"}>
          <Row $fullw padding={"24px 8px"} align={"center"}>
            <Image
              src={"/static/logo.svg"}
              alt="디미고인 로고"
              width={28}
              height={28}
            />
          </Row>
        </Col>
        <ListBox>
          <Col $fullw gap={"40px"}>
            <Row $fullw align={"center"} gap={"16px"}>
              <Col gap={"4px"} align="start" $fullw>
                <Label
                  color={"--basic-grade7"}
                  style={{ whiteSpace: "nowrap" }}
                >
                  선생님/학생
                </Label>
                <Body $strong>김디미</Body>
              </Col>
              <SvgContainer $fill={"--basic-grade6"}>
                <Logout />
              </SvgContainer>
            </Row>
            <Col $fullw gap={"12px"}>
              <Link href={"/dashboard"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <SvgContainer
                      $fill={getIconColor(pathname, "dashboard", true)}
                      width={"20px"}
                      height={"20px"}
                    >
                      <Home />
                    </SvgContainer>
                    <Label $color={getIconColor(pathname, "dashboard", true)}>
                      홈
                    </Label>
                  </Row>
                </Button>
              </Link>
              <Link href={"/dashboard/stay"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <SvgContainer
                      $fill={getIconColor(pathname, "stay")}
                      width={"20px"}
                      height={"20px"}
                    >
                      <Run />
                    </SvgContainer>
                    <Label $color={getIconColor(pathname, "stay")}>
                      잔류 관리
                    </Label>
                  </Row>
                </Button>
              </Link>
              <Link href={"/dashboard/laundry"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <SvgContainer
                      $fill={getIconColor(pathname, "laundry")}
                      width={"20px"}
                      height={"20px"}
                    >
                      <LocalLaundryService />
                    </SvgContainer>
                    <Label $color={getIconColor(pathname, "laundry")}>
                      세탁 관리
                    </Label>
                  </Row>
                </Button>
              </Link>
            </Col>
          </Col>
        </ListBox>
      </Container>
    </>
  );
};

const Container = styled(Col)`
  position: relative;
  width: 200px;
  height: 100vh;

  padding: var(--spacing-550) 0;
`;

const ListBox = styled.div`
  flex: 1;
  padding: 0 var(--spacing-600);
  padding-top: var(--spacing-750);
  border-radius: var(--radius-400);
  background-color: var(--component-fill-standard-primary);
`;

export default Sidebar;
