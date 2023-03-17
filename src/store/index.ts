import { atom } from 'recoil'

export const nowPageState = atom({
  key: 'nowPage',
  default: "pages/map/index"
})