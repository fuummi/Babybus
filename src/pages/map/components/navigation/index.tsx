import Taro from "@tarojs/taro";
import {
  View,
  Text,
  Button,
  Input,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import { useEffect, useState } from "react";
import { stations } from "../../../../assets/sation";

import styles from "./index.module.less";

interface IResult {
  name: string;
  latitude: number;
  longitude: number;
}

export default function Index(props: any) {
  const { topRes, returnPre, mapContext, setMapScale } = props;
  const [start, setStart] = useState("请选择起点");
  const [end, setEnd] = useState("请选择终点");
  const [closest, setClosest] = useState({
    station: "",
    dis: 0
  });
  const [sclect, setSclect] = useState(false);
  const [setMode, setSetMode] = useState(0);
  const [result, setResult] = useState<IResult[] | null>(null);
  useEffect(() => {
    if (sclect) setResult(null);
  }, [sclect]);
  useEffect(() => {
    findCloest();
  }, []);
  useEffect(() => {
    if (topRes !== null && sclect) {
      setResult(topRes);
    }
  }, [topRes]);
  function serach(val: string) {
    const res: IResult[] = [];
    for (let i = 0; i < stations.length; i++) {
      const e = stations[i];
      if (e.name.includes(val)) {
        const { latitude, longitude } = e;
        res.push({
          name: e.name + "站",
          latitude,
          longitude
        });
      }
    }
    if (res.length) {
      setMapScale(18);
      mapContext.moveToLocation({
        latitude: res[0].latitude,
        longitude: res[0].longitude
      });
      setResult(res);
    } else setResult(null);
  }
  function changeRes(n: number) {
    if (result !== null) {
      setMapScale(19);
      mapContext.moveToLocation({
        latitude: result[n].latitude - 0.0007,
        longitude: result[n].longitude
      });
    }
  }
  function setPoint(name: string) {
    if (!setMode) setStart(name);
    else {
      if (start === name) {
        Taro.showToast({
          title: "起点和终点相同！",
          icon: "error",
          duration: 1000
        });
      } else setEnd(name);
    }
    setSclect(false);
  }
  function findCloest() {
    let latitude;
    let longitude;
    Taro.getLocation({
      type: "gcj02",
      success: function(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        let cloestStation = "";
        let distance = 0;
        let min = 100;
        for (let i = 0; i < stations.length; i++) {
          const dis = 0;
          console.log(dis);
          if (dis < min) {
            cloestStation = stations[i].name;
            distance = dis;
          }
        }
        if (cloestStation !== "") {
          setClosest({
            station: cloestStation,
            dis: distance
          });
        }
        mapContext.addMarkers({
          markers: [
            {
              id: 1,
              latitude,
              longitude,
              iconPath: "../assets/icon/position.png"
            }
          ]
        });
      }
    });
  }
  return (
    <View className={styles.navWrap}>
      {!sclect ? (
        <>
          <View className={styles.title}>路线规划</View>
          <View className={styles.return} onClick={returnPre}>
            X
          </View>
          <View className={styles.recommend}>
            <View className={styles.title1}>距你最近</View>
            <View className={styles.stationicon}></View>
            <View className={styles.closest}>{closest.station}</View>
            <View className={styles.closestline}>距你{closest.dis}m</View>
            <Button></Button>
          </View>
          <View
            className={styles.start}
            onClick={() => {
              setSclect(true);
              setSetMode(0);
            }}
          >
            <Text>{start}</Text>
          </View>
          <View
            className={styles.end}
            onClick={() => {
              setSclect(true);
              setSetMode(1);
            }}
          >
            <Text>{end}</Text>
          </View>
          <Button className={styles.result}>规划</Button>
        </>
      ) : (
        <View className={styles.sclect}>
          <View className={styles.title}>选择站点</View>
          <Input
            onConfirm={e => {
              serach(e.target.value);
            }}
            placeholder="查询站名"
          />
          <View className={styles.tips}>
            Tips：点击地图中的站牌也可以设置站点哦~
          </View>
          <View className={styles.result}>
            <View className={styles.resultTitle}>搜索结果</View>
            {result === null ? (
              <View className={styles.nores}>无结果</View>
            ) : (
              <>
                <Swiper
                  className={styles.swiper}
                  indicatorDots={true}
                  indicatorColor="#999"
                  indicatorActiveColor="#333"
                  onChange={e => changeRes(e.target.current)}
                >
                  {result?.map(e => {
                    return (
                      <SwiperItem>
                        <View className={styles.resultName}>{e.name}</View>
                        <Button onClick={() => setPoint(e.name)}>设置</Button>
                      </SwiperItem>
                    );
                  })}
                </Swiper>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
