import { apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type { QqCodeForm, QqCodeRes } from "@/models/code";
import { Message } from "@arco-design/web-vue";

const getCode = async (qqForm: QqCodeForm): Promise<MyRes<QqCodeRes>> => {
  const res = await apiPost<QqCodeRes>("/email/code", qqForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

export default { getCode };
