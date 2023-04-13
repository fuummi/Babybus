import request from "./utill";

const BASE_URL = "";

interface IRes<T> {
  code: string;
  data: T;
}

interface ILoginRes {
  code: number;
  token: string;
}

export async function loginFn(code: string) {
  const res = await request<ILoginRes>({
    method: "POST",
    url: `/user/regester`,
    data: {
      code
    }
  });
  return res;
}

export async function quitLoginFn(token: string) {
  const res = await request<ILoginRes>({
    method: "POST",
    url: `/user/quit`,
    data: {
      token
    }
  });
  return res;
}
