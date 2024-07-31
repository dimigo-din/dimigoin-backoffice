import { Body, Col, Heading, Row, SvgContainer } from "@/components/atomic";
import { Button, Switch } from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";
import Add from "@material-symbols/svg-300/rounded/add.svg";

const StayList = () => {
  return (
    <Container>
      <Header>
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
            <SvgContainer $fill={"--basic-grade7"}>
              <Add />
            </SvgContainer>
          </Row>
        </Button>
      </Header>
      <ScrollableDataList>
        {[...Array(4)].map((_, index) => (
          <Option key={index}>
            <Row $fullw padding={"16px 20px"} align={"center"} gap={"8px"}>
              <Row align={"center"} gap={"20px"} style={{ flex: 1 }}>
                <Switch />
                <Body $color={"--basic-grade8"}>12월 31일 ~ 12월 31일</Body>
              </Row>
              <ButtonGroup>
                <StyledButton>
                  <Body $color={"--basic-grade8"}>수정</Body>
                </StyledButton>
                <StyledButton onClick={() => toast("삭제되었습니다.")}>
                  <Body $color={"--basic-grade8"}>삭제</Body>
                </StyledButton>
              </ButtonGroup>
            </Row>
          </Option>
        ))}
      </ScrollableDataList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
`;

const Header = styled(Row)`
  padding: 20px 28px;
  justify-content: space-between;
  align-items: center;
`;

const ScrollableDataList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 24px 24px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Option = styled.div`
  width: 100%;
  background-color: var(--basic-grade2);
  border-radius: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  border: none;
  background-color: #ebecf5;
`;

export default StayList;
