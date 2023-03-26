import {
  View,
  Map,
  MapProps,
  Swiper,
  SwiperItem,
  Input,
  Image
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { stations, road1, road2 } from "../../assets/sation";
import icon from "../../assets/icons/station.png";
import Init from "./init";
import Result from "./result";

export default function Index() {
  const [windowHeight, setWindowHeight] = useState(0);
  const mapContext = Taro.createMapContext("map");
  const [isSerach, setIsSerach] = useState(false);
  const [confrim, setConfrim] = useState(false);
  const [mapscale, setMapscale] = useState(15);
  const [serachValue, setSerachValue] = useState("");
  const [result, setResult] = useState({
    title: "兴业苑",
    msg: {
      msg1: "所属路线：一号线",
      msg2: "周边：菜鸟驿站 莘莘食堂 兴业苑2舍"
    },
    buttontext: "规划路线"
  });
  const info = Taro.getSystemInfoSync();
  useEffect(() => {
    if (isSerach) {
      setWindowHeight(info.windowHeight);
      setMapscale(16);
    }
  }, [isSerach]);

  useEffect(() => {
    setWindowHeight(info.windowHeight * 0.7);
    Taro.getLocation({
      type: "gcj02",
      success: function(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        mapContext.addMarkers({
          markers: [
            {
              id: 1,
              latitude,
              longitude,
              iconPath: "../assets/icon.position.png"
            }
          ]
        });
      }
    });
    const markers: any = [];
    stations.forEach(({ name, latitude, longitude }, i) => {
      // if (i === 12) {
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
  const polylinePoints: any[] = [];
  road2.forEach(e => {
    polylinePoints.push({
      latitude: e.latitude,
      longitude: e.longitude
    });
  });
  const polyline: MapProps.polyline[] = [
    {
      points: polylinePoints,
      width: 2
    }
  ];

  function enterSreach() {
    setIsSerach(true);
  }
  function onConfirm() {
    setWindowHeight(info.windowHeight * 0.6);
    stations.forEach(e => {
      if (serachValue.includes(e.name)) {
        const { latitude, longitude, owner, nearby } = e;
        setMapscale(19);
        mapContext.moveToLocation({
          latitude,
          longitude
        });
        setResult({
          title: e.name,
          msg: {
            msg1: owner,
            msg2: nearby
          },
          buttontext: "规划路线"
        });
      }
    });
  }
  function closeWindow() {
    setConfrim(false);
    setIsSerach(false);
  }

  return (
    <View className={styles.homewrap}>
      <View
        style={{
          transform: isSerach ? "translateY(0vh)" : "translateY(0vh)"
        }}
        className={styles.banner}
      >
        <Swiper
          className={styles.swiper}
          indicatorDots={true}
          indicatorColor="#999"
          indicatorActiveColor="#333"
          autoplay
        >
          <SwiperItem>
            <View className="demo-text-1">活动1</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-2">活动2</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-3">活动3</View>
          </SwiperItem>
        </Swiper>
      </View>
      <Map
        id="map"
        style={{
          width: "100%",
          height: windowHeight,
          transform: isSerach ? "translateY(-26vh)" : "translateY(0vh)"
        }}
        longitude={106.608}
        latitude={29.53}
        polyline={polyline}
        scale={mapscale}
      ></Map>
      <View
        style={{
          transform: isSerach ? "translateY(26vh)" : "translateY(0vh)"
        }}
        className={styles.enter}
        onClick={enterSreach}
      >
        查询巴士信息
      </View>
      <View
        style={{
          transform: isSerach
            ? confrim
              ? "translateY(25vh)"
              : "translateY(0vh)"
            : "translateY(65vh)"
        }}
        className={styles.queryWindow}
      >
        <View className={styles.quit} onClick={closeWindow}>
          X
        </View>
        {isSerach && confrim ? (
          <Result
            title={result.title}
            msg={{
              msg1: result.msg.msg1,
              msg2: result.msg.msg2
            }}
            buttontext={result.buttontext}
          ></Result>
        ) : (
          <Init
            setSerachValue={setSerachValue}
            onConfirm={onConfirm}
            setConfrim={setConfrim}
          ></Init>
        )}
      </View>
    </View>
  );
}
