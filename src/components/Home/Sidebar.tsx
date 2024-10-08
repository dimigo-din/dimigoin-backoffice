"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Body, Col, Label, Row, SvgContainer } from "../atomic";
import Image from "next/image";
import Logout from "@material-symbols/svg-300/rounded/logout-fill.svg";
import LocalLaundryService from "@material-symbols/svg-300/rounded/local_laundry_service.svg";
import Run from "@material-symbols/svg-300/rounded/directions_run.svg";
import Bed from "@material-symbols/svg-300/rounded/bed-fill.svg";
import Sprint from "@material-symbols/svg-300/rounded/sprint.svg";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/api/auth";
import { getCookie } from "@/lib/api/cookie";
import { student } from "@/lib/types/student";
function parseJwt(token: string): student {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
function getIconColor(pathname: string, key: string, exact?: boolean): string {
  return (exact ? pathname === "/" + key : pathname.split("/").includes(key))
    ? "--core-status-accent"
    : "--basic-grade7";
}

const Sidebar = () => {
  const pathname = usePathname();
  const [profile, setProfile] = useState<student | null>(null);
  useEffect(() => {
    const jwt = getCookie("jwt");
    setProfile(parseJwt(jwt));
  }, []);
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
                  선생님
                </Label>
                <Body $strong>{profile?.name}</Body>
              </Col>
              <SvgContainer
                $fill={"--basic-grade6"}
                onClick={() => logout()}
                style={{ cursor: "pointer" }}
              >
                <Logout />
              </SvgContainer>
            </Row>
            <Col $fullw gap={"12px"}>
              {/* <Link href={"/dashboard"}>
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
              </Link> */}
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
              <Link href={"/dashboard/fridayOuting"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <SvgContainer
                      $fill={getIconColor(pathname, "fridayOuting")}
                      width={"20px"}
                      height={"20px"}
                    >
                      <Bed />
                    </SvgContainer>
                    <Label $color={getIconColor(pathname, "fridayOuting")}>
                      금요귀가 관리
                    </Label>
                  </Row>
                </Button>
              </Link>
              <Link href={"/dashboard/stayOuting"}>
                <Button style={{ border: "none", width: "100%", padding: 0 }}>
                  <Row $fullw gap={"12px"}>
                    <SvgContainer
                      $fill={getIconColor(pathname, "stayOuting")}
                      width={"20px"}
                      height={"20px"}
                    >
                      <Sprint />
                    </SvgContainer>
                    <Label $color={getIconColor(pathname, "stayOuting")}>
                      잔류외출 관리
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
