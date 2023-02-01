import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const CloseIconSVG = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M18 18L6 6M18 6L6 18"
      stroke={props.color ?? themeProvide().black}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default CloseIconSVG;
