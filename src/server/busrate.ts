import request from "./utill";

interface IBusRate {
  code: number;
  detail: string[];
  info: string;
}

export async function getBusRateFn() {
  const res = await request<IBusRate>({
    method: "GET",
    url: `/user/singleScore`
  });
  return res;
}
export async function getMyRateFn() {
  const res = await request<IBusRate>({
    method: "GET",
    url: `/user/singleScore`
  });
  return res;
}