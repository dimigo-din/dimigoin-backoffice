"use client";
import { Body, Col, Heading, Row } from "@/components/atomic";
import {
  getFridayCurrentOuting,
  makeFrigo,
  setFrigo,
  unSetFrigo,
} from "@/lib/api/friday";
import { currentFrigoType } from "@/lib/types/friday";
import { Button, DatePicker } from "antd";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import FrigoList from "@/components/dashboard/frigo/frigoList";
import FrigoDayList from "@/components/dashboard/frigo/frigoDayList";
export default function FridayOuting() {
  const [currentFrigo, setCurrentFrigo] = useState<currentFrigoType | null>(
    null
  );

  const fetchData = useCallback(() => {
    getFridayCurrentOuting()
      .then((res) => {
        setCurrentFrigo(res.data);
      })
      .catch((res) => {
        setCurrentFrigo(null);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Container>
        <ScrollableContent>
          <FrigoList data={currentFrigo} refetch={fetchData} />
        </ScrollableContent>
        <ScrollableContent>
          <FrigoDayList refetch={fetchData} />
        </ScrollableContent>
      </Container>
    </>
  );
}
const Container = styled(Row)`
  gap: 16px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto; // 스크롤 가능하도록 설정
  max-height: 100%; // 높이 제한 설정
  min-height: 0;
`;
