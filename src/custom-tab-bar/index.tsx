import Taro from "@tarojs/taro";
import { CoverImage, CoverView } from "@tarojs/components";
import styles from "./index.module.less";

export default function CustomTabBar() {
  const list = [
    {
      pagePath: "../home/index",
      text: "主页",
      iconPath: "/assets/icons/home.png",
      selectedIconPath: "/assets/icons/home.png"
    },
    {
      pagePath: "../map/index",
      text: "地图",
      iconPath: "/assets/icons/position.png",
      selectedIconPath: "/assets/icons/position.png"
    },
    {
      pagePath: "../personal/index",
      text: "个人",
      iconPath: "/assets/icons/user.png",
      selectedIconPath: "/assets/icons/user.png"
    }
  ];
  function switchTab(route) {
    Taro.switchTab({
      url: route
    });
  }

  return (
    <CoverView className={styles.footer} style={{ overflow: "visible" }}>
      {list.map((item, index) => {
        return (
          <CoverView
            key={index}
            className={item.text === "地图" ? styles.map : ""}
            onClick={() => switchTab(item.pagePath)}
          >
            <CoverImage className={styles.image} src={item.iconPath} />
            <CoverView className={styles.text}>{item.text}</CoverView>
          </CoverView>
        );
      })}
    </CoverView>
  );
}
