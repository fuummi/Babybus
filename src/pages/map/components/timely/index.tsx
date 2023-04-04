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

export default function Index(props: any) {
  const { returnPre, mapContext, setMapScale } = props;
  const [closest, setClosest] = useState({
    station: "兴业苑站",
    dis: 500
  });
  const [moredata, setMoredata] = useState<any>([]);
  useEffect(() => {
    setMapScale(15);
    getData();
  }, []);
  function getData() {
    setMoredata([
      {
        name: "崇文门",
        latitude: 29.535833333333333 - 0.003,
        longitude: 106.60055555555556 + 0.0042,
        time: 5
      },
      {
        name: "综合实验楼",
        latitude: 29.529166666666665 - 0.003,
        longitude: 106.60194444444444 + 0.0038,
        time: 5
      },
      {
        name: "明理八",
        latitude: 29.532777777777778 - 0.0035,
        longitude: 106.605 + 0.0033,
        time: 5
      },
      {
        name: "千喜鹤食堂",
        latitude: 29.532777777777778 - 0.0027,
        longitude: 106.605 + 0.0039,
        time: 5
      },
      {
        name: "明理一",
        latitude: 29.53388888888889 - 0.00285,
        longitude: 106.60555555555555 + 0.0039,
        time: 5
      },
      {
        name: "八教",
        latitude: 29.537777777777777 - 0.00285,
        longitude: 106.60694444444445 + 0.00385,
        time: 5
      },
      {
        name: "三教",
        latitude: 29.538055555555555 - 0.00275,
        longitude: 106.60444444444444 + 0.0037,
        time: 5
      },
      {
        name: "腾飞门",
        latitude: 29.538055555555555 - 0.00275,
        longitude: 106.60166666666667 + 0.0038,
        time: 5
      },
      {
        name: "二教",
        latitude: 29.535555555555554 - 0.0032,
        longitude: 106.60166666666667 + 0.0053,
        time: 5
      },
      {
        name: "大西北食堂",
        latitude: 29.53361111111111 - 0.0028,
        longitude: 106.60388888888889 + 0.0039,
        time: 5
      },
      {
        name: "逸夫楼",
        latitude: 29.538055555555555 - 0.002,
        longitude: 106.60444444444444 + 0.0037,
        time: 5
      },
      {
        name: "经管学院",
        latitude: 29.538055555555555 - 0.00372,
        longitude: 106.60444444444444 + 0.00629,
        time: 5
      },
      {
        name: "兴业苑6舍", //16
        latitude: 29.535555555555554 - 0.00285,
        longitude: 106.60777777777778 + 0.00365,
        time: 5
      },
      {
        name: "物业管理中心", //17
        latitude: 29.53361111111111 - 0.0028,
        longitude: 106.60388888888889 + 0.0039,
        time: 5
      },
      {
        name: "南部校区十字路口", //18
        latitude: 29.529166666666665 - 0.0024,
        longitude: 106.60194444444444 + 0.00505,
        time: 5
      },
      {
        name: "宁静苑8舍",
        latitude: 29.531944444444445 - 0.0034,
        longitude: 106.60305555555556 + 0.0039,
        time: 5
      },
      {
        name: "樱花食堂",
        latitude: 29.532777777777778 - 0.00258,
        longitude: 106.605 + 0.00322,
        time: 5
      },
      {
        name: "荷花池",
        latitude: 29.535555555555554 - 0.0051,
        longitude: 106.60166666666667 + 0.0048,
        time: 5
      },
      {
        name: "重邮信科楼",
        latitude: 29.535555555555554 - 0.0044,
        longitude: 106.60166666666667 + 0.00256,
        time: 5
      },
      {
        name: "北校门路口",
        latitude: 29.538055555555555 - 0.0015,
        longitude: 106.60444444444444 + 0.0037,
        time: 5
      },
      {
        name: "国际学院",
        latitude: 29.538611111111113 - 0.00275,
        longitude: 106.60638888888889 + 0.0037,
        time: 5
      },
      {
        name: "后勤处",
        latitude: 29.531944444444445 - 0.00313,
        longitude: 106.60305555555556 + 0.0035,
        time: 5
      },
      {
        name: "南部校区80栋",
        latitude: 29.529166666666665 - 0.0053,
        longitude: 106.60194444444444 + 0.0057,
        time: 5
      }
    ]);
  }
  return (
    <View className={styles.timelyWrap}>
      <View className={styles.title}>实时巴士</View>
      <View className={styles.return} onClick={returnPre}>
        X
      </View>
      <View className={styles.recommend}>
        <View className={styles.title1}>距你最近</View>
        <View className={styles.stationicon}></View>
        <View className={styles.closest}>{closest.station}</View>
        <View className={styles.time}>
          {5}
          <Text>分钟</Text>
        </View>
      </View>
      <Button className={styles.refresh}></Button>
      <View className={styles.more}>
        <View className={styles.top11}>
          <View className={styles.title1}>查看更多</View>
          <View className={styles.open1}></View>
        </View>
        <View className={styles.body}>
          {moredata.map(e => {
            return (
              <View className={styles.listItem}>
                <View>{e.name}</View>
                <View>{e.time}</View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
