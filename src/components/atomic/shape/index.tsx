import styled from "styled-components";
import { widthAndHeight } from "../interfaces";

export const Circle = styled.div<{ $color?: string; $size?: string }>`
  ${(props) =>
    props.$size
      ? `height: ${props.$size}; width:${props.$size}`
      : "height:13px;width:13px;"}
  ${(props) =>
    props.$size
      ? `border-radius:calc(${props.$size} / 2)`
      : "border-radius:calc(13px / 2);"}
  ${(props) => props.$color && `background-color: var(${props.$color});`}
`;
