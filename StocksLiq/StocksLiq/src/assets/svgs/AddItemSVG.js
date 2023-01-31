import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const AddItemSVG = props => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={48} height={48} rx={24} fill={themeProvide().primary} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.1113 23.1108H16.8887C16.3982 23.1108 16 23.5096 16 23.9996C16 24.4901 16.3982 24.8883 16.8887 24.8883H23.1113L23.1107 31.1107C23.1107 31.6012 23.509 31.9995 23.9995 32C24.49 32 24.8882 31.6013 24.8882 31.1113L24.8887 24.8885H31.1113C31.6018 24.8885 32 24.4903 32 23.9998C32 23.5098 31.6018 23.111 31.1113 23.111H24.8887L24.8893 16.8893C24.8893 16.3988 24.491 16 24.0005 16C23.51 16 23.1118 16.3982 23.1118 16.8887L23.1113 23.1112V23.1108Z"
      fill={themeProvide().white}
      stroke={themeProvide().white}
      strokeWidth={0.5}
    />
  </Svg>
);
export default AddItemSVG;
