import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {themeProvide} from '../../util/globalMethods';
const SalesTabSvg = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M3.42857 9.86031H6.28571C7.07461 9.86031 7.71429 10.6492 7.71429 11.2889V20.5746C7.71429 21.3635 7.07461 22.0032 6.28571 22.0032H3.42857C2.63967 22.0032 2 21.2143 2 20.5746V11.2889C2 10.5 2.63967 9.86031 3.42857 9.86031Z"
      fill={props.color}
    />
    <Path
      d="M10.5711 12.0032H13.4283C14.2172 12.0032 14.8569 12.7921 14.8569 13.4317V20.5746C14.8569 21.3635 14.2172 22.0032 13.4283 22.0032H10.5711C9.78225 22.0032 9.14258 21.2143 9.14258 20.5746V13.4317C9.14258 12.6428 9.78225 12.0032 10.5711 12.0032Z"
      fill={props.color}
    />
    <Path
      d="M17.7147 9.14601H20.5718C21.3607 9.14601 22.0004 9.93491 22.0004 10.5746V20.5746C22.0004 21.3635 21.3607 22.0032 20.5718 22.0032H17.7147C16.9258 22.0032 16.2861 21.2143 16.2861 20.5746V10.5746C16.2861 9.78568 16.9258 9.14601 17.7147 9.14601Z"
      fill={props.color}
    />
    <Path
      d="M4.59196 5.52398L11.7348 8.38112C11.9422 8.46387 12.1763 8.44474 12.3676 8.32962L18.7464 4.50325L18.6621 4.94619C18.6268 5.13274 18.6672 5.32566 18.7745 5.48223C18.8816 5.63896 19.0468 5.74642 19.2335 5.78118C19.2778 5.78963 19.3228 5.79394 19.3677 5.79394C19.534 5.79378 19.6949 5.73558 19.8228 5.6294C19.9506 5.52321 20.0375 5.37589 20.0685 5.21262L20.4449 3.2276C20.4801 3.04106 20.4398 2.84814 20.3325 2.6914C20.2253 2.53483 20.0602 2.4272 19.8735 2.39261L17.8884 2.01697V2.01681C17.6998 1.9752 17.5024 2.01155 17.3413 2.1179C17.1799 2.22424 17.0686 2.39118 17.0326 2.58108C16.9966 2.77081 17.0388 2.96708 17.1499 3.12508C17.2609 3.28309 17.4313 3.38927 17.622 3.41973L17.7384 3.44189L11.9364 6.92258L5.12208 4.19683C4.885 4.10212 4.61539 4.14118 4.41498 4.29919C4.2144 4.45703 4.11332 4.71004 4.14999 4.96278C4.1865 5.21533 4.35503 5.42931 4.59211 5.524L4.59196 5.52398Z"
      fill={props.color}
    />
  </Svg>
);
export default SalesTabSvg;