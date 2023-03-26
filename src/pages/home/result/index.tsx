import { View, Button, Image } from "@tarojs/components";
import styles from "./index.module.less";
import icon from "../../../assets/icons/station.png";

interface IResult {
  title: string;
  msg: {
    msg1: string;
    msg2: string;
  };
  buttontext: string;
}
export default function Index(props: IResult) {
  const { title, msg, buttontext } = props;
  return (
    <View className={styles.resultpage}>
      <View className={styles.restltTitle}>{title}站</View>
      <Image src={icon} className={styles.resultIcon} />
      <View className={styles.msg1}>{msg.msg1}</View>
      <View className={styles.msg2}>{msg.msg2}</View>
      <Button>{buttontext}</Button>
    </View>
  );
}
