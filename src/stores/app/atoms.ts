import { ProSettings } from '@ant-design/pro-components';
import { atom } from 'recoil';
export const pathnameState = atom({
  key: 'pathnameState',
  default: window.location.pathname,
});

export const settingState = atom<Partial<ProSettings> | undefined>({
  key: 'settingState',
  default: localStorage.getItem('settings')
    ? JSON.parse(localStorage.getItem('settings')!)
    : ({
      "fixSiderbar": true,
      "layout": "mix",
      "splitMenus": false,
      "navTheme": "light",
      "contentWidth": "Fluid",
      "colorPrimary": "#722ED1",
      "siderMenuType": "sub"
    }),
})