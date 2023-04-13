import { View, Image, Button, Textarea } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";
import icon from "../../assets/icons/station.png";
import useToast from "../../components/toast/useToast";
import Toast from "../../components/toast";

export default function Index() {
  const [toastData, isToastShow, changeToastVisible] = useToast();
  const [friendMsg, setFriendMsg] = useState({
    avata: logo,
    nickname: "好友1"
  });
  function sendmsg(){
    changeToastVisible('success','发送消息成功！')
    setTimeout(() => {
      Taro.navigateBack()
    }, 2000);
  }
  return (
    <View className={styles.wrap}>
      <View className={styles.head}>
        <View className={styles.title}>发送给：{friendMsg.nickname}</View>
        <Image src={friendMsg.avata}></Image>
      </View>
      <View className={styles.hint}>留言内容：</View>
      <Textarea placeholder="请输入留言"></Textarea>
      <Button onClick={sendmsg}>发送</Button>
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
