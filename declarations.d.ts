declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "*.png" {
  const src: any;
  export default src;
}
