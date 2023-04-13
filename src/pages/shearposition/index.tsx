import { View, Image, Button, Map, MapProps } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";
import icon from "../../assets/icons/station.png";
import useToast from "../../components/toast/useToast";
import Toast from "../../components/toast";
import { roads, stations } from "../../assets/sation";
import Sendmsg from "../sendmsg";

export default function Index() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [mapScale, setMapScale] = useState(16);
  const [response, setResponse] = useState(true);
  const [friendMsg, setFriendMsg] = useState({
    id: "0",
    avata: logo,
    nickname: "好友1"
  });
  const mapContext = Taro.createMapContext("map");
  useEffect(() => {
    if (response) {
      Taro.showLoading({
        title: "正在发起请求"
      });
      setTimeout(function() {
        setResponse(false);
        Taro.hideLoading();
      }, 2000);
    }
  }, [response]);
  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    setWindowHeight(info.windowHeight);
    const route = Taro.getCurrentInstance().router;
    if (route?.params) {
      setFriendMsg({
        id: "0",
        avata: route.params.avata,
        nickname: route.params.nickname!
      });
    }

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
      arrowLine: true
    },
    {
      points: polylinePoints2,
      color: "#16ad5e",
      width: 2,
      arrowLine: true
    },
    {
      points: polylinePoints3,
      color: "#1099f9",
      width: 2,
      arrowLine: true
    },
    {
      points: polylinePoints4,
      color: "#fbce2d",
      width: 2,
      arrowLine: true
    }
  ];
  return (
    <View className={styles.wrap}>
      <View className={styles.top}>
        <View className={styles.title}>
          {response ? "正在共享" : "对方无响应"}
        </View>
        <Image src={friendMsg.avata}></Image>
        <View
          className={styles.nickname}
          style={{
            backgroundColor: response ? "#ffe8a4" : "#f14821",
            color: response ? "#000" : "#fff"
          }}
        >
          {friendMsg.nickname}
        </View>
      </View>
      <View
        className={styles.popout}
        style={{
          display: response ? "none" : "block"
        }}
      >
        <Button onClick={() => setResponse(true)}>再次发起请求</Button>
        <Button
          onClick={() => Taro.navigateTo({ url: "/pages/sendmsg/index" })}
        >
          向好友留言
        </Button>
        <Button onClick={() => Taro.navigateBack()}>退出</Button>
      </View>
      <Map
        id="map"
        style={{ width: "100%", height: windowHeight, position: "absolute" }}
        longitude={106.608}
        latitude={29.53}
        polyline={polyline}
        scale={mapScale}
      ></Map>
    </View>
  );
}
