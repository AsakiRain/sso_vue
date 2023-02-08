import { useI18n } from "vue-i18n";
import { Message } from "@arco-design/web-vue";
import { computed } from "vue";

const useLocale = () => {
  const i18n = useI18n();

  const currentLocale = computed(() => {
    return i18n.locale.value;
  });

  const changeLocale = (newLocale: string) => {
    const { t } = i18n;
    i18n.locale.value = newLocale;
    localStorage.locale = newLocale;
    Message.success(t("setting.changeLocale"));
  };

  return { currentLocale, changeLocale };
};

export default useLocale;
