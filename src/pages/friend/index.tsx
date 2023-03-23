import {
  View,
  Text,
  Input,
  Image,
  Button,
  InputProps
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";
import { findFriendsFn, bindingFn } from "../../server/friend";
import "./index.module.less";
import Toast from "../../components/toast";
import useToast from "../../components/toast/useToast";
import { ComponentType, useRef, useState } from "react";

interface ISerachResult {
  id: string;
  image: string;
  nickname: string;
}

export default function Index() {
  const [toastData, isToastShow, changeToastVisible] = useToast();
  const [isSerach, setIsSerach] = useState(false);
  const [serachResult, setSerachResult] = useState<ISerachResult[]>();
  const [inputValue, setInputValue] = useState("");
  const input = useRef<ComponentType<InputProps>>();
  async function binding(friendId: string) {
    // const res = await bindingFn(friendId);
    // if (res.code === "200") {

    changeToastVisible("success", "绑定好友成功！");
    // }
  }

  async function serach(e) {
    // const res = await findFriendsFn(inputValue);
    // if (res.code === "200") {
    setIsSerach(true);
    setSerachResult([
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      },
      {
        id: "uint",
        image: logo,
        nickname: "string"
      }
    ]);
    // }
  }

  return (
    <View className={styles.friendwrap}>
      <View className={styles.serach}>
        <Input
          onInput={e => setInputValue(e.currentTarget.value)}
          ref={input}
          placeholder="请输入好友名称"
        ></Input>
        <Button className={styles.btn} onClick={e => serach(e)}>
          搜索
        </Button>
      </View>
      <View
        className={styles.title}
        style={{ display: isSerach ? "block" : "none" }}
      >
        搜索结果：
      </View>
      <View
        className={styles.list}
        style={{ borderColor: isSerach ? "#c7c2c8" : "#00000000" }}
      >
        {serachResult?.map(e => {
          return (
            <View key={e.id} className={styles.listitem}>
              <Image src={e.image}></Image>
              <Text className={styles.username}>{e.nickname}</Text>
              <Button onClick={() => binding(e.id)}>邀请绑定</Button>
            </View>
          );
        })}
      </View>
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
