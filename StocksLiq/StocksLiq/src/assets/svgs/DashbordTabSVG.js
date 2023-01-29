import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const DashbordTabSVG = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.2308 2.76923C11.2308 2.34615 10.8846 2 10.4615 2H2.76923C2.34615 2 2 2.34615 2 2.76923V10.4615C2 10.8846 2.34615 11.2308 2.76923 11.2308H10.4615C10.8846 11.2308 11.2308 10.8846 11.2308 10.4615V2.76923Z"
      fill={props.color}
    />
    <Path
      d="M22.0001 2.76923C22.0001 2.34615 21.6539 2 21.2308 2H13.5385C13.1154 2 12.7693 2.34615 12.7693 2.76923V10.4615C12.7693 10.8846 13.1154 11.2308 13.5385 11.2308H21.2308C21.6539 11.2308 22.0001 10.8846 22.0001 10.4615V2.76923Z"
      fill={props.color}
    />
    <Path
      d="M13.5385 22H21.2308C21.6539 22 22.0001 21.6538 22.0001 21.2308V13.5385C22.0001 13.1154 21.6539 12.7692 21.2308 12.7692H13.5385C13.1154 12.7692 12.7693 13.1154 12.7693 13.5385V21.2308C12.7693 21.6538 13.1154 22 13.5385 22Z"
      fill={props.color}
    />
    <Path
      d="M10.4615 12.7692H2.76923C2.34615 12.7692 2 13.1154 2 13.5385V21.2308C2 21.6538 2.34615 22 2.76923 22H10.4615C10.8846 22 11.2308 21.6538 11.2308 21.2308V13.5385C11.2308 13.1154 10.8846 12.7692 10.4615 12.7692Z"
      fill={props.color}
    />
  </Svg>
);
export default DashbordTabSVG;