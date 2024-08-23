import { Body, Col, Row } from "@/components/atomic/index";
import {
  deleteFrigo,
  getAllFridayOuting,
  makeFrigo,
  setFrigo,
  unSetFrigo,
} from "@/lib/api/friday";
import { frigoType } from "@/lib/types/friday";
import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { styled } from "styled-components";

export default function FrigoDayList({ refetch }: { refetch: () => void }) {
  const [frigos, setFrigos] = useState<frigoType[] | null>(null);

  const [date, setDate] = useState<Dayjs>(dayjs());
  const fetchData = () => {
    getAllFridayOuting()
      .then((res) => {
        setFrigos(res.data.reverse());
      })
      .catch((res) => {}); // 404 when there is no frigo application
  };
  const handleFrigoMade = () => {
    let formatted: string;

    if (date.day() === 5) {
      // why does it keep getting set to the day before???
      formatted = date.add(1, "day").toISOString().split("T")[0];
    } else {
      formatted = date.toISOString().split("T")[0];
    }
    makeFrigo({ date: formatted }).then(
      (res: { current: boolean; date: string; _id: string }) => {
        toast.success("금요귀가가 생성되었습니다.");
        refetch();
        fetchData();
      }
    );
  };
  const handleFrigoDecision = async (accept: boolean, id: string) => {
    if (accept) {
      await setFrigo({ id });
      refetch();
      fetchData();
    } else {
      await unSetFrigo({ id });
      refetch();
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <Col gap={"8px"}>
          <Row
            $fullw
            align={"center"}
            justify={"space-between"}
            style={{ borderBottom: "1px var(--line-outline) solid" }}
            padding={"24px"}
          >
            <Row $fullw gap={"16px"} align={"center"}>
              <Body $color={"--content-standard-primary"}>금요귀가 생성</Body>
              <DatePicker
                defaultValue={dayjs(dayjs(), "YYYY-MM-DD")}
                onChange={(val) => {
                  setDate(val);
                }}
              />
            </Row>
            <AccentBtn onClick={() => handleFrigoMade()}>
              <Body $color={"--basic-grade1"}>생성</Body>
            </AccentBtn>
          </Row>
          <Col padding={"24px"} gap={"8px"}>
            {frigos?.map((elm) => (
              <>
                <Row
                  key={elm._id}
                  align={"center"}
                  justify={"space-between"}
                  gap={"4px"}
                >
                  <DateBox
                    $activated={elm.current}
                    $color={
                      elm.current
                        ? "--basic-grade1"
                        : "--content-standard-primary"
                    }
                  >
                    {elm.date}
                  </DateBox>
                  <Row gap={"4px"}>
                    <AccentBtn
                      onClick={() => handleFrigoDecision(true, elm._id)}
                    >
                      <Body $color={"--basic-grade1"}>활성화</Body>
                    </AccentBtn>
                    <Button
                      onClick={() => handleFrigoDecision(false, elm._id)}
                      style={{
                        border: "1px solid var(--line-outline)",
                      }}
                    >
                      <Body $color={"--content-standard-primary"}>
                        비활성화
                      </Body>
                    </Button>
                    <Button
                      onClick={() =>
                        deleteFrigo({ id: elm._id }).then((res) => {
                          fetchData();
                        })
                      }
                      style={{
                        border: "1px solid var(--line-outline)",
                      }}
                    >
                      <Body $color={"--content-standard-primary"}>제거</Body>
                    </Button>
                  </Row>
                </Row>
              </>
            ))}
          </Col>
        </Col>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
  overflow: hidden;
`;
const AccentBtn = styled(Button)`
  background-color: var(--core-status-accent) !important;
  border-radius: 12px !important;
  border: none;
  padding: 16px 0;
  height: 44px;

  &:hover {
    background-color: var(--core-status-accent_translucent) !important;
  }
`;

const DateBox = styled(Body)<{ $activated: boolean }>`
  border-radius: 8px;
  ${(p) => p.$activated && "background-color:var(--core-status-accent);"}
  padding:2px 6px;
`;
