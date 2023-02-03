import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const ProfileSvg = props => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M19.4267 8.33477C19.4267 11.6491 16.7399 14.3357 13.4257 14.3357C10.1116 14.3357 7.4248 11.649 7.4248 8.33477C7.4248 5.02042 10.1116 2.33331 13.4257 2.33331C16.7399 2.33331 19.4267 5.02022 19.4267 8.33477Z"
      fill={props.color ?? themeProvide().primary}
    />
    <Path
      d="M18.2215 16.0655H8.63028C5.15801 16.0655 2.33301 18.8907 2.33301 22.3633C2.33301 24.1846 3.81495 25.6667 5.63583 25.6667H21.2155C23.0364 25.6667 24.5184 24.1847 24.5184 22.3633C24.5188 18.891 21.694 16.0655 18.2216 16.0655H18.2215Z"
      fill={props.color ?? themeProvide().primary}
    />
  </Svg>
);
export default ProfileSvg;
