import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';

const CheckBoxWithTick = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={0.5}
      y={0.5}
      width={19}
      height={19}
      fill={props.isDisable ? themeProvide().primary : themeProvide().white}
      stroke={themeProvide().primary}
    />
  </Svg>
);

export default CheckBoxWithTick;
