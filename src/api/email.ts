import { apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type { EmailCodeForm } from "@/models/code";
import { Message } from "@arco-design/web-vue";

const getCode = async (codeForm: EmailCodeForm): Promise<MyRes<null>> => {
  const res = await apiPost<null>("/email/code", codeForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

export default { getCode };
