"use client";
import Sidebar from "@/components/Home/Sidebar";
import { Col } from "@/components/atomic";
import Indicator from "@/components/dashboard/indicator";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        maxWidth: "80vw",
        minHeight: "100vh",
        margin: "auto",
      }}
    >
      <Sidebar />
      <Col style={{ flex: 1, height: "100vh" }} padding={"24px 0"}>
        <Indicator />
        {children}
      </Col>
    </div>
  );
}
