"use client";
import Sidebar from "@/components/Home/Sidebar";
import { Col } from "@/components/atomic";
import Indicator from "@/components/dashboard/indicator";
import { styled } from "styled-components";
import {Suspense} from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Sidebar />
      <Col
        style={{ flex: 1, height: "100vh", overflow: "hidden" }}
        padding={"24px 0"}
      >
        <Indicator />
          <Suspense>
              {children}
          </Suspense>
      </Col>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 24px;
  max-width: 80vw;
  min-height: 100vh;
  margin: auto;
`;
