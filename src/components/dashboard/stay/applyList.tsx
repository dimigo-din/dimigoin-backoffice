import { Heading, Body } from "@/components/atomic";
import { Button } from "antd";
import { Row } from "@/components/atomic";
import { styled } from "styled-components";
import Download from "@material-symbols/svg-300/rounded/download.svg";
const ApplyList = () => {
  return (
    <>
      <Container>
        <Row padding={"20px 28px"} justify={"space-between"} align={"center"}>
          <Heading $strong color={"--basic-grade9"}>
            잔류 목록
          </Heading>
          <Button
            size="large"
            style={{
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#F6F7FA",
            }}
          >
            <Row align={"center"} gap={"4px"}>
              <Body $color={"--basic-grade7"}>잔류 추가</Body>
            </Row>
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default ApplyList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
`;
