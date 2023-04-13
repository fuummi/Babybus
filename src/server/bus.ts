import request from "./utill";

export async function getAllBusFn() {
  const res = await request<any>({
    method: "GET",
    url: `/bus/totalAverage`
  });
  return res;
}
export async function getMyBusFn() {
  const res = await request<any>({
    method: "GET",
    url: `/user/singleScore`
  });
  return res;
}

export async function addMyBusFn(id: string) {
  const res = await request<any>({
    method: "POST",
    url: `/user/singleScore`,
    data:{
      id
    }
  });
  return res;
}
