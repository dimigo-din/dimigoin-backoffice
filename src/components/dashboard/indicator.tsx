import { usePathname } from "next/navigation";
import Link from "next/link";
import { Heading, SvgContainer, Row } from "../atomic";

import ArrowForward from "@material-symbols/svg-300/rounded/arrow_forward_ios.svg";
import { pathDict } from "@/lib/routeData";
import React from "react";

const getNamedPath = (pathname: string): { name: string; path: string }[] => {
  const splitted = pathname.split("/");
  const res: { name: string; path: string }[] = [];

  let currentPath = "";
  for (let i = 1; i < splitted.length; i++) {
    currentPath += "/" + splitted[i];
    if (pathDict[splitted[i]]) {
      res.push({ name: pathDict[splitted[i]], path: currentPath });
    }
  }

  return res;
};

export default function Indicator() {
  const pathname = usePathname();
  const path = getNamedPath(pathname);

  return (
    <Row $fullw padding={"24px 0"} gap={"12px"} align={"center"}>
      {path.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <SvgContainer
              $fill={"--basic-grade5"}
              width={"16px"}
              height={"16px"}
            >
              <ArrowForward />
            </SvgContainer>
          )}
          <Link href={item.path} passHref>
            <Heading
              $color={
                path.length - 1 === i ? "--basic-grade9" : "--basic-grade7"
              }
              $strong={path.length - 1 === i}
              style={{ whiteSpace: "nowrap", cursor: "pointer" }}
            >
              {item.name}
            </Heading>
          </Link>
        </React.Fragment>
      ))}
    </Row>
  );
}
