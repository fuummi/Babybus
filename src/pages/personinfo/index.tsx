import { View, Image, Button, Input } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import styles from "./index.module.less";
import logo from "../../assets/logo.jpg";
import { loginFn, quitLoginFn } from "../../server/login";
import useToast from "../../components/toast/useToast";
import Toast from "../../components/toast";

export default function Index() {
  const [avata, setAvata] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<string | "保密">("保密");
  const [listopen, setListopen] = useState(false);
  const [toastData, isToastShow, changeToastVisible] = useToast();
  useEffect(() => {
    // const token = Taro.getStorageSync("token");
    if (Taro.getStorageSync("userInfo") !== "") {
      const userInfo = Taro.getStorageSync("userInfo");
      setAvata(userInfo.avata);
      setNickname(userInfo.nickname);
      setGender(userInfo.gender);
      setAge(userInfo.age ? userInfo.age : "保密");
    }
  }, []);
  function save() {
    changeToastVisible("success", "保存修改成功！");
  }

  async function uploadpic() {
    Taro.showActionSheet({
      itemList: ["拍照", "手机相册"],
      success: function(res) {
        Taro.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: [res.tapIndex === 1 ? "album" : "camera"],
          success: async res => {
            setAvata(res.tempFilePaths[0]);
          }
        });
      }
    });
  }

  return (
    <View className={styles.wrap}>
      <View className={styles.header}>
        <View className={styles.user}>
          <Image src={avata}></Image>
          <View className={styles.nickname}>{nickname}</View>
          <View className={styles.uid}>uid:???</View>
        </View>
      </View>
      <View className={styles.main}>
        <View className={styles.item}>
          <View className={styles.left}>昵称</View>
          <View className={styles.right}>
            <Input value={nickname}></Input>
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles.left}>年龄</View>
          <View className={styles.right}>
            <Input value={age}></Input>
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles.left}>性别</View>
          <View className={styles.right}>
            <View
              className={styles.value}
              onClick={() => setListopen(!listopen)}
            >
              {gender === "0" ? "男" : "女"}
            </View>
            <View
              className={[
                styles.downlist,
                listopen ? styles.open : styles.close
              ].join(" ")}
            >
              <View
                className={styles.item1}
                onClick={() => {
                  setGender("0");
                  setListopen(!listopen);
                }}
              >
                男
              </View>
              <View
                className={styles.item2}
                onClick={() => {
                  setGender("1");
                  setListopen(!listopen);
                }}
              >
                女
              </View>
            </View>
          </View>
        </View>
        <View className={styles.item}>
          <View className={styles.left}>头像</View>
          <View className={styles.right}>
            <Button className={styles.uploadpic} onClick={uploadpic}>
              点击上传图片
            </Button>
          </View>
        </View>
      </View>
      <Button className={styles.save} onClick={save}>
        保存修改
      </Button>
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
