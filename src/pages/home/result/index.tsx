import Taro from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import styles from "./index.module.less";
import stationicon from "../../../assets/icons/station.png";
import roadicon from "../../../assets/icons/road.png";

interface IResult {
  title: string;
  msg: {
    msg1: string;
    msg2: string;
  };
  buttontext: string;
}

interface IProps {
  hasResult: boolean;
  result: IResult | null;
  returnPre: () => void;
}
export default function Index(props: IProps) {
  const { hasResult, result, returnPre } = props;
  function btnOnclick() {
    if (result?.buttontext === "路线规划") {
    } else {
      console.log(123123);
      
      Taro.navigateTo({
        url: "/pages/busroad/index?initpage=0"
      });
    }
  }

  if (!hasResult) {
    return (
      <>
        <View className={styles.nores}>无结果</View>
        <Button onClick={returnPre}>返回上一级</Button>
      </>
    );
  } else {
    return (
      <View className={styles.resultpage}>
        <View className={styles.restltTitle}>{result?.title}</View>
        <Image
          src={result?.buttontext === "路线规划" ? stationicon : roadicon}
          className={styles.resultIcon}
        />
        <View className={styles.msg1}>{result?.msg.msg1}</View>
        <View className={styles.msg2}>{result?.msg.msg2}</View>
        <Button className={styles.firstBtn} onClick={btnOnclick}>{result?.buttontext}</Button>
        <Button className={styles.sceondBtn} onClick={returnPre}>
          返回上一级
        </Button>
      </View>
    );
  }
}
