import * as React from 'react';

export const navigationRef = React.createRef();
let _navigator;

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
