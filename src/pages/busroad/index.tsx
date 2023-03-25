import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getAllBusFn, getMyBusFn, addMyBusFn } from "../../server/bus";
import useToast from "../../components/toast/useToast";
import Toast from "../../components/toast/index";
import styles from "./index.module.less";

export default function Index() {
  const [currentTab, setCurrentTab] = useState(0);
  const [total, setTotal] = useState<any>();
  const [myroad, setMyroad] = useState<any>();
  const [toastData, isToastShow, changeToastVisible] = useToast();
  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    setCurrentTab(Number(instance.router?.params.initpage));
    getTotalBus();
    getMyBus();
  }, []);
  async function getTotalBus() {
    // const res = await getAllBusFn();
    setTotal([
      {
        name: "一号线",
        id: "1",
        station: [
          "AAAA",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q"
        ]
      },
      {
        name: "二号线",
        id: "2",
        station: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q"
        ]
      },
      {
        name: "三号线",
        id: "3",
        station: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q"
        ]
      }
    ]);
  }
  async function getMyBus() {
    // const res = await getMyBusFn();
    setMyroad([
      {
        name: "一号线",
        id: "1",
        station: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q"
        ]
      },
      {
        name: "二号线",
        id: "2",
        station: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q"
        ]
      }
    ]);
  }
  async function addMyBus(id: string) {
    // const res = await addMyBusFn(id)
    changeToastVisible("success", "添加常用线路成功！");
  }
  return (
    <View className={styles.busroadWrap}>
      <View className={styles.topTab}>
        <View
          className={styles.tab1}
          style={{ borderBottom: currentTab === 0 ? "5px solid #9747fe" : "" }}
          onClick={() => setCurrentTab(0)}
        >
          所有线路
        </View>
        <View
          className={styles.tab2}
          style={{ borderBottom: currentTab === 1 ? "5px solid #9747fe" : "" }}
          onClick={() => setCurrentTab(1)}
        >
          常用线路
        </View>
      </View>
      <View className={styles.main}>
        {currentTab === 0 ? (
          <View className={styles.total}>
            {total?.map(e => {
              return (
                <View className={styles.listItem} key={e.id}>
                  <View className={styles.busname}>{e.name}</View>
                  <View className={styles.station}>
                    {e.station.map(e => {
                      return <View className={styles.stations}>{e}</View>;
                    })}
                  </View>
                  <Button
                    className={styles.addBus}
                    onClick={() => addMyBus(e.id)}
                  >
                    加入常用线路
                  </Button>
                </View>
              );
            })}
          </View>
        ) : (
          <View className={styles.person}>
            {myroad?.map(e => {
              return (
                <View className={styles.listItem} key={e.id}>
                  <View className={styles.busname}>{e.name}</View>
                  <View className={styles.station}>
                    {e.station.map(e => {
                      return <View className={styles.stations}>{e}</View>;
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
