import { usePathname } from "next/navigation";
import { Heading, SvgContainer, Row } from "../atomic";

import ArrowForward from "@material-symbols/svg-300/rounded/arrow_forward_ios.svg";
import { pathDict } from "@/lib/routeData";

const getNamedPath = (pathname: string): string[] => {
  const splitted = pathname.split("/");
  const res: string[] = [];

  for (let i = 2; i < splitted.length - 1; i++) {
    res.push(pathDict[splitted[i]]);
    res.push(">");
  }
  res.push(pathDict[splitted[splitted.length - 1]]);

  return res;
};

export default function Indicator() {
  const path = getNamedPath(usePathname());

  return (
    <>
      <Row $fullw padding={"24px 0"} gap={"12px"} align={"center"}>
        {path.map((elm, i) => (
          <div key={i}>
            {i & 1 ? (
              <>
                <SvgContainer
                  $fill={"--basic-grade5"}
                  width={"16px"}
                  height={"16px"}
                >
                  <ArrowForward />
                </SvgContainer>
              </>
            ) : (
              <>
                <Heading
                  $color={
                    path.length - 1 === i ? "--basic-grade9" : "-basic-grade7"
                  }
                  $strong={path.length - 1 === i}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {elm}
                </Heading>
              </>
            )}
          </div>
        ))}
      </Row>
    </>
  );
}
