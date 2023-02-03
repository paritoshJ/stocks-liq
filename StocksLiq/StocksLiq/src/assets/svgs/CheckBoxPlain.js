import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';

const CheckBoxPlain = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={0.5}
      y={0.5}
      width={19}
      height={19}
      fill={themeProvide().primary}
      stroke={themeProvide().primary}
    />
    <Path
      d="M7.87789 13.7907C7.94603 13.857 8.02726 13.9096 8.11684 13.9456C8.20642 13.9815 8.30257 14 8.39969 14C8.49681 14 8.59295 13.9815 8.68254 13.9456C8.77212 13.9096 8.85334 13.857 8.92149 13.7907L15.8056 7.17775C15.9332 7.04538 16.0028 6.87104 15.9999 6.69086C15.997 6.51067 15.9219 6.33846 15.7901 6.20992C15.6582 6.08137 15.4798 6.00634 15.2919 6.00038C15.1039 5.99443 14.9207 6.058 14.7803 6.17792L8.39053 12.2997L5.25974 9.3002C5.12135 9.16762 4.93365 9.09313 4.73794 9.09313C4.54222 9.09313 4.35453 9.16762 4.21614 9.3002C4.07775 9.43279 4 9.61261 4 9.80012C4 9.89296 4.01909 9.9849 4.05617 10.0707C4.09326 10.1564 4.14761 10.2344 4.21614 10.3L7.87789 13.7907Z"
      fill={themeProvide().white}
    />
  </Svg>
);

export default CheckBoxPlain;
