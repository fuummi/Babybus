import { View, Image, Button } from "@tarojs/components";
import { useEffect } from "react";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";

export default function Index() {
  useEffect(() => {
    const userinfo = Taro.getStorageSync("userinfo");
    console.log(userinfo);
    
    if (userinfo !== '') {

    }
  }, []);

  return (
    <View className={styles.wrap}>
      <View className={styles.header}>
        <Image className={styles.background} src={logo}></Image>
        <View className={styles.user}>
          <Image src={logo}></Image>
          <View className={styles.nickname}>点击登录</View>
          <View className={styles.uid}></View>
        </View>
      </View>
      <View className={styles.main}>
        <View className={styles.evaluation}>历史评价</View>
        <View className={styles.friend}>好友关系</View>
        <View className={styles.routes}>常用线路</View>
        <View className={styles.person}>个人信息</View>
      </View>
      <Button className={styles.quit}>退出登录</Button>
    </View>
  );
}
