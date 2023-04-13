import { View, Map, MapProps, Swiper, SwiperItem } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styles from "./index.module.less";
import { stations, roads } from "../../assets/sation";
import icon from "../../assets/icons/station.png";
import Init from "./init";
import Result from "./result";
import { isNav, isTimely } from "../../store";

interface IResult {
  title: string;
  msg: {
    msg1: string;
    msg2: string;
  };
  buttontext: string;
}

export default function Index() {
  const mapContext = Taro.createMapContext("map");
  const [windowHeight, setWindowHeight] = useState(0);
  const [isSerach, setIsSerach] = useState(false);
  const [confrim, setConfrim] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [mapscale, setMapscale] = useState(15);
  const [result, setResult] = useState<IResult | null>(null);
  const [polyline, setPolyline] = useState<MapProps.polyline[]>([]);
  const info = Taro.getSystemInfoSync();
  const setIsTimely = useSetRecoilState(isTimely);
  const setIsNavBoolen = useSetRecoilState(isNav);
  const polylinePoints1: MapProps.point[] = [];
  const polylinePoints2: MapProps.point[] = [];
  const polylinePoints3: MapProps.point[] = [];
  const polylinePoints4: MapProps.point[] = [];
  // let polylinePoints: MapProps.polyline[] = [];
  const [polylinePoints, setPolylinePoints] = useState<MapProps.polyline[]>([]);
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
    const markers: MapProps.marker[] = [];
    stations.forEach(({ name, latitude, longitude }, i) => {
      // if (i === 12) {
      markers.push({
        id: i,
        latitude,
        longitude,
        iconPath: icon,
        title: name,
        width: 30,
        height: 30
      });
      // }
    });
    mapContext.addMarkers({
      markers: markers
    });
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
    setPolylinePoints([
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
    ]);
    setPolyline([
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
    ]);
  }, []);

  useEffect(() => {
    if (!confrim && polylinePoints.length) {
      setPolyline(polylinePoints);
      console.log(polyline);
    }
  }, [confrim]);
  function enterSreach() {
    setIsSerach(true);
  }

  function onConfirm(val: string) {
    setConfrim(true);
    setWindowHeight(info.windowHeight * 0.6);
    let i = 0;
    for (const key in roads) {
      if (Object.prototype.hasOwnProperty.call(roads, key)) {
        const e = roads[key];
        if (val.match(new RegExp(e.bus))) {
          setResult({
            title: e.bus + "线",
            msg: {
              msg1: e.num,
              msg2: e.time
            },
            buttontext: "查看详情"
          });
          setMapscale(15);
          setHasResult(true);
          setPolyline([
            {
              points: polylinePoints[i].points,
              color: polylinePoints[i].color,
              width: 5,
              arrowLine: true
            }
          ]);
          return;
        }
        i++;
      }
    }
    for (let i = 0; i < stations.length; i++) {
      const e = stations[i];
      if (e.name.includes(val)) {
        const { latitude, longitude, owner, nearby } = e;
        setMapscale(19);
        mapContext.moveToLocation({
          latitude,
          longitude
        });
        setResult({
          title: e.name + "站",
          msg: {
            msg1: owner,
            msg2: nearby
          },
          buttontext: "路线规划"
        });
        setHasResult(true);
        return;
      } else {
        setHasResult(false);
        setResult(null);
      }
    }
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
      <View className={styles.nav}>
        <View
          className={styles.nav1}
          onClick={() => Taro.navigateTo({ url: "/pages/scancode/index" })}
        >
          扫一扫
        </View>
        <View
          className={styles.nav2}
          onClick={() => Taro.navigateTo({ url: "/pages/message/index" })}
        >
          消息中心
        </View>
        <View className={styles.funcs}>
          <View className={styles.title}>常用功能</View>
          <View className={styles.contain}>
            <View
              className={styles.func1}
              onClick={() => {
                Taro.switchTab({ url: "/pages/map/index" });
                setIsTimely(true);
              }}
            >
              实时巴士
            </View>
            <View
              className={styles.func2}
              onClick={() => {
                Taro.switchTab({ url: "/pages/map/index" });
                setIsNavBoolen(true);
              }}
            >
              路线规划
            </View>
            <View
              className={styles.func3}
              onClick={() =>
                Taro.navigateTo({ url: "/pages/busroad/index?initpage=0" })
              }
            >
              巴士线路
            </View>
          </View>
        </View>
      </View>
      <Map
        id="map"
        style={{
          width: "100%",
          height: windowHeight,
          transform: isSerach ? "translateY(-26vh)" : "translateY(100vh)"
        }}
        longitude={106.608}
        latitude={29.53}
        polyline={polyline}
        scale={mapscale}
        onMarkerTap={e => {
          isSerach && onConfirm(stations[e.detail.markerId].name);
        }}
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
              ? "translateY(10vh)"
              : "translateY(0vh)"
            : "translateY(50vh)"
        }}
        className={styles.queryWindow}
      >
        <View className={styles.quit} onClick={closeWindow}>
          X
        </View>
        {isSerach && confrim ? (
          <Result
            hasResult={hasResult}
            result={result}
            returnPre={() => {
              setConfrim(false);
            }}
          ></Result>
        ) : (
          <Init onConfirm={onConfirm}></Init>
        )}
      </View>
    </View>
  );
}
