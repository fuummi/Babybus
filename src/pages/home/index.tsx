import { View, Text } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { useEffect } from "react";
import "./index.module.less";

export default function Index(props) {
  
  return (
    <View className='index'>
      <Text>首页</Text>
    </View>
  );
}
