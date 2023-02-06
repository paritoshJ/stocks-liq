import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const DebitSVG = props => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.78181 7.24264C8.78181 7.7569 9.12477 8.09982 9.63899 8.09982C10.1536 8.09982 10.4962 7.67137 10.4959 7.24264V2.43953C10.5038 2.36116 10.5003 2.28207 10.4852 2.20435C10.4236 1.7761 10.1001 1.5 9.63867 1.5H4.75321C4.23895 1.5 3.89603 1.84296 3.89603 2.35718C3.89603 2.87144 4.23899 3.21436 4.75321 3.21436H7.58637L1.75719 9.04354C1.41427 9.38641 1.41427 9.90067 1.75719 10.2436C1.92881 10.4149 2.10011 10.5007 2.35722 10.5007C2.61434 10.5007 2.78563 10.4149 2.95724 10.2436L8.78181 4.41903V7.24264Z"
      fill={props.color ?? themeProvide().errorText}
    />
  </Svg>
);
export default DebitSVG;
