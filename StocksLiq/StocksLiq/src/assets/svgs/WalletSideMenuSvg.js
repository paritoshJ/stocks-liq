import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const WalletSideMenuSvg = props => (
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
      d="M27.0068 8H11.0111C9.96559 8 9.22055 8.37439 8.7246 8.9256C8.23521 9.46969 7.99155 10.1984 8.00186 10.9257V10.9259C8.00223 10.932 8.00242 10.9382 8.00242 10.9446V15.4065C8.08296 15.2644 8.17304 15.1275 8.27399 14.9975C8.71712 14.4265 9.36831 13.9989 10.2244 13.8346V13.116C10.2244 12.4446 10.4372 11.8295 10.7942 11.3722C11.1512 10.915 11.6653 10.612 12.2399 10.612H25.7784C26.3526 10.612 26.8667 10.9143 27.2239 11.3713C27.581 11.8282 27.7936 12.4435 27.7936 13.1163V13.6821C28.4246 13.5478 28.9102 13.2509 29.2693 12.8632C29.7652 12.3274 30.0177 11.6058 30.0177 10.8808C30.0177 10.1556 29.7654 9.43413 29.2693 8.89829C28.7733 8.36244 28.0356 8.0004 27.007 8.0004L27.0068 8ZM25.7781 11.1487H12.2395C11.8524 11.1487 11.4932 11.3491 11.2171 11.7025C10.9412 12.056 10.7612 12.5586 10.7612 13.1159V13.7687C10.8369 13.7644 10.9137 13.7618 10.992 13.7612H10.9918C10.9982 13.7609 11.0043 13.7607 11.0107 13.7607H27.0065C27.0917 13.7607 27.1749 13.7579 27.2561 13.753V13.1157C27.2561 12.5572 27.0762 12.0545 26.8003 11.7014C26.5244 11.3484 26.1652 11.1486 25.7779 11.1486L25.7781 11.1487ZM30.0178 12.7667L30.0179 12.7664L30.0178 12.7664V12.7667ZM30.0178 12.7667C29.9144 12.9291 29.7965 13.0838 29.663 13.2277C29.0659 13.8727 28.1641 14.2979 27.0065 14.2979H11.0266C9.90245 14.2979 9.1754 14.7112 8.69762 15.3268C8.22003 15.9423 8.00182 16.7824 8.00182 17.6191V18.1242C8.1672 18.3057 8.35412 18.3746 8.6045 18.4083C8.77304 18.4311 8.96514 18.4313 9.17131 18.4315H9.17132H9.17133H9.17134H9.17135C9.27721 18.4316 9.38679 18.4317 9.4988 18.4349H15.8368C16.9712 18.4349 17.8561 18.8767 18.4381 19.541C19.02 20.2053 19.3043 21.0794 19.3043 21.95C19.3043 22.8203 19.0199 23.6946 18.4381 24.3589C17.8561 25.0232 16.9712 25.465 15.8368 25.465H9.4988C9.19707 25.465 8.82697 25.444 8.47562 25.359C8.31268 25.3195 8.1503 25.2665 8.00178 25.1899V27.0635C8.00178 28.6798 9.32198 30 10.9383 30H27.0813C28.6976 30 30.0178 28.6798 30.0178 27.0635V12.7667ZM8.00004 18.7846C8.17197 18.87 8.36001 18.9202 8.53699 18.944C8.75722 18.9737 8.97432 18.9712 9.18308 18.9687H9.1831C9.28892 18.9675 9.3926 18.9663 9.49347 18.9693H9.50171H15.8364C16.8346 18.9693 17.5502 19.3392 18.0348 19.8922C18.5193 20.4453 18.7649 21.195 18.7649 21.9479C18.7649 22.7006 18.5193 23.4506 18.0348 24.0036C17.5503 24.5567 16.8346 24.9266 15.8364 24.9266H9.50171C9.22658 24.9266 8.88891 24.9036 8.60382 24.8343C8.31877 24.7651 8.1047 24.6481 8.01648 24.5153H8.01667C8.01142 24.5095 8.00581 24.5041 8 24.4986L8.00004 18.7846ZM15.7443 20.5298C14.9852 20.5298 14.3599 21.146 14.3599 21.9058C14.3599 22.6677 14.9852 23.2902 15.7443 23.2902C16.5034 23.2902 17.1203 22.6669 17.1203 21.9058C17.1203 21.1467 16.5034 20.5298 15.7443 20.5298ZM14.8981 21.9085C14.8981 21.4397 15.2738 21.0659 15.7433 21.0659C16.2129 21.0659 16.5859 21.439 16.5859 21.9085C16.5859 22.3812 16.2129 22.7537 15.7433 22.7537C15.2738 22.7537 14.8981 22.3807 14.8981 21.9085Z"
      fill={props.color ?? themeProvide().primary}
    />
  </Svg>
);
export default WalletSideMenuSvg;