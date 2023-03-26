import {
  View,
  Input
} from "@tarojs/components";
import styles from "./index.module.less";
interface IPropsFns {
  setSerachValue: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: () => void;
  setConfrim: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Index(props: IPropsFns) {
  const { setSerachValue, onConfirm, setConfrim } = props;
  return (
    <View className={styles.initpage}>
      <View className={styles.recommend}>
        <View className={styles.title1}>距你最近</View>
        <View className={styles.stationicon}></View>
        <View className={styles.closest}>兴业苑站</View>
        <View className={styles.closestline}>途径：一号线</View>
      </View>
      <Input
        onInput={e => {
          setSerachValue(e.target.value);
        }}
        onConfirm={() => {
          onConfirm();
          setConfrim(true);
        }}
        placeholder="查询巴士站名及线路名"
      />
      <View className={styles.hot}>
        <View className={styles.title2}>热门搜索</View>
        {[
          "二教",
          "三教",
          "实验楼",
          "千喜鹤食堂",
          "综合实验楼",
          "腾飞门",
          "一号线"
        ].map(e => {
          return <View className={styles.hotitem}>{e}</View>;
        })}
      </View>
    </View>
  );
}
