import { styled } from "styled-components";
import { widthAndHeight } from "../interfaces";
import { rowColTypes } from "./interface";

export const Row = styled.div<rowColTypes>`
  display: flex;
  ${(props) => props.padding && `padding: ${props.padding};`}
  ${(props) =>
    props.height ? `height: ${props.height};` : props.$fullh && "height:100%;"}
  ${(props) =>
    props.width ? `width: ${props.width};` : props.$fullw && "width:100%;"}
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  ${(props) => props.align && `align-items: ${props.align};`}
  ${(props) => props.gap && `gap: ${props.gap};`}

  ${(props) =>
    props.$flexAll &&
    `&>div{
    flex:1;
  }`}

  ${(props) => props.$noShrink && "flex-shrink:0;"}
`;

export const Col = styled.div<rowColTypes>`
  display: flex;
  flex-direction: column;
  ${(props) => props.padding && `padding: ${props.padding};`}
  ${(props) =>
    props.height ? `height: ${props.height};` : props.$fullh && "height:100%;"}
  ${(props) =>
    props.width ? `width: ${props.width};` : props.$fullw && "width:100%;"}
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  ${(props) => props.align && `align-items: ${props.align};`}
  ${(props) => props.gap && `gap: ${props.gap};`}

    ${(props) =>
    props.$flexAll &&
    `&>div{
    flex:1;
  }`}

${(props) => props.$noShrink && "flex-shrink:0;"}
`;

export const SvgContainer = styled.div<widthAndHeight & { $fill?: string }>`
  ${(props) => (props.height ? `height: ${props.height};` : `height: 20px;`)}
  ${(props) => (props.width ? `width: ${props.width};` : `width: 20px;`)}
  & > svg {
    ${(props) => props.$fill && `fill:var(${props.$fill});`}

    ${(props) => (props.height ? `height: ${props.height};` : `height: 20px;`)}
    ${(props) => (props.width ? `width: ${props.width};` : `width: 20px;`)}
  }
`;
