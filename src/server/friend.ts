import { request } from "@tarojs/taro-h5/dist/api/network/request";

const BASE_URL = "";

export interface Ibinding {
  code: string;
  info: string;
}

export async function findFriendsFn(friendId: string): Promise<Ibinding> {
  const res = await request({
    method: "POST",
    url: `${BASE_URL}/user/findFriends`,
    data: {
      friendId
    },
    fail: err => {
      throw new Error(err);
    }
  });
  return res;
}


export async function bindingFn(friendId: string): Promise<Ibinding> {
  const res = await request({
    method: "POST",
    url: `${BASE_URL}/user/bindFriends`,
    data: {
      friendId
    },
    fail: err => {
      throw new Error(err);
    }
  });
  return res;
}
