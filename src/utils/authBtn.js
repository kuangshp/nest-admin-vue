import { useAppStore } from '@/stores/app';

export const isShowBtn = (title) => {
  const appStore = useAppStore();
  const authBtnList = appStore.authBtnList;
  return authBtnList.some((item) => item.title === title);
};
