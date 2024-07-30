"use client";

import React from "react";
import styled from "styled-components";
import { Body, Col, Label, Row } from "../atomic";
import Image from "next/image";
import Logout from "@material-symbols/svg-300/outlined/logout-fill.svg";
import { Home, Run } from "../icons";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
            <Row $fullw align={"center"}>
              <Col gap={"4px"} align="start" $fullw>
                <Label color={"--basic-grade7"}>선생님/학생</Label>
                <Body $strong>김디미</Body>
              </Col>
              <Image src={Logout} alt="로그아웃" width={20} height={20} />
            </Row>
            <Col $fullw gap={"12px"}>
              <Link href={"/dashboard"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <Home $activated={pathname === "/dashboard"} />
                    <Label
                      $color={
                        pathname === "/dashboard"
                          ? "--core-status-accent"
                          : "--basic-grade7"
                      }
                    >
                      홈
                    </Label>
                  </Row>
                </Button>
              </Link>
              <Link href={"/dashboard/stay"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <Run $activated={pathname === "/dashboard/stay"} />
                    <Label
                      $color={
                        pathname === "/dashboard/stay"
                          ? "--core-status-accent"
                          : "--basic-grade7"
                      }
                    >
                      잔류 관리
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
