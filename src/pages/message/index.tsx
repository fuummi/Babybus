import { View, Image, Button } from "@tarojs/components";
import { useEffect, useState } from "react";
// import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";
import useToast from "../../components/toast/useToast";
import Toast from "../../components/toast";

export default function Index() {
  const [toastData, isToastShow, changeToastVisible] = useToast();
  const [result, setResult] = useState<any[]>([]);
  useEffect(() => {
    getMsg();
  }, []);
  function getMsg() {
    setResult([
      {
        id: "0001",
        nickname: "0001",
        title: "好友申请",
        msg: "申请加你为好友",
        avata: logo,
        status: "waiting"
      },
      {
        id: "0002",
        nickname: "0002",
        title: "好友申请",
        msg: "申请加你为好友",
        avata: logo,
        status: "waiting"
      },
      {
        id: "0003",
        nickname: "0003",
        title: "好友申请",
        msg: "申请加你为好友",
        avata: logo,
        status: "received"
      },
      {
        id: "0004",
        nickname: "0004",
        title: "好友申请",
        msg: "申请加你为好友",
        avata: logo,
        status: "rejected"
      },
      {
        id: "0005",
        nickname: "0005",
        title: "留言",
        msg: "你好",
        avata: logo,
        status: "response"
      },
      {
        id: "0006",
        nickname: "0006",
        title: "留言",
        msg: "你是谁",
        avata: logo,
        status: "response"
      },
      {
        id: "0007",
        nickname: "0007",
        title: "留言",
        msg: "你好",
        avata: logo,
        status: "response"
      }
    ]);
  }
  function btnClick(i) {
    changeToastVisible("success", "添加好友成功！");
    let tempArr = result;
    tempArr[i].status = "received";
    setResult(tempArr);
  }
  return (
    <View className={styles.wrap}>
      {result.map((e, i) => {
        return (
          <View className={styles.item}>
            <Image src={e.avata}></Image>
            <View className={styles.title}>{e.nickname}：{e.title}</View>
            <View className={styles.msg}>{e.msg}</View>
            <Button
              style={{
                display: e.status === "response" ? "none" : "block",
                backgroundColor:
                  e.status === "waiting"
                    ? "#fee7a4"
                    : e.status === "received"
                    ? "#aff2c6"
                    : "#fec7c4"
              }}
              disabled={e.status === "waiting" ? false : true}
              onClick={() => btnClick(i)}
            >
              {e.status === "waiting"
                ? "接受"
                : e.status === "received"
                ? "已接受"
                : "已拒绝"}
            </Button>
          </View>
        );
      })}
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
