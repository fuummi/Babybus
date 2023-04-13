import { View, Text, Map, MapProps } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { stations, roads } from "../../assets/sation";
import icon from "../../assets/icons/station.png";
import Navgation from "./components/navigation/index";
import Timely from "./components/timely";

interface IResult {
  name: string;
  latitude: number;
  longitude: number;
}

export default function Index() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [close, setClose] = useState(2);
  const [page, setPage] = useState(2);
  const [mapScale, setMapScale] = useState(16);
  const [topRes, setTopRes] = useState<IResult[] | null>(null);
  const mapContext = Taro.createMapContext("map");
  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    setWindowHeight(info.windowHeight * 0.88);
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
  // const polyline2: MapProps.polyline = [

  // ];
  // const polyline3: MapProps.polyline[] = [

  // ];
  // const polyline4: MapProps.polyline[] = [

  // ];
  // console.log(polyline);
  function navSclect(n: number) {
    if (page === 1) {
      console.log(n);
      setTopRes([
        {
          name: stations[n].name,
          latitude: stations[n].latitude,
          longitude: stations[n].longitude
        }
      ]);
    }
  }
  return (
    <View>
      <Map
        id="map"
        style={{ width: "100%", height: windowHeight, position: "absolute" }}
        longitude={106.608}
        latitude={29.53}
        polyline={polyline}
        scale={mapScale}
        onMarkerTap={e => {
          navSclect(e.markerId);
        }}
      ></Map>
      {page === 0 ? (
        <View
          className={styles.tab}
          style={{ transform: `translateY(${close}vh)` }}
        >
          <View className={styles.navigation} onClick={() => setPage(1)}>
            路线规划
          </View>
          <View className={styles.right}>
            <View className={styles.friend} onClick={() => setPage(2)}>
              实时巴士
            </View>
            <View
              className={styles.info}
              onClick={() => Taro.navigateTo({ url: "../friend/index" })}
            >
              寻友路线
            </View>
          </View>
          <View
            className={styles.closeTab}
            onClick={() => setClose(close === 22 ? 2 : 22)}
          >
            {close === 22 ? "^" : "x"}
          </View>
        </View>
      ) : (
        ""
      )}
      {page === 1 ? (
        <Navgation
          topRes={topRes}
          returnPre={() => setPage(0)}
          mapContext={mapContext}
          setMapScale={setMapScale}
        ></Navgation>
      ) : (
        ""
      )}
      {page === 2 ? (
        <Timely
          returnPre={() => setPage(0)}
          mapContext={mapContext}
          setMapScale={setMapScale}
        ></Timely>
      ) : (
        ""
      )}
    </View>
  );
}
