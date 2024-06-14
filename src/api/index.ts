import http from "@/http";
import { type AxiosResponse } from "axios";
import { formatGetParams } from "hoslink-xxx";
// 设置代理
export const setProxy = (url: string): string => {
  return "/amisApi" + url;
};
// 清理入参中的undefined数据
export const clearData = (data: any) => {
  for (const i in data) {
    if (data[i] === undefined) data[i] = "";
  }
  return data;
};
console.log(import.meta.env, "环境变量");

export default {
  /**
   * 获取模板
   * @returns
   */
  async getTemp(data: any = {}): Promise<AxiosResponse<any, any>> {
    return await http.get(
      setProxy(
        `/accurateBlood/amis/getTemplate${formatGetParams(clearData(data))}`
      ),
      false,
      false
    );
  },
  async insertTemp(data: any = {}): Promise<AxiosResponse<any, any>> {
    return await http.post(
      setProxy("/accurateBlood/amis/insertTemplate"),
      { data },
      true,
      true
    );
  },
};
