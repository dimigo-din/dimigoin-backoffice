import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/ReactToastify.css";
import StyledComponentsRegistry from "@/lib/registry";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "디미고인",
  description: "디미고인 백오피스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  Switch: {
                    colorPrimary: "#E83C77",
                    colorPrimaryHover: "#E83C77EE",
                  },
                },
              }}
            >
              <ToastContainer
                position="top-right" // 알람 위치 지정
                autoClose={2000} // 자동 off 시간
                hideProgressBar // 진행시간바 숨김
                closeOnClick // 클릭으로 알람 닫기
                rtl={false} // 알림 좌우 반전
                pauseOnFocusLoss // 화면을 벗어나면 알람 정지
                draggable // 드래그 가능
                pauseOnHover // 마우스를 올리면 알람 정지
                theme="light"
                toastStyle={{ borderRadius: "30px", height: "20px" }}
              />
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
