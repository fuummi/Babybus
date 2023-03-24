import request from "./utill";

export interface Ibinding {
  code: string;
  info: string;
}

export async function initFriendFn() {
  const res = await request<Ibinding>({
    method: "GET",
    url: `/user/bindRecord`
  });
  return res;
}

export async function findFriendsFn(serachKey: string) {
  const res = await request<Ibinding>({
    method: "POST",
    url: `/user/findFriends`,
    data: {
      serachKey
    }
  });
  return res;
}

export async function bindingFn(friendId: string) {
  const res = await request<Ibinding>({
    method: "POST",
    url: `/user/bindFriends`,
    data: {
      friendId
    }
  });
  return res;
}
