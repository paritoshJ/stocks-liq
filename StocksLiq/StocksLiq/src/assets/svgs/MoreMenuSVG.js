import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const MoreMenuSvg = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M2 4H22V7.12128H2V4Z" fill={props.color ?? 'black'} />
    <Path d="M2 10.4394H22V13.5607H2V10.4394Z" fill={props.color ?? 'black'} />
    <Path d="M2 16.8787H22V19.9999H2V16.8787Z" fill={props.color ?? 'black'} />
  </Svg>
);
export default MoreMenuSvg;
