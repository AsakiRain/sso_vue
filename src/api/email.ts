import { apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type { CodeForm, CodeRes } from "@/models/email";
import { message } from "ant-design-vue";

const getCode = async (codeForm: CodeForm): Promise<MyRes<CodeRes>> => {
  const res = await apiPost("/email/code", codeForm);
  if (res.code !== 20000) {
    message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

export default { getCode };
