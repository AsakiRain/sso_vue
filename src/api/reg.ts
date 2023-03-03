import { apiGet, apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type {
  AccountReq,
  AccountRes,
  EmailForm,
  EmailRes,
  MsLinkRes,
  MsOauthForm,
  MsStatusRes,
  MsRes,
  SerialForm,
  SerialRes,
  TosForm,
  TosRes,
} from "@/models/reg";
import router from "@/router";
import { Message } from "@arco-design/web-vue";

const checkExistence = (res: MyRes) => {
  if (res.code === 42208) {
    localStorage.removeItem("reg_serial");
    localStorage.removeItem("reg_step");
    router.push("/reg");
    throw res;
  }
};

// eslint-disable-next-line
const checkMisMatch = (res: MyRes<any>) => {
  if (res.code === 42210) {
    router.push(res.data.url);
    throw res;
  }
};

const getSerial = async (): Promise<MyRes<SerialRes>> => {
  const res = await apiGet<SerialRes>("reg/flow/0");
  if (res.code !== 20000) {
    Message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

const postTosForm = async (tosForm: TosForm): Promise<MyRes<TosRes>> => {
  const res = await apiPost<TosRes>("reg/flow/1", tosForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

const postEmailForm = async (
  emailForm: EmailForm
): Promise<MyRes<EmailRes>> => {
  const res = await apiPost<EmailRes>("reg/flow/2", emailForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

const postAccountForm = async (
  accountReq: AccountReq
): Promise<MyRes<AccountRes>> => {
  const res = await apiPost<AccountRes>("reg/flow/3", accountReq);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

const getMsLink = async (serialForm: SerialForm): Promise<MsLinkRes> => {
  const res = await apiPost<MsLinkRes>("reg/flow/4/link", serialForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res.data;
};

const getMsStatus = async (serialForm: SerialForm): Promise<MsStatusRes> => {
  const res = await apiPost<MsStatusRes>("reg/flow/4/status", serialForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res.data;
};

const postMsStart = async (
  msOauthForm: MsOauthForm
): Promise<MyRes<AccountRes>> => {
  const res = await apiPost<AccountRes>("reg/flow/4/start", msOauthForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

const postMsForm = async (serialForm: SerialForm): Promise<MyRes<MsRes>> => {
  const res = await apiPost<MsRes>("reg/flow/4/start", serialForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    checkExistence(res);
    checkMisMatch(res);
    return Promise.reject(res);
  }
  return res;
};

export default {
  getSerial,
  postTosForm,
  postEmailForm,
  postAccountForm,
  getMsLink,
  getMsStatus,
  postMsStart,
  postMsForm,
};
