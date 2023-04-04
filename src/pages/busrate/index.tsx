import { View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getBusRateFn, getMyRateFn } from "../../server/busrate";
import styles from "./index.module.less";

export default function Index() {
  const [currentTab, setCurrentTab] = useState(0);
  const [busrate, setBusrate] = useState<any>();
  const [myrate, setMyrate] = useState<any>();
  const [listHeight, setListHeight] = useState<number[]>([]);
  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    getBusRate();
    getMyRate();
    // setCurrentTab(Number(instance.router?.params.initpage));
    setCurrentTab(0);
  }, []);
  async function getBusRate() {
    // const res = await getBusRateFn()
    const res: any = [
      {
        id: "1",
        name: "1号车",
        owner: "一号线",
        rate: 2
      },
      {
        id: "1",
        name: "1号车",
        owner: "三号线",
        rate: 4
      },
      {
        id: "1",
        name: "1号车",
        owner: "一号线",
        rate: 5
      },
      {
        id: "1",
        name: "1号车",
        owner: "二号线",
        rate: 1
      },
      {
        id: "1",
        name: "1号车",
        owner: "二号线",
        rate: 4
      },
      {
        id: "1",
        name: "1号车",
        owner: "一号线",
        rate: 3
      }
    ];
    const tempRes: any = [[], [], []];
    res.forEach(e => {
      if (e.rate > 4) e.color = "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)";
      else if (e.rate > 3) e.color = "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)";
      else if (e.rate > 2) e.color = "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)";
      else if (e.rate > 0) e.color = "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)";
      else e.color = "red";
      switch (e.owner) {
        case "一号线":
          tempRes[0].push(e);
          break;
        case "二号线":
          tempRes[1].push(e);
          break;
        case "三号线":
          tempRes[2].push(e);
          break;
      }
    });
    setListHeight([0, 0, 0]);
    setBusrate(tempRes);
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
        owner: "一号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "三号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "一号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "二号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "二号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      },
      {
        id: "1",
        name: "1号车",
        owner: "一号线",
        rate: 3.5,
        time: timestampToYMD(1679680806)
      }
    ];
    res.forEach(e => {
      if (e.rate > 4) e.color = "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)";
      else if (e.rate > 3) e.color = "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)";
      else if (e.rate > 2) e.color = "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)";
      else if (e.rate > 0) e.color = "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)";
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
            {busrate?.map((e, i) => {
              return (
                <View
                  className={styles.owner}
                  onClick={() => {
                    const temp = listHeight;
                    if (temp[i]) temp[i] = 0;
                    else temp[i] = e.length * 20;
                    setListHeight([...temp]);
                  }}
                >
                  <View className={styles.top}>
                    <Text className={styles.title}>{e[0].owner}</Text>
                    <Text
                      className={styles.open}
                      style={{
                        transform: listHeight[i]
                          ? "rotate(0deg)"
                          : "rotate(180deg)"
                      }}
                    ></Text>
                  </View>
                  <View
                    className={styles.body}
                    style={{ height: listHeight[i] + "vw" }}
                  >
                    {e?.map(e => {
                      return (
                        <View className={styles.rateListItem}>
                          <View className={styles.busname}>{e.name}</View>
                          <View className={styles.busline}>
                            所属：{e.owner}
                          </View>
                          <View
                            className={styles.busrate}
                            style={{ backgroundImage: e.color }}
                          >
                            {e.rate}
                          </View>
                        </View>
                      );
                    })}
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
                    style={{ backgroundImage: e.color }}
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
