import { Body, Col, Row } from "@/components/atomic";
import { Application } from "@/lib/types/stay";
import { styled } from "styled-components";

interface GroupedStudents {
  [key: string]: {
    male: string[];
    female: string[];
  };
}

const DataList = ({ applications }: { applications: Application[] }) => {
  const groupStudents = (apps: Application[]): GroupedStudents => {
    return apps.reduce((acc: GroupedStudents, student) => {
      const key = `${student.student.grade}학년 ${student.student.class}반`;
      if (!acc[key]) {
        acc[key] = { male: [], female: [] };
      }
      if (student.student.gender === "M") {
        acc[key].male.push(student.student.name);
      } else {
        acc[key].female.push(student.student.name);
      }
      return acc;
    }, {});
  };

  const groupedStudents = groupStudents(applications);

  // 키를 학년과 반 순으로 정렬하는 함수
  const sortKeys = (a: string, b: string): number => {
    const [gradeA, classA] = a.split("학년 ");
    const [gradeB, classB] = b.split("학년 ");
    if (gradeA !== gradeB) {
      return parseInt(gradeA) - parseInt(gradeB);
    }
    return parseInt(classA) - parseInt(classB);
  };

  const sortedKeys = Object.keys(groupedStudents).sort(sortKeys);

  return (
    <Col gap={"12px"} padding={"0px 24px 24px 24px"}>
      {sortedKeys.map((classKey) => {
        const students = groupedStudents[classKey];
        return (
          <Option key={classKey}>
            <Row padding={"20px"}>
              <Col
                align={"start"}
                $noShrink
                style={{ width: "65px", marginRight: "24px" }}
              >
                <Body $color={"--basic-grade6"}>{classKey}</Body>
                <Body $strong $color={"--basic-grade7"}>
                  총 {students.male.length + students.female.length}명
                </Body>
              </Col>
              <ContentCol gap={"12px"}>
                {students.male.length > 0 && (
                  <Row gap={"12px"}>
                    <Body $color={"--basic-grade5"} $noShrink>
                      남자
                    </Body>
                    <WrappingBody $color={"--basic-grade8"}>
                      {students.male.join(", ")}
                    </WrappingBody>
                  </Row>
                )}
                {students.female.length > 0 && (
                  <Row gap={"12px"}>
                    <Body $color={"--basic-grade5"} $noShrink>
                      여자
                    </Body>
                    <WrappingBody $color={"--basic-grade8"}>
                      {students.female.join(", ")}
                    </WrappingBody>
                  </Row>
                )}
              </ContentCol>
            </Row>
          </Option>
        );
      })}
    </Col>
  );
};

export default DataList;

const Option = styled.div`
  width: 100%;
  background-color: var(--basic-grade2);
  border-radius: 12px;
  overflow: hidden;

  div {
    white-space: normal;
  }
`;

const ContentCol = styled(Col)`
  flex: 1;
  min-width: 0;
`;

const WrappingBody = styled(Body)`
  word-break: break-all;
  flex: 1;
`;
