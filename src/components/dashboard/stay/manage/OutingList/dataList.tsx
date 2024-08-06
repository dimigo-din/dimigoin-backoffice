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
            gap={"4px"}
          >
            <Body $color={"--basic-grade6"}>1234</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 6명
            </Body>
          </Col>
          <ContentCol gap={"4px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 사유
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                외출하고싶어서
              </WrappingBody>
            </Row>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 시간
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                오전 12시 ~ 오후 11시
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
            gap={"4px"}
          >
            <Body $color={"--basic-grade6"}>1234</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 6명
            </Body>
          </Col>
          <ContentCol gap={"4px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 사유
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                외출하고싶어서
              </WrappingBody>
            </Row>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 시간
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                오전 12시 ~ 오후 11시
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
            gap={"4px"}
          >
            <Body $color={"--basic-grade6"}>1234</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 6명
            </Body>
          </Col>
          <ContentCol gap={"4px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 사유
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                외출하고싶어서
              </WrappingBody>
            </Row>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 시간
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                오전 12시 ~ 오후 11시
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
            gap={"4px"}
          >
            <Body $color={"--basic-grade6"}>1234</Body>
            <Body $strong $color={"--basic-grade7"}>
              총 6명
            </Body>
          </Col>
          <ContentCol gap={"4px"}>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 사유
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                외출하고싶어서
              </WrappingBody>
            </Row>
            <Row gap={"12px"}>
              <Body $color={"--basic-grade5"} $noShrink>
                외출 시간
              </Body>
              <WrappingBody $color={"--basic-grade8"}>
                오전 12시 ~ 오후 11시
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
