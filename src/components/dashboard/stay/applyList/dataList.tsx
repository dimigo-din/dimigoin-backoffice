import { Body, Col, Row } from "@/components/atomic";
import { deleteStudentStay } from "@/lib/api/stay";
import { Application } from "@/lib/types/stay";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import Swal from "sweetalert2";

interface GroupedStudents {
  [key: string]: {
    male: Application[];
    female: Application[];
  };
}

const DataList = ({ applications }: { applications: Application[] }) => {
  const groupStudents = (apps: Application[]): GroupedStudents => {
    return apps.reduce((acc: GroupedStudents, application) => {
      const key = `${application.student.grade}학년 ${application.student.class}반`;
      if (!acc[key]) {
        acc[key] = { male: [], female: [] };
      }
      if (application.student.gender === "M") {
        acc[key].male.push(application);
      } else {
        acc[key].female.push(application);
      }
      return acc;
    }, {});
  };

  const groupedStudents = groupStudents(applications);

  const sortKeys = (a: string, b: string): number => {
    const [gradeA, classA] = a.split("학년 ");
    const [gradeB, classB] = b.split("학년 ");
    if (gradeA !== gradeB) {
      return parseInt(gradeA) - parseInt(gradeB);
    }
    return parseInt(classA) - parseInt(classB);
  };

  const sortedKeys = Object.keys(groupedStudents).sort(sortKeys);

  const handleDeleteStudent = (
    stayId: string,
    studentId: string,
    name: string
  ) => {
    Swal.fire({
      title: "정말로 삭제하실건가요?",
      text: `학생 ${name}의 잔류를 삭제합니다.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "지우기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteStudentStay({ stayId, studentId }).then(() => {
          toast.success("학생의 잔류가 삭제되었습니다.");
        });
      }
    });
  };

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
                      {students.male.map((app, idx) => (
                        <div
                          key={app._id}
                          onClick={() =>
                            handleDeleteStudent(
                              app.stay,
                              app.student._id,
                              app.student.name
                            )
                          }
                        >
                          {app.student.name}
                          {idx < students.male.length - 1 && ", "}
                        </div>
                      ))}
                    </WrappingBody>
                  </Row>
                )}
                {students.female.length > 0 && (
                  <Row gap={"12px"}>
                    <Body $color={"--basic-grade5"} $noShrink>
                      여자
                    </Body>
                    <WrappingBody $color={"--basic-grade8"}>
                      {students.female.map((app, idx) => (
                        <div
                          key={app._id}
                          onClick={() =>
                            handleDeleteStudent(
                              app.stay,
                              app.student._id,
                              app.student.name
                            )
                          }
                        >
                          {app.student.name}
                          {idx < students.female.length - 1 && ", "}
                        </div>
                      ))}
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

  & > div {
    display: inline;
    cursor: pointer;
  }
`;
