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
import { initFriendFn, findFriendsFn, bindingFn } from "../../server/friend";
import "./index.module.less";
import Toast from "../../components/toast";
import useToast from "../../components/toast/useToast";
import { ComponentType, useEffect, useRef, useState } from "react";

interface ISerachResult {
  id: string;
  image: string;
  nickname: string;
  day?: number;
}

export default function Index() {
  const [toastData, isToastShow, changeToastVisible] = useToast();
  const [isSerach, setIsSerach] = useState(false);
  const [myFriend, setMyFriend] = useState<ISerachResult[]>();
  const [serachResult, setSerachResult] = useState<ISerachResult[]>();
  const [inputValue, setInputValue] = useState("");
  const input = useRef<ComponentType<InputProps>>();

  useEffect(() => {
    initFriend();
  }, []);

  async function initFriend() {
    // const res = await initFriendFn();
    // setMyFriend(res.data)
    setMyFriend([
      {
        id: "uint",
        image: logo,
        nickname: "aa",
        day: 365
      },
      {
        id: "uint",
        image: logo,
        nickname: "bb",
        day: 365
      },
      {
        id: "uint",
        image: logo,
        nickname: "cc",
        day: 365
      },
      {
        id: "uint",
        image: logo,
        nickname: "dd",
        day: 365
      }
    ]);
  }
  async function share(id, nickname, avata) {
    changeToastVisible("success", "发起邀请成功！");
    Taro.navigateTo({
      url: `/pages/shearposition/index?id=${id}&nickname=${nickname}&avata=${avata}`
    });
  }

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
        // style={{ display: isSerach ? "block" : "none" }}
      >
        已绑定的好友
      </View>
      <View className={styles.list}>
        {myFriend?.map(e => {
          return (
            <View key={e.id} className={styles.listitem}>
              <Image src={e.image}></Image>
              <Text className={styles.username}>{e.nickname}</Text>
              <Text className={styles.day}>成为好友{e.day}天</Text>
              <Button onClick={() => share(e.id, e.nickname, e.image)}>
                发起共享
              </Button>
            </View>
          );
        })}
      </View>
      <View
        className={styles.serachlist}
        style={{
          zIndex: isSerach ? "2" : "-1",
          transition: isSerach ? "none" : "all 500ms"
        }}
      >
        <View
          className={styles.back}
          style={{
            opacity: isSerach ? "100" : "0"
          }}
          onClick={() => {
            setIsSerach(false);
          }}
        ></View>
        <View
          className={styles.main}
          style={{
            transform: isSerach ? "translateY(0)" : "translateY(60vh)"
          }}
        >
          <View className={styles.serachtitle}>搜索结果</View>
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
      </View>
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
