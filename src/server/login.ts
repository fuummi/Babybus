import { request } from "@tarojs/taro-h5/dist/api/network/request";

const BASE_URL = "";

interface IRes<T> {
  code: string;
  data: T;
}

interface ILoginRes {
  code: number;
  token: string;
}

export async function loginFn(code: string): Promise<IRes<ILoginRes>> {
  const res = await request({
    method: "POST",
    url: `${BASE_URL}/user/regester`,
    data: {
      code
    },
    fail: err => {
      throw new Error(err);
    }
  });
  return res;
}

export async function quitLoginFn(token: string): Promise<IRes<ILoginRes>> {
  const res = await request({
    method: "POST",
    url: `${BASE_URL}/user/quit`,
    data: {
      token
    },
    fail: err => {
      throw new Error(err);
    }
  });
  return res;
}
