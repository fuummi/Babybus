import { View, Image, Button } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";
import { loginFn, quitLoginFn } from "../../server/login";

export default function Index() {
  const [userInfo, setUserInfo] = useState({
    nickname: "点击登录",
    avata: logo
  });
  useEffect(() => {
    // const token = Taro.getStorageSync("token");
    if (Taro.getStorageSync("userInfo") !== "") {
      const userInfo = Taro.getStorageSync("userInfo");
      setUserInfo({
        nickname: userInfo.nickname,
        avata: userInfo.avata
      });
    }
  }, []);
  function logIn() {
    if (Taro.getStorageSync("userInfo") !== "") return;
    Taro.getUserProfile({
      desc: "使用您的微信头像和昵称",
      success(res) {
        console.log(res);
        setUserInfo({
          nickname: res.userInfo.nickName,
          avata: res.userInfo.avatarUrl
        });
        Taro.setStorageSync("userInfo", {
          nickname: res.userInfo.nickName,
          avata: res.userInfo.avatarUrl,
        });
      }
    });
    // Taro.login({
    //   async success(val) {
    //     const result = await loginFn(val.code);
    //     Taro.setStorageSync("token", result.data.token);
    //   }
    // });
  }

  async function quitLogin() {
    if (Taro.getStorageSync("token") !== "") return;
    // const token: string = Taro.getStorageSync("token");
    // const res = await quitLoginFn(token);
    // if (res.code === "200") {
      Taro.setStorageSync("token", "");
      Taro.setStorageSync("userInfo", "");
      setUserInfo({
        nickname: '点击登录',
        avata: logo
      });
    // }
  }

  return (
    <View className={styles.wrap}>
      <View className={styles.header}>
        <Image className={styles.background} src={logo}></Image>
        <View className={styles.user}>
          <Image src={userInfo.avata}></Image>
          <View className={styles.nickname} onClick={logIn}>
            {userInfo.nickname}
          </View>
          <View className={styles.uid}></View>
        </View>
      </View>
      <View className={styles.main}>
        <View className={styles.evaluation}>历史评价</View>
        <View className={styles.friend}>好友关系</View>
        <View className={styles.routes}>常用线路</View>
        <View className={styles.person}>个人信息</View>
      </View>
      <Button className={styles.quit} onClick={quitLogin}>
        退出登录
      </Button>
    </View>
  );
}
