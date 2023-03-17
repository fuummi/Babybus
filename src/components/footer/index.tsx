import { View, Text, Image } from "@tarojs/components";
import { useSetRecoilState } from 'recoil';
import styles from "./index.module.less";
import homeicon from "../../assets/icons/home.png";
import positionicon from "../../assets/icons/position.png";
import usericon from "../../assets/icons/user.png";
import { nowPageState } from "../../store/index";

export default function Index(props) {
  const setNowPageState = useSetRecoilState(nowPageState);
  return (
    <View className={styles.footer}>
      <View className={styles.page1} onClick={() => setNowPageState("index")}>
        <Image src={homeicon}></Image>
        <Text>首页</Text>
      </View>
      <View className={styles.page2} onClick={() => setNowPageState("map")}>
        <Image src={positionicon}></Image>
        <Text>地图</Text>
      </View>
      <View className={styles.page3} onClick={() => setNowPageState("personal")}>
        <Image src={usericon}></Image>
        <Text>我的</Text>
      </View>
    </View>
  );
}
