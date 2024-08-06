import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/ReactToastify.css";
import StyledComponentsRegistry from "@/lib/registry";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import moment from "moment";
import "moment/locale/ko";
import locale from "antd/lib/locale/ko_KR";

moment.locale("ko");

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
      <body>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  Switch: {
                    colorPrimary: "#E83C77",
                    colorPrimaryHover: "#E83C77EE",
                  },
                  Radio: {
                    colorBorder: "var(--basic-grade4)",
                    colorPrimary: "var(--core-status-accent)",
                  },
                  DatePicker: {
                    paddingBlock: 16,
                    paddingInline: 20,
                    borderRadius: 12,
                    lineHeight: 2.5,
                  },
                  Input: {
                    paddingBlock: 16,
                    paddingInline: 20,
                    borderRadius: 12,
                  },
                  Button: {
                    borderRadius: 8,
                    defaultBorderColor: "none",
                  },
                  Checkbox: {
                    colorBorder: "var(--basic-grade4)",
                    colorPrimary: "var(--core-status-accent)",

                    colorPrimaryHover: "var(--core-status-accent)",
                  },
                },
              }}
              locale={locale}
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
