import Taro from "@tarojs/taro";

interface Res<T> {
  code: string;
  data?: T;
  info?: T;
}

const BASE_URL = "";

export default async function request<T>({
  url,
  data,
  method
}: {
  url: string;
  data?: Record<string, unknown>;
  method?: "GET" | "POST" | "DELETE";
}): Promise<Res<T>> {
  try {
    const token = Taro.getStorageSync("token");
    const res = await Taro.request({
      method,
      url: `${BASE_URL}/${url}`,
      data,
      header: {
        Authorization: `Bearer ${token}`
      }
    });
    const resData = res.data as Res<T>;
    return resData as Res<T>;
  } catch (err) {
    Taro.reLaunch({
      url: "/pages/person/index"
    });
    return Promise.reject(err);
  }
}
