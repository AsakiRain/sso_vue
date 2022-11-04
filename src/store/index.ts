import { createPinia } from 'pinia';
import useAppStore from './app';
import useUserStore from './user';
import useTabBarStore from './tab-bar';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore };
export default pinia;
