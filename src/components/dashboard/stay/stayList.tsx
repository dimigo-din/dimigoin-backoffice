import { Body, Col, Heading, Row } from "@/components/atomic";
import { Button, Switch } from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";
const StayList = () => {
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_1323_6793"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                >
                  <rect width="20" height="20" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_1323_6793)">
                  <path
                    d="M9.37504 10.6251H5.20837C5.03129 10.6251 4.88285 10.5652 4.76306 10.4454C4.64327 10.3255 4.58337 10.177 4.58337 9.99987C4.58337 9.82271 4.64327 9.6743 4.76306 9.55464C4.88285 9.43499 5.03129 9.37516 5.20837 9.37516H9.37504V5.2085C9.37504 5.03141 9.43496 4.88298 9.55479 4.76318C9.67464 4.64339 9.82314 4.5835 10.0003 4.5835C10.1775 4.5835 10.3259 4.64339 10.4455 4.76318C10.5652 4.88298 10.625 5.03141 10.625 5.2085V9.37516H14.7917C14.9688 9.37516 15.1172 9.43508 15.237 9.55491C15.3568 9.67476 15.4167 9.82326 15.4167 10.0004C15.4167 10.1776 15.3568 10.326 15.237 10.4456C15.1172 10.5653 14.9688 10.6251 14.7917 10.6251H10.625V14.7918C10.625 14.9689 10.5651 15.1173 10.4452 15.2371C10.3254 15.3569 10.1769 15.4168 9.99975 15.4168C9.82258 15.4168 9.67417 15.3569 9.55452 15.2371C9.43487 15.1173 9.37504 14.9689 9.37504 14.7918V10.6251Z"
                    fill="#73768A"
                  />
                </g>
              </svg>
            </Row>
          </Button>
        </Row>
        <Col $fullw $fullh padding={"0px 24px 24px 24px"} gap={"12px"}>
          <Option>
            <Row $fullw padding={"16px 20px"} align={"center"} gap={"8px"}>
              <Row align={"center"} gap={"20px"} style={{ flex: 1 }}>
                <Switch />
                <Body $color={"--basic-grade8"}>12월 31일 ~ 12월 31일</Body>
              </Row>
              <Button
                style={{ border: "none", backgroundColor: "#EBECF5" }}
                size="large"
              >
                <Body $color={"--basic-grade8"}>수정</Body>
              </Button>
              <Button
                style={{ border: "none", backgroundColor: "#EBECF5" }}
                size="large"
                onClick={() => {
                  toast("삭제되었습니다.");
                }}
              >
                <Body $color={"--basic-grade8"}>삭제</Body>
              </Button>
            </Row>
          </Option>
          <Option>
            <Row $fullw padding={"16px 20px"} align={"center"} gap={"8px"}>
              <Row align={"center"} gap={"20px"} style={{ flex: 1 }}>
                <Switch />
                <Body $color={"--basic-grade8"}>12월 31일 ~ 12월 31일</Body>
              </Row>
              <Button
                style={{ border: "none", backgroundColor: "#EBECF5" }}
                size="large"
              >
                <Body $color={"--basic-grade8"}>수정</Body>
              </Button>
              <Button
                style={{ border: "none", backgroundColor: "#EBECF5" }}
                size="large"
              >
                <Body $color={"--basic-grade8"}>삭제</Body>
              </Button>
            </Row>
          </Option>
        </Col>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--component-fill-standard-primary);
  border-radius: var(--radius-400);
`;

const Option = styled.div`
  width: 100%;
  background-color: var(--basic-grade2);
  border-radius: 12px;
`;
export default StayList;
