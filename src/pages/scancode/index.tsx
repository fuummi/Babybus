import { View, Text, Button } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import Toast from "../../components/toast";
import useToast from "../../components/toast/useToast";
import { getBusRateFn, getMyRateFn } from "../../server/busrate";
import styles from "./index.module.less";

export default function Index() {
  const [toastData, isToastShow, changeToastVisible] = useToast();
  const [rate, setRate] = useState(0);
  const [res, setRes] = useState<{
    busid: string;
    busname: string;
    busline: string;
  }>({
    busid: "",
    busname: "",
    busline: ""
  });
  useEffect(() => {
    Taro.scanCode({
      onlyFromCamera: true,
      success: res => {
        console.log(res.result);
        setRes({
          busid: "1",
          busname: "A0101",
          busline: "一号线"
        });
      }
    });
  }, []);
  function setUsed() {
    changeToastVisible("success", "设置成功！");
  }
  function submit() {
    if (rate === 0) return;
    changeToastVisible("success", "感谢您的评分！");
    setTimeout(() => {
      returnPre();
    }, 2000);
  }
  function returnPre() {
    Taro.navigateBack();
  }
  return (
    <View className={styles.rateWrap}>
      <View className={styles.message}>
        {/* <View className={styles.title}>扫码结果</View> */}
        <View className={styles.busname}>
          巴士名：<Text>{res.busname}</Text>
        </View>
        <View className={styles.busline}>
          所属线路：<Text>{res.busline}</Text>
        </View>
        <Button onClick={setUsed}>将此线路设为常用线路</Button>
      </View>
      <View className={styles.rate}>
        <View className={styles.title1}>感谢你的乘坐</View>
        <View className={styles.title2}>请为本巴士打个分吧！</View>
        <View className={styles.stars}>
          {[0, 1, 2, 3, 4].map((e, i) => {
            return (
              <View
                onClick={() => setRate(i + 1)}
                className={[
                  styles.star,
                  rate && rate >= i + 1 ? styles.star_active : ""
                ].join(" ")}
              ></View>
            );
          })}
        </View>
        <Button
          className={styles.submit}
          onClick={submit}
          style={{
            backgroundColor: rate === 0 ? "#cecece" : "#00a13b"
          }}
        >
          提交
        </Button>
        <View className={styles.jump} onClick={() => returnPre()}>
          跳过
        </View>
      </View>
      <Toast toastData={toastData} isToastShow={isToastShow}></Toast>
    </View>
  );
}
