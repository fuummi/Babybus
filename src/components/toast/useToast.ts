import { useState } from "react";
import logo from "../../assets/logo.jpg";
import fail from "../../assets/icons/data.png";

interface IToastProps {
  img: string;
  text: string;
}

export default function useToast() {
  const [isToastShow, setIsToastShow] = useState(false);
  const [toastData, setToastData] = useState<IToastProps>({
    img: logo,
    text: "成功"
  });
  let img;
  function changeToastVisible(type: string, text: string) {
    switch (type) {
      case "success":
        img = logo;
        break;
      case "fail":
        img = fail;
      default:
        img = logo;
        break;
    }
    setToastData({
      img,
      text
    });
    setIsToastShow(true);
    setTimeout(() => {
      setIsToastShow(false);
    },1500);
  }
  const rturnArr: [
    IToastProps,
    boolean,
    (type: string, text: string) => void
  ] = [toastData, isToastShow, changeToastVisible];
  return rturnArr;
}
