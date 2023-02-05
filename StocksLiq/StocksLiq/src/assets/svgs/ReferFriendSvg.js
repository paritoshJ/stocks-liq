import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const ReferFriendSvg = props => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.7848 3.32124L14.0838 1.35097C13.892 1.12893 13.5566 1.10388 13.3346 1.29574C13.1126 1.48761 13.0875 1.8233 13.2794 2.04557L13.7364 2.57488C8.13041 2.16041 3.17935 6.31783 2.64446 11.9397C2.61675 12.2319 2.83101 12.4912 3.12327 12.5194C3.14035 12.521 3.15724 12.5215 3.17432 12.5215C3.44531 12.5215 3.67647 12.3154 3.70304 12.0406C4.18659 6.9521 8.70073 3.20006 13.7839 3.64508L13.1203 4.21782C12.8983 4.40968 12.8738 4.74504 13.0656 4.96706C13.1708 5.08871 13.3192 5.15153 13.468 5.15153C13.5913 5.15153 13.715 5.10902 13.8149 5.02248L15.7848 3.32124ZM14.664 14.1322V13.6008H14.6641C14.6641 11.0242 16.4192 8.85028 18.797 8.21151C17.7339 7.67919 17.0022 6.57928 17.0022 5.31138C17.0022 3.52387 18.456 2.06999 20.2435 2.06999C22.0305 2.06999 23.4849 3.52387 23.4849 5.31138C23.4849 6.57904 22.7528 7.67958 21.6895 8.21151C24.0673 8.84974 25.823 11.0242 25.823 13.6008V14.1322H14.664ZM24.9535 14.8144L26.697 16.7475C26.8936 16.9653 26.876 17.3012 26.6579 17.4979C26.5564 17.5897 26.4294 17.6349 26.3025 17.6349C26.1575 17.6349 26.0125 17.5753 25.9077 17.459L25.4115 16.909C24.6851 22.0455 20.2602 25.8283 15.1464 25.8283C14.7809 25.8283 14.412 25.8091 14.0412 25.7693C13.7495 25.7385 13.5381 25.477 13.5688 25.1848C13.6001 24.8931 13.8616 24.6811 14.1533 24.713C19.1428 25.243 23.6452 21.7111 24.3557 16.7853L23.7328 17.347C23.5146 17.5436 23.1787 17.5267 22.9821 17.3083C22.7855 17.0904 22.8029 16.7545 23.0208 16.5579L24.9535 14.8144ZM9.9878 17.1607C9.9878 18.4283 9.25566 19.5289 8.19233 20.0608H8.19243C10.5703 20.699 12.3261 22.8735 12.3259 25.4501V25.9815H1.16699V25.4501C1.16699 22.8733 2.92204 20.6996 5.29992 20.0608C4.23678 19.5285 3.50503 18.4286 3.50503 17.1607C3.50503 15.3732 4.95891 13.9193 6.74641 13.9193C8.53333 13.9193 9.9878 15.3732 9.9878 17.1607Z"
      fill={props.color ?? themeProvide().primary}
    />
  </Svg>
);
export default ReferFriendSvg;