import { atom } from 'recoil';
export const pathnameState = atom({
  key: 'pathnameState',
  default: window.location.pathname,
});