import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const CreaditSVG = props => (
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
      d="M3.21819 4.75736C3.21819 4.2431 2.87523 3.90018 2.36101 3.90018C1.84644 3.90018 1.50383 4.32863 1.50414 4.75736V9.56047C1.49616 9.63884 1.49971 9.71793 1.51481 9.79565C1.57639 10.2239 1.89991 10.5 2.36133 10.5H7.24679C7.76105 10.5 8.10397 10.157 8.10397 9.64282C8.10397 9.12856 7.76101 8.78564 7.24679 8.78564H4.41363L10.2428 2.95646C10.5857 2.61359 10.5857 2.09933 10.2428 1.7564C10.0712 1.5851 9.89989 1.49929 9.64278 1.49929C9.38566 1.49929 9.21437 1.5851 9.04276 1.7564L3.21819 7.58097V4.75736Z"
      fill={props.color ?? themeProvide().successText}
    />
  </Svg>
);
export default CreaditSVG;
