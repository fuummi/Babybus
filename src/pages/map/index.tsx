import { View, Text, Map } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import styles from "./index.module.less";

export default function Index() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [close, setClose] = useState(0);
  const mapContext = Taro.createMapContext("map");
  console.log(123123);

  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    setWindowHeight(info.windowHeight * 0.86);
    Taro.getLocation({
      type: "gcj02",
      success: function(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        mapContext.addMarkers({
          markers:[{
            id:1,
            latitude,
            longitude,
            iconPath:'../assets/icon.myPos.png'
          }]
        })
      }
    });
  }, []);

  return (
    <View>
      <Map
        id='map'
        style={{ width: "100%", height: windowHeight, position: "absolute" }}
        longitude={106.608}
        latitude={29.53}
      ></Map>
      <View
        className={styles.tab}
        style={{ transform: `translateY(${close}vh)` }}
      >
        <View className={styles.navigation}>路线规划</View>
        <View className={styles.right}>
          <View className={styles.friend}>寻友路线</View>
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
