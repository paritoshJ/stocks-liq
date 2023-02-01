import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const LogoutMenuSvg = props => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.3393 8.55455L29.4461 17.6613C30.1852 18.4001 30.1846 19.6016 29.4445 20.3417L20.3411 29.445C19.5997 30.1865 18.4001 30.1859 17.6592 29.445L8.55587 20.3417C7.81444 19.6002 7.81498 18.4006 8.55587 17.6597L17.6592 8.55637C18.4004 7.81521 19.5995 7.8144 20.3396 8.55479L20.3393 8.55455ZM24.7578 19.5898C25.1295 19.223 25.128 18.6283 24.7525 18.2597L20.2841 13.8711C19.5696 13.1582 18.4982 14.2273 19.2126 14.9402L22.1989 17.9178C22.3458 18.0645 22.2943 18.1831 22.0858 18.1831H13.8469C13.4273 18.1831 13.0875 18.5187 13.0875 18.9393C13.0875 19.3568 13.4268 19.6953 13.8469 19.6953H22.0858C22.2951 19.6953 22.3453 19.8147 22.1989 19.9609L19.2126 22.9382C18.4982 23.6509 19.5696 24.7205 20.2841 24.0073L24.7578 19.5898Z"
      fill={props.color ?? themeProvide().primary}
    />
  </Svg>
);
export default LogoutMenuSvg;
