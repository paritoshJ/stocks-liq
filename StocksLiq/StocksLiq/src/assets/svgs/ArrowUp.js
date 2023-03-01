import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';

const ArrowUp = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle
      cx={10}
      cy={10}
      r={9.5}
      transform="rotate(-90 10 10)"
      fill={props.color ?? themeProvide().primary}
      stroke={props.color ?? themeProvide().primary}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0753 11.9321C13.7967 12.2131 13.3446 12.2117 13.0653 11.9335L9.99887 8.86828L6.93244 11.9335C6.65315 12.2124 6.20172 12.2124 5.92244 11.9328C5.64387 11.6524 5.64458 11.2004 5.92315 10.9208L9.49387 7.35141C9.63387 7.21195 9.81601 7.14258 9.99887 7.14258C10.1817 7.14258 10.3639 7.21195 10.5039 7.35141L14.0746 10.9208C14.3539 11.2004 14.3539 11.6524 14.0753 11.9321Z"
      fill={props.color ?? themeProvide().black}
    />
  </Svg>
);

export default ArrowUp;
