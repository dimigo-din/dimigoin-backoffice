import styled from "styled-components";
import { typoType } from "./interface";

const TypoRef = styled.div<typoType>`
  display: inline-block;
  font-family: var(--family, SUIT);
  color: ${(p) =>
    p.$color ? `var(${p.$color})` : "var(--content-standard-primary)"};

  font-weight: ${(p) => (p.$strong ? "700" : "400")};
  padding: ${(p) => p.$padding && p.$padding};

  ${(props) => props.$noShrink && "flex-shrink:0;"}
`;

export const Display = styled(TypoRef)<typoType>`
  font-size: var(--Size-Display, 48px);
  font-style: normal;
  line-height: var(--Line-Height-Display, 64px); /* 133.333% */
  letter-spacing: -1.44px;
`;

export const Title = styled(TypoRef)<typoType>`
  font-size: var(--Size-Title, 24px);
  font-style: normal;
  line-height: var(--Line-Height-Title, 32px); /* 133.333% */
  letter-spacing: -0.48px;
`;

export const Heading = styled(TypoRef)<typoType>`
  font-size: var(--Size-Heading, 20px);
  font-style: normal;
  line-height: var(--Line-Height-Heading, 28px); /* 140% */
  letter-spacing: -0.4px;
`;

export const Body = styled(TypoRef)<typoType>`
  font-size: var(--Size-Body, 16px);
  font-style: normal;
  line-height: var(--Line-Height-Body, 24px); /* 150% */
  letter-spacing: -0.32px;
`;

export const Label = styled(TypoRef)<typoType>`
  font-size: var(--Size-Label, 14px);
  font-style: normal;
  line-height: var(--Line-Height-Label, 22px); /* 157.143% */
  letter-spacing: -0.28px;
`;

export const FootNote = styled(TypoRef)<typoType>`
  font-size: var(--Size-Footnote, 12px);
  font-style: normal;
  line-height: var(--Line-Height-Footnote, 20px); /* 166.667% */
  letter-spacing: -0.24px;
`;

export const Caption = styled(TypoRef)<typoType>`
  font-size: var(--Size-Caption, 10px);
  font-style: normal;
  line-height: var(--Line-Height-Caption, 16px); /* 160% */
  letter-spacing: -0.2px;
`;
