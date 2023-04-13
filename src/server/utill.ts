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



export const road1 = [
  {
    name: "崇文门",
    latitude: 29.535833333333333 - 0.003,
    longitude: 106.60055555555556 + 0.0042
  },
  {
    name: "崇文门1",
    latitude: 29.535833333333333 - 0.00405,
    longitude: 106.60055555555556 + 0.00373
  },
  {
    name: "崇文门2",
    latitude: 29.535833333333333 - 0.0065,
    longitude: 106.60055555555556 + 0.00371
  },
  {
    name: "宁静苑",
    latitude: 29.531944444444445 - 0.00265,
    longitude: 106.60305555555556 + 0.0039
  },
  {
    name: "宁静苑",
    latitude: 29.531944444444445 - 0.0028,
    longitude: 106.60305555555556 + 0.0039
  }
];

export const road2 = [
  {
    name: "综合实验楼",
    latitude: 29.529166666666665 - 0.003,
    longitude: 106.60194444444444 + 0.00375
  },
  {
    name: "综合实验楼1",
    latitude: 29.529166666666665 - 0.00242,
    longitude: 106.60194444444444 + 0.00371
  },
  {
    name: "综合实验楼2",
    latitude: 29.529166666666665 - 0.0024,
    longitude: 106.60194444444444 + 0.00502
  },
  {
    name: "宁静苑",
    latitude: 29.531944444444445 - 0.0028,
    longitude: 106.60305555555556 + 0.0039
  },
  {
    name: "二教",
    latitude: 29.535555555555554 - 0.0032,
    longitude: 106.60166666666667 + 0.0053
  },
  {
    name: "二教1",
    latitude: 29.535555555555554 - 0.00165,
    longitude: 106.60166666666667 + 0.00529
  },
  {
    name: "二教2",
    latitude: 29.535555555555554 - 0.0013,
    longitude: 106.60166666666667 + 0.00506
  },
  {
    name: "二教3",
    latitude: 29.535555555555554 - 0.0011,
    longitude: 106.60166666666667 + 0.00513
  },
  {
    name: "二教4",
    latitude: 29.538055555555555 - 0.00275,
    longitude: 106.60166666666667 + 0.0052
  },
  {
    name: "三教",
    latitude: 29.538055555555555 - 0.00275,
    longitude: 106.60444444444444 + 0.0037
  },
  {
    name: "三教1",
    latitude: 29.538055555555555 - 0.00144,
    longitude: 106.60444444444444 + 0.0037
  },
  {
    name: "三教2",
    latitude: 29.538055555555555 - 0.00145,
    longitude: 106.60444444444444 + 0.0052
  },
  {
    name: "三教3",
    latitude: 29.538055555555555 - 0.0016,
    longitude: 106.60444444444444 + 0.00548
  },
  {
    name: "四教",
    latitude: 29.538055555555555 - 0.00218,
    longitude: 106.60444444444444 + 0.00565
  },
  {
    name: "四教1",
    latitude: 29.538055555555555 - 0.0022,
    longitude: 106.60444444444444 + 0.00625
  },
  {
    name: "四教2",
    latitude: 29.538055555555555 - 0.0023,
    longitude: 106.60444444444444 + 0.0063
  },
  {
    name: "八教",
    latitude: 29.537777777777777 - 0.00285,
    longitude: 106.60694444444445 + 0.0038
  },
  {
    name: "八教2",
    latitude: 29.537777777777777 - 0.00365,
    longitude: 106.60694444444445 + 0.0038
  },
  {
    name: "八教3",
    latitude: 29.537777777777777 - 0.00385,
    longitude: 106.60694444444445 + 0.00395
  },
  {
    name: "八教4",
    latitude: 29.537777777777777 - 0.004,
    longitude: 106.60694444444445 + 0.0044
  },
  {
    name: "兴业苑",
    latitude: 29.535555555555554 - 0.00285,
    longitude: 106.60777777777778 + 0.0036
  },
  {
    name: "兴业苑2",
    latitude: 29.535555555555554 - 0.0045,
    longitude: 106.60777777777778 + 0.0036
  },
  {
    name: "兴业苑3",
    latitude: 29.535555555555554 - 0.00452,
    longitude: 106.60777777777778 + 0.0015
  },
  {
    name: "明理1",
    latitude: 29.535555555555554 - 0.00452,
    longitude: 106.60777777777778 + 0.0015
  },
  {
    name: "明理12",
    latitude: 29.535555555555554 - 0.0047,
    longitude: 106.60777777777778 + 0.00122
  },
  {
    name: "千喜鹤",
    latitude: 29.532777777777778 - 0.0027,
    longitude: 106.605 + 0.00395
  },
  {
    name: "千喜鹤2",
    latitude: 29.532777777777778 - 0.0032,
    longitude: 106.605 + 0.00391
  },
  {
    name: "千喜鹤3",
    latitude: 29.532777777777778 - 0.0032,
    longitude: 106.605 + 0.00352
  },
  {
    name: "千喜鹤4",
    latitude: 29.532777777777778 - 0.0035,
    longitude: 106.605 + 0.0034
  },
  {
    name: "明理8",
    latitude: 29.532777777777778 - 0.0035,
    longitude: 106.605 + 0.00314
  },
  {
    name: "明理81",
    latitude: 29.532777777777778 - 0.00448,
    longitude: 106.605 + 0.0031
  },
  {
    name: "明理82",
    latitude: 29.532777777777778 - 0.00514,
    longitude: 106.605 + 0.00316
  },
  {
    name: "明理83",
    latitude: 29.532777777777778 - 0.00525,
    longitude: 106.605 + 0.00278
  },
  {
    name: "明理84",
    latitude: 29.532777777777778 - 0.00585,
    longitude: 106.605 + 0.00273
  },
  {
    name: "明理85",
    latitude: 29.532777777777778 - 0.006,
    longitude: 106.605 + 0.00246
  },
  {
    name: "综合实验楼2",
    latitude: 29.529166666666665 - 0.0024,
    longitude: 106.60194444444444 + 0.00502
  },
  {
    name: "综合实验楼1",
    latitude: 29.529166666666665 - 0.00242,
    longitude: 106.60194444444444 + 0.00371
  },
  {
    name: "综合实验楼",
    latitude: 29.529166666666665 - 0.003,
    longitude: 106.60194444444444 + 0.00375
  }
];