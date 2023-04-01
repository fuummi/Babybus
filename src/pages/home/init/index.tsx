import { View, Input } from "@tarojs/components";
import styles from "./index.module.less";
interface IPropsFns {
  onConfirm: (val: string) => void;
}

export default function Index(props: IPropsFns) {
  const { onConfirm } = props;
  return (
    <View className={styles.initpage}>
      <View className={styles.title1}>搜索</View>
      {/* <View className={styles.recommend}>
        <View className={styles.title1}>距你最近</View>
        <View className={styles.stationicon}></View>
        <View className={styles.closest}>兴业苑站</View>
        <View className={styles.closestline}>距你800m</View>
      </View> */}
      <Input
        onConfirm={e => {
          onConfirm(e.target.value);
        }}
        placeholder="查询巴士站名及线路名"
      />
      <View className={styles.hot}>
        <View className={styles.title2}>热门搜索</View>
        {["二教", "三教", "千喜鹤食堂", "综合实验楼", "腾飞门", "一号线"].map(
          (e, i) => {
            return (
              <View
                onClick={() => {
                  onConfirm(e);
                }}
                key={i}
                className={styles.hotitem}
              >
                {e}
              </View>
            );
          }
        )}
      </View>
    </View>
  );
}
