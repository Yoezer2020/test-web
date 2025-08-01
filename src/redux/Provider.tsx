"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Providers({ children }: { children: any }) {
  return <Provider store={store}>{children}</Provider>;
}
