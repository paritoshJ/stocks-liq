import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ExpenseTabSVG = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1.97412 11.8071C1.97412 17.3108 6.46221 21.7833 11.9741 21.7833C17.486 21.7833 21.9741 17.311 21.9741 11.8071C21.9741 6.30313 17.486 1.83081 11.9741 1.83081C6.46221 1.83081 1.97412 6.30313 1.97412 11.8071ZM15.8083 6.76782C15.8083 7.0749 15.5642 7.31898 15.2571 7.31898H13.0603C13.4855 7.79141 13.7846 8.38197 13.8949 9.03549H15.2571C15.5642 9.03549 15.8083 9.27958 15.8083 9.58665C15.8083 9.89373 15.5642 10.1378 15.2571 10.1378H13.8949C13.6272 11.7362 12.2414 12.9566 10.5722 12.9566H10.0761L13.769 16.4447C13.9894 16.6573 13.9973 17.0037 13.7926 17.2242C13.6824 17.3423 13.5406 17.3974 13.391 17.3974C13.2572 17.3974 13.1154 17.3502 13.0131 17.2478L8.31241 12.807C8.14706 12.6495 8.09195 12.4133 8.17856 12.2007C8.26517 11.9881 8.46201 11.8542 8.69036 11.8542H10.5722C11.6352 11.8542 12.5249 11.122 12.769 10.1377H8.69043C8.38335 10.1377 8.13927 9.89364 8.13927 9.58656C8.13927 9.27948 8.38335 9.0354 8.69043 9.0354H12.769C12.525 8.05116 11.6274 7.31889 10.5722 7.31889H8.69036C8.38328 7.31889 8.13919 7.0748 8.13919 6.76773C8.13919 6.46065 8.38328 6.21656 8.69036 6.21656H15.265C15.5642 6.21656 15.8083 6.46065 15.8083 6.76773L15.8083 6.76782Z"
      fill={props.color}
    />
  </Svg>
);
export default ExpenseTabSVG;