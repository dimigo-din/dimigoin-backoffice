import { widthAndHeight, flex } from "../interfaces";

export interface rowColTypes extends flex, widthAndHeight {
  padding?: string;
  $fullw?: boolean; // width : 100%
  $fullh?: boolean; // height : 100%
  $flexAll?: boolean; // flex:1 to all JSX children
  $noShrink?: boolean;
}
