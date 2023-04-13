import { View } from "@tarojs/components";
import {  RecoilRoot } from "recoil";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import "./app.module.less";
import Footer from "./components/footer";

export default function APP(props) {
  return (
    <RecoilRoot>
      {props.children}
    </RecoilRoot>
  );
}
