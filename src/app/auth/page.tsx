"use client";
import { Button } from "antd";
import { Body, Col, Display, Heading, Row, Title } from "@/components/atomic";
import Image from "next/image";
import { styled } from "styled-components";
import Link from "next/link";
const Auth = () => {
  return (
    <>
      <Col justify="center" $fullw $fullh>
        <Container>
          <Col gap={"var(--spacing-800)"}>
            <Col gap={"var(--spacing-500)"}>
              <Image
                src={"/static/logo.svg"}
                width={48}
                height={48}
                alt="디미고인 로고"
                loading="eager"
              />
              <div>
                <Heading $color="--basic-grade6">즐거운 학교 생활,</Heading>
                <br />
                <Heading $strong $color="--core-status-accent">
                  디미고인
                </Heading>
                <Heading $strong $color="--basic-grade8">
                  과 함께.
                </Heading>
              </div>
            </Col>
            <Link href={"/dashboard"} style={{ width: "100%" }}>
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#ebecf5",
                  width: "100%",
                }}
                size="large"
              >
                <Row align="center" gap="8px">
                  <Image
                    src={"/static/google.svg"}
                    alt="구글 로그인"
                    width={20}
                    height={20}
                  />
                  <Body $color="--basic-grade7">
                    디미고 구글 계정으로 로그인
                  </Body>
                </Row>
              </Button>
            </Link>
          </Col>
        </Container>
      </Col>
    </>
  );
};

const Container = styled.div`
  padding: 56px 44px 32px 32px;
  max-width: 480px;
  min-width: 300px;
  width: 100%;

  height: 280px;
  border-radius: var(--radius-400);
  background-color: var(--component-fill-standard-primary);
  margin: auto;
`;

export default Auth;
