import { apiGet, apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type {
  AccountForm,
  AccountReq,
  EmailForm,
  EmailRes,
  SerialRes,
  TosForm,
  TosRes,
} from "@/models/reg";
import router from "@/router";
import { message } from "ant-design-vue";

const checkExistence = (res: MyRes) => {
  if (res.code === 42208) {
    localStorage.removeItem("reg_serial");
    localStorage.removeItem("reg_step");
    router.push("/reg");
    throw res;
  }
};

const checkMisMatch = (res: MyRes) => {
  if (res.code === 42210) {
    router.push(res.data.url);
    throw res;
  }
};

const getSerial = async (): Promise<MyRes<SerialRes>> => {
  const res = await apiGet("reg/flow/0");
  if (res.code !== 20000) {
    message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

const postTosForm = async (tosForm: TosForm): Promise<MyRes<TosRes>> => {
  const res = await apiPost("reg/flow/1", tosForm);
  if (res.code !== 20000) {
    message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

const postEmailForm = async (
  emailForm: EmailForm
): Promise<MyRes<EmailRes>> => {
  const res = await apiPost("reg/flow/2", emailForm);
  if (res.code !== 20000) {
    message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

const postAccountForm = async (
  accountReq: AccountReq
): Promise<MyRes<EmailRes>> => {
  const res = await apiPost("reg/flow/3", accountReq);
  if (res.code !== 20000) {
    message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

export default { getSerial, postTosForm, postEmailForm, postAccountForm };
