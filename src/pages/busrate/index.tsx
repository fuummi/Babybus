import { View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getBusRateFn, getMyRateFn } from "../../server/busrate";
import styles from "./index.module.less";

export default function Index(props: { initPage: number }) {
  const [currentTab, setCurrentTab] = useState(
    props.initPage ? props.initPage : 0
  );
  const [busrate, setBusrate] = useState<any>();
  const [myrate, setMyrate] = useState<any>();
  useEffect(() => {
    const instance = Taro.getCurrentInstance()
    getBusRate();
    getMyRate();
    setCurrentTab(Number(instance.router?.params.initpage))
  }, []);
  async function getBusRate() {
    // const res = await getBusRateFn()
    const res: any = [
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 1.5
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 4.5
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 2.5
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 0.5
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 2.5
      }
    ];
    res.forEach(e => {
      if (e.rate > 4) e.color = "green";
      else if (e.rate > 3) e.color = "yellow";
      else if (e.rate > 2) e.color = "orange";
      else if (e.rate > 1) e.color = "red";
      else e.color = "green";
    });
    setBusrate(res);
  }
  async function getMyRate() {
    // const res = await getMyRateFn()
    function timestampToYMD(timestamp) {
      var date = new Date(timestamp * 1000);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    }
    const res: any = [
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "1号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      }
    ];
    res.forEach(e => {
      //   e.time = timestampToYMD(e.time)
      if (e.rate > 4) e.color = "green";
      else if (e.rate > 3) e.color = "yellow";
      else if (e.rate > 2) e.color = "orange";
      else if (e.rate > 1) e.color = "red";
      else e.color = "green";
    });
    setMyrate(res);
  }
  return (
    <View className={styles.evaluationWrap}>
      <View className={styles.topTab}>
        <View
          className={styles.tab1}
          style={{ borderBottom: currentTab === 0 ? "5px solid #9747fe" : "" }}
          onClick={() => setCurrentTab(0)}
        >
          巴士评分
        </View>
        <View
          className={styles.tab2}
          style={{ borderBottom: currentTab === 1 ? "5px solid #9747fe" : "" }}
          onClick={() => setCurrentTab(1)}
        >
          历史评分
        </View>
      </View>
      <View className={styles.main}>
        {currentTab === 0 ? (
          <View className={styles.totalRate}>
            {busrate?.map(e => {
              return (
                <View className={styles.rateListItem}>
                  <View className={styles.busname}>{e.name}</View>
                  <View className={styles.busline}>所属：{e.owner}</View>
                  <View
                    className={styles.busrate}
                    style={{ backgroundColor: e.color }}
                  >
                    {e.rate}
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View className={styles.personRate}>
            {myrate?.map(e => {
              return (
                <View className={styles.rateListItem}>
                  <View className={styles.busname}>{e.name}</View>
                  <View className={styles.busline}>所属：{e.owner}</View>
                  <View className={styles.time}>{e.time}</View>
                  <View
                    className={styles.busrate}
                    style={{ backgroundColor: e.color }}
                  >
                    {e.rate}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}
