import { ProSettings } from '@ant-design/pro-components';
import { atom } from 'recoil';

export const clientState = atom({
  key: 'clientState',
  default: {
    name: '',
    recipient_id: ''
  },
});

export const conversationsState = atom<Array<any>>({
  key: 'conversationsState',
  default: [],
});


export const conversationsIdState = atom({
  key: 'conversationsIdState',
  default: null,
});

export const pathnameState = atom({
  key: 'pathnameState',
  default: window.location.pathname,
});

export const recipientId = atom({
  key: 'recipient_id',
  default: '',
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