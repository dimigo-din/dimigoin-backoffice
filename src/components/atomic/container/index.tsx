import { styled } from "styled-components";
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
`;
