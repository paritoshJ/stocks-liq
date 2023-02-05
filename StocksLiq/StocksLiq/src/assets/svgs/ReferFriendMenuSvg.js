import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import { themeProvide } from '../../util/globalMethods';
const ReferFriendMenuSvg = props => (
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
      d="M20.5296 9.84676L19.0716 8.15796C18.9071 7.96764 18.6197 7.94617 18.4294 8.11062C18.2391 8.27507 18.2176 8.56281 18.382 8.75333L18.7737 9.20702C13.9686 8.85176 9.72488 12.4153 9.2664 17.234C9.24265 17.4845 9.4263 17.7067 9.67681 17.7309C9.69145 17.7322 9.70592 17.7327 9.72056 17.7327C9.95285 17.7327 10.151 17.5561 10.1738 17.3205C10.5882 12.9589 14.4575 9.7429 18.8145 10.1243L18.2457 10.6153C18.0554 10.7797 18.0344 11.0672 18.1988 11.2575C18.289 11.3617 18.4162 11.4156 18.5437 11.4156C18.6494 11.4156 18.7555 11.3791 18.841 11.305L20.5296 9.84676ZM19.5689 19.1133V18.6578H19.569C19.569 16.4493 21.0733 14.5859 23.1115 14.0384C22.2002 13.5821 21.573 12.6394 21.573 11.5526C21.573 10.0204 22.8192 8.77426 24.3513 8.77426C25.883 8.77426 27.1297 10.0204 27.1297 11.5526C27.1297 12.6392 26.5021 13.5825 25.5907 14.0384C27.6289 14.5855 29.1337 16.4493 29.1337 18.6578V19.1133H19.5689ZM28.3884 19.6981L29.8828 21.355C30.0514 21.5417 30.0363 21.8296 29.8494 21.9981C29.7623 22.0769 29.6535 22.1156 29.5447 22.1156C29.4204 22.1156 29.2961 22.0645 29.2063 21.9648L28.781 21.4934C28.1584 25.8961 24.3656 29.1385 19.9824 29.1385C19.6691 29.1385 19.3529 29.1221 19.035 29.0879C18.785 29.0616 18.6038 28.8374 18.6301 28.5869C18.657 28.3369 18.8811 28.1552 19.1311 28.1825C23.4078 28.6369 27.267 25.6095 27.876 21.3874L27.3422 21.8688C27.1551 22.0373 26.8672 22.0229 26.6987 21.8356C26.5301 21.6489 26.5451 21.361 26.7318 21.1925L28.3884 19.6981ZM15.5607 21.7091C15.5607 22.7957 14.9331 23.739 14.0217 24.195H14.0218C16.06 24.742 17.565 26.6058 17.5648 28.8143V29.2698H8V28.8143C8 26.6057 9.50433 24.7425 11.5425 24.195C10.6312 23.7387 10.004 22.7959 10.004 21.7091C10.004 20.177 11.2502 18.9308 12.7824 18.9308C14.314 18.9308 15.5607 20.177 15.5607 21.7091Z"
      fill={props.color ?? themeProvide().primary}
    />
  </Svg>
);
export default ReferFriendMenuSvg;