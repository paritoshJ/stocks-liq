import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';

const ArrowDown = props => (
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
      d="M5.92373 8.35311C6.2023 8.07204 6.65444 8.07348 6.93373 8.35168L10.0002 11.4169L13.0666 8.35168C13.3459 8.07276 13.7973 8.07276 14.0766 8.35239C14.3552 8.63274 14.3544 9.08472 14.0759 9.36435L10.5052 12.9337C10.3652 13.0732 10.183 13.1426 10.0002 13.1426C9.8173 13.1426 9.63516 13.0732 9.49516 12.9337L5.92444 9.36435C5.64515 9.08472 5.64516 8.63274 5.92373 8.35311Z"
      fill={props.color ?? themeProvide().black}
    />
  </Svg>
);

export default ArrowDown;
