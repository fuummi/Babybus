export default defineAppConfig({
  pages: [
    "pages/friend/index",
    "pages/personal/index",
    "pages/home/index",
    "pages/map/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    custom: true,
    color: "#000000",
    selectedColor: "#000000",
    backgroundColor: "#000000",
    list: [
      {
        pagePath: "pages/home/index",
        text: "主页",
        iconPath: "./assets/icons/home.png",
        selectedIconPath: "./assets/icons/home.png"
      },
      {
        pagePath: "pages/map/index",
        text: "地图",
        iconPath: "./assets/icons/position.png",
        selectedIconPath: "./assets/icons/position.png"
      },
      {
        pagePath: "pages/personal/index",
        text: "个人",
        iconPath: "./assets/icons/user.png",
        selectedIconPath: "./assets/icons/user.png"
      }
    ]
  },
  plugins: {
    chooseLocation: {
      version: "1.0.10",
      provider: "wx76a9a06e5b4e693e"
    }
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序定位"
    }
  }
});
