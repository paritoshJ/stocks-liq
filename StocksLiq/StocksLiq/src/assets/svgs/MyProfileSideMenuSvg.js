import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const MyProfileSideMenuSvg = props => (
  <Svg
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      width={38}
      height={38}
      rx={4}
      fill={props.color ?? themeProvide().primary}
      fillOpacity={0.12}
    />
    <Path
      d="M23.6516 14.1441C23.6516 16.985 21.3487 19.2878 18.5079 19.2878C15.6672 19.2878 13.3643 16.9848 13.3643 14.1441C13.3643 11.3032 15.6672 9 18.5079 9C21.3487 9 23.6516 11.3031 23.6516 14.1441Z"
      fill={props.color ?? themeProvide().primary}
    />
    <Path
      d="M22.6187 20.7704H14.3977C11.4214 20.7704 9 23.1921 9 26.1686C9 27.7297 10.2702 29 11.831 29H25.185C26.7458 29 28.016 27.7298 28.016 26.1686C28.0164 23.1923 25.5951 20.7704 22.6188 20.7704H22.6187Z"
      fill={props.color ?? themeProvide().primary}
    />
  </Svg>
);
export default MyProfileSideMenuSvg;
