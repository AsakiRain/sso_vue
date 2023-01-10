const findStepName = (step: number) => {
  const dict: Record<string, string> = {
    "0": "获取序列号",
    "1": "用户条款",
    "2": "验证邮箱",
    "3": "创建账号",
    "4": "微软验证",
    "5": "QQ授权",
    "6": "基础设置",
    "7": "完成注册",
  };
  return dict[step.toString()] || `unknown step: ${step}`;
};

export { findStepName };
