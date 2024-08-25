import { Body, Col, Heading, Row, SvgContainer } from "@/components/atomic";
import { Button, Switch } from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";
import Add from "@material-symbols/svg-300/rounded/add.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteStay, getStay, setStay, unSetStay } from "@/lib/api/stay";
import { stayType } from "@/lib/types/stay";

const StayList = ({ refetch }: { refetch: () => void }) => {
  const [stayList, setStayList] = useState<stayType[]>([]);
  useEffect(() => {
    getStay().then((res: stayType[]) => {
      setStayList(res);
    });
  }, []);

  const handleStayDelete = (id: string) => {
    deleteStay({ id }).then((res) => {
      toast.success("잔류가 삭제되었습니다.");
      refetch();
    });
  };

  const handleActivation = (ok: boolean, id: string) => {
    if (ok) {
      setStay({ id }).then((res) => {
        refetch();
      });
    } else {
      unSetStay({ id }).then((res) => {
        refetch();
      });
    }
  };
  return (
    <Container>
      <Header>
        <Heading $strong color={"--basic-grade9"}>
          잔류 목록
        </Heading>
        <Link href={"/dashboard/stay/add"}>
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
        </Link>
      </Header>
      <ScrollableDataList>
        {stayList.map((stay, index) => (
          <Option key={index}>
            <Row $fullw padding={"16px 20px"} align={"center"} gap={"8px"}>
              <Row align={"center"} gap={"20px"} style={{ flex: 1 }}>
                <Switch
                  defaultChecked={stay.current}
                  onClick={(checked) => handleActivation(checked, stay._id)}
                />
                <Body $color={"--basic-grade8"}>
                  {stay.start} ~ {stay.end}
                </Body>
              </Row>
              <ButtonGroup>
                <Link href={"/dashboard/stay/studentAdd?stayId=" + stay._id}>
                  <StyledButton>
                    <Body $color={"--basic-grade8"}>추가</Body>
                  </StyledButton>
                </Link>
                <Link href={"/dashboard/stay/edit?stayId=" + stay._id}>
                  <StyledButton>
                    <Body $color={"--basic-grade8"}>수정</Body>
                  </StyledButton>
                </Link>

                <StyledButton onClick={() => handleStayDelete(stay._id)}>
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
