import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import { themeProvide } from '../../util/globalMethods';
const MoreSvgIcon = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6 11.9999C13.6 12.9939 12.794 13.7999 11.8 13.7999C10.806 13.7999 10 12.9939 10 11.9999C10 11.0059 10.806 10.1999 11.8 10.1999C12.794 10.1999 13.6 11.0059 13.6 11.9999Z"
      fill={props.color ?? themeProvide().black}
      fillOpacity={0.5}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6 4.8C13.6 5.79401 12.794 6.6 11.8 6.6C10.806 6.6 10 5.79401 10 4.8C10 3.80599 10.806 3 11.8 3C12.794 3 13.6 3.80599 13.6 4.8Z"
      fill={props.color ?? themeProvide().black}
      fillOpacity={0.5}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6 19.2C13.6 20.194 12.794 21 11.8 21C10.806 21 10 20.194 10 19.2C10 18.206 10.806 17.4 11.8 17.4C12.794 17.4 13.6 18.206 13.6 19.2Z"
      fill={props.color ?? themeProvide().black}
      fillOpacity={0.5}
    />
  </Svg>
);
export default MoreSvgIcon;
