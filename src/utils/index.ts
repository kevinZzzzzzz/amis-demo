/*
  获取链接上的参数
 * @param url 完整链接
*/
export const getUrlParams = function (url = window.location.href) {
  let obj = {};
  if (!url.includes("?")) return obj;
  let urlStr = url.split("?")[1];
  let paramsData = urlStr.split("&");
  for (let i = 0; i < paramsData.length; i++) {
    let temp = paramsData[i].split("=");
    obj[temp[0]] = decodeURIComponent(temp[1]);
  }
  return obj;
};
/**
 * 获取当前时间 yyyy-mm-dd hh:mm:ss
 * @param now 时间
 * @returns
 */
export const getNowTime = (now = new Date()) => {
  const year = now.getFullYear() + "";
  const month =
    now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  const date = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
  const hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
  const min =
    now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
  const sec =
    now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
  return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
};
