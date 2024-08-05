import { Body, Col, Row } from "@/components/atomic";
import { styled } from "styled-components";

const DataList = () => {
  return (
    <Col gap={"12px"} padding={"0px 24px 24px 24px"}>
      <Option>
        <Row padding={"20px"}>
          <Col
            align={"start"}
            $noShrink
            style={{ width: "65px", marginRight: "24px" }}
          >
            <Body $color={"--basic-grade6"}>2학년 4반</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 6명
            </Body>
          </Col>
          <ContentCol gap={"12px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                남자
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                김건우, 문동규, 신동빈, 우채민, 조은율, 홍제형
              </WrappingBody>
            </Row>
          </ContentCol>
        </Row>
      </Option>
      <Option>
        <Row padding={"20px"}>
          <Col
            align={"start"}
            $noShrink
            style={{ width: "65px", marginRight: "24px" }}
          >
            <Body $color={"--basic-grade6"}>2학년 4반</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 14명
            </Body>
          </Col>
          <ContentCol gap={"12px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                남자
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                강태민, 김도현, 김인찬, 김진현, 박상수, 백현서, 안민혁, 이수성,
                이유성, 조인성, 차건, 최우성, 최진혁
              </WrappingBody>
            </Row>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                여자
              </Body>
              <WrappingBody $color={"--basic-grade8"}>이유진</WrappingBody>
            </Row>
          </ContentCol>
        </Row>
      </Option>
      <Option>
        <Row padding={"20px"}>
          <Col
            align={"start"}
            $noShrink
            style={{ width: "65px", marginRight: "24px" }}
          >
            <Body $color={"--basic-grade6"}>2학년 4반</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 14명
            </Body>
          </Col>
          <ContentCol gap={"12px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                남자
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                김경민, 김도현, 김영환, 서민규, 이율, 전민기, 최재민, 한연수
              </WrappingBody>
            </Row>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                여자
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                박성민 왈 6반에 여자 없다
              </WrappingBody>
            </Row>
          </ContentCol>
        </Row>
      </Option>
    </Col>
  );
};

export default DataList;

const Option = styled.div`
  width: 100%;
  background-color: var(--basic-grade2);
  border-radius: 12px;
  overflow: hidden;
`;

const ContentCol = styled(Col)`
  flex: 1;
  min-width: 0;
`;

const WrappingBody = styled(Body)`
  word-break: break-all;
  flex: 1;
`;
