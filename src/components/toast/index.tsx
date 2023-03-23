import { View, Text, Image } from "@tarojs/components";
import styles from "./index.module.less";
interface IToastProps {
  toastData: { img: string; text: string };
  isToastShow: boolean;
}
export default function Index(props: IToastProps) {
  const { toastData, isToastShow } = props;
  return (
    <View
      style={{
        opacity: isToastShow ? "100" : "0",
        zIndex: isToastShow ? "20" : "-1"
      }}
      className={styles.toastWrap}
    >
      <View className={styles.main}>
        <Image src={toastData.img}></Image>
        <View className={styles.text}>{toastData.text}</View>
      </View>
    </View>
  );
}
