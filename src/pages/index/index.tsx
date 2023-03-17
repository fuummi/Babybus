import { View, Text } from "@tarojs/components";
import { useRecoilValue } from "recoil";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { nowPageState } from "../../store/index";
// import Home from "../home/index";
// import Map from "../map/index";
// import Personal from "../personal/index";
import "./index.module.less";
// import Footer from "../../components/footer";

interface IPage {
  Component: (props: any) => JSX.Element;
  route: string;
}

export default function Index(props) {
  // const nowPageString = useRecoilValue(nowPageState);

  // const pages: IPage[] = [
  //   { Component: Home, route: "home" },
  //   { Component: Map, route: "map" },
  //   { Component: Personal, route: "personal" }
  // ];
  return (
    <View>
      {/* {pages.map(({ route, Component }) => (
        <View
          key={route}
          style={{
            display: nowPageString === route ? "unset" : "none"
          }}
        >
          <Component></Component>
        </View>
      ))} */}
      <View>123</View>
    </View>
  );
}

