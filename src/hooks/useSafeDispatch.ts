import { store } from "@src/redux";
import React from "react";

export function useSafeDispatch() {
  const dispatch = store.dispatch;
  const mountRef = React.useRef(false);
  React.useLayoutEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  });

  return React.useCallback(
    (args: any) => {
      return mountRef.current ? dispatch(args) : void 0;
    },
    [dispatch]
  );
}
