import { Body, SvgContainer } from "@/components/atomic";
import { Row } from "@/components/atomic";
import styled from "styled-components";
import Arrow from "@material-symbols/svg-300/rounded/chevron_right.svg";
import { useState } from "react";

interface WasherOptionProps {
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function WasherOption({
  name,
  isSelected,
  onSelect,
}: WasherOptionProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
    onSelect();
  };

  return (
    <>
      <LaundryContainer isSelected={isSelected}>
        <Row
          gap={"12px"}
          justify={"space-between"}
          padding={"20px"}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <Body
            $strong
            $color={isSelected ? "--basic-grade1" : "--basic-grade7"}
          >
            {name}
          </Body>
          <SvgContainer
            width={"20px"}
            height={"20px"}
            $fill={isSelected ? "--basic-grade1" : "--basic-grade7"}
            $rotate={open ? "180" : "90"}
          >
            <Arrow />
          </SvgContainer>
        </Row>
        {open && <></>}
      </LaundryContainer>
    </>
  );
}

const LaundryContainer = styled.div<{ isSelected: boolean }>`
  border-radius: 12px;
  background-color: ${(props) =>
    props.isSelected ? "var(--core-status-accent)" : "var(--basic-grade2)"};
  height: max-content;
`;
