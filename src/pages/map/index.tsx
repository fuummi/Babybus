import { View, Text, Map, MapProps } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { stations, roads } from "../../assets/sation";
import icon from "../../assets/icons/station.png";

export default function Index() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [close, setClose] = useState(20);
  const mapContext = Taro.createMapContext("map");
  console.log(123123);

  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    setWindowHeight(info.windowHeight * 0.86);
    // Taro.getLocation({
    //   type: "gcj02",
    //   success: function(res) {
    //     const latitude = res.latitude;
    //     const longitude = res.longitude;
    //     mapContext.addMarkers({
    //       markers: [
    //         {
    //           id: 1,
    //           latitude,
    //           longitude,
    //           iconPath: "../assets/icon.position.png"
    //         }
    //       ]
    //     });
    //   }
    // });
    const markers: any = [];
    stations.forEach(({ name, latitude, longitude }, i) => {
      // if (i === 26) {
      markers.push({
        id: i,
        latitude,
        longitude,
        iconPath: icon,
        title: name,
        width: 20,
        height: 20
      });
      // }
    });
    mapContext.addMarkers({
      markers: markers
    });
  }, []);
  const polylinePoints1: any[] = [];
  const polylinePoints2: any[] = [];
  const polylinePoints3: any[] = [];
  const polylinePoints4: any[] = [];
  roads.one.points.forEach(e => {
    polylinePoints1.push({
      latitude: e.latitude,
      longitude: e.longitude
    });
  });
  roads.two.points.forEach(e => {
    polylinePoints2.push({
      latitude: e.latitude,
      longitude: e.longitude
    });
  });
  roads.three.points.forEach(e => {
    polylinePoints3.push({
      latitude: e.latitude,
      longitude: e.longitude
    });
  });
  roads.four.points.forEach(e => {
    polylinePoints4.push({
      latitude: e.latitude,
      longitude: e.longitude
    });
  });
  const polyline: MapProps.polyline[] = [
    {
      points: polylinePoints1,
      color: "#9748f9",
      width: 2,
      arrowLine: true,
    },
    {
      points: polylinePoints2,
      color: "#16ad5e",
      width: 2,
      arrowLine: true,
    },
    {
      points: polylinePoints3,
      color: "#1099f9",
      width: 2,
      arrowLine: true,
    },
    {
      points: polylinePoints4,
      color: "#fbce2d",
      width: 2,
      arrowLine: true,
    }
  ];
  // const polyline2: MapProps.polyline = [

  // ];
  // const polyline3: MapProps.polyline[] = [

  // ];
  // const polyline4: MapProps.polyline[] = [

  // ];
  // console.log(polyline);

  return (
    <View>
      <Map
        id="map"
        style={{ width: "100%", height: windowHeight, position: "absolute" }}
        longitude={106.608}
        latitude={29.53}
        polyline={polyline}
      ></Map>
      <View
        className={styles.tab}
        style={{ transform: `translateY(${close}vh)` }}
      >
        <View className={styles.navigation}>路线规划</View>
        <View className={styles.right}>
          <View
            className={styles.friend}
            onClick={() => Taro.navigateTo({ url: "../friend/index" })}
          >
            寻友路线
          </View>
          <View className={styles.info}>信息查询</View>
        </View>
      </View>
      <View
        className={styles.closeTab}
        style={{ transform: `translateY(${close}vh)` }}
        onClick={() => setClose(close ? 0 : 20)}
      >
        {close ? "^" : "x"}
      </View>
    </View>
  );
}
