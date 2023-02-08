import { apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type { CodeForm, CodeRes } from "@/models/email";
import { Message } from "@arco-design/web-vue";

const getCode = async (codeForm: CodeForm): Promise<MyRes<CodeRes>> => {
  const res = await apiPost<CodeRes>("/email/code", codeForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

export default { getCode };
