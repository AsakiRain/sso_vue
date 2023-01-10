import { apiGet, apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type { SerialRes } from "@/models/reg";
import { message } from "ant-design-vue";

const getSerial = async (): Promise<MyRes<SerialRes>> => {
  const res = await apiGet("reg/flow/0");
  if (res.code !== 200) {
    message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

export default { getSerial };
