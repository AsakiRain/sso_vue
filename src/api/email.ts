import { apiGet, apiPost } from '@/api/index';
import { MyRes } from '@/models';
import type { CodeForm, CodeRes } from '@/models/email';

const sendCode = async (codeForm: CodeForm): Promise<MyRes<CodeRes>> => {
  return await apiPost('/email/code', codeForm);
};