import {
  ShopFilled, PieChartFilled, NotificationFilled, ContactsFilled, MobileFilled, WechatOutlined
} from '@ant-design/icons';
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const SwitchIndex = ({ path }: { path: string }) => {
  const [, setPathname] = useRecoilState(pathnameState)
  const navigate = useNavigate()
  useEffect(() => {
    navigate(path);
    setPathname(window.location.pathname);
  });
  return <></>
}

import BaseLayout from '../layouts/BaseLayout';
import { useRecoilState } from 'recoil';
import { pathnameState } from '../stores/app/atoms';
import Analysis from '../pages/dashboard/analysis';
import Roles from '../pages/users/roles';
import Users from '../pages/users/users';
import { Ads, AdsDetail } from '../pages/marketing';
import { ListOrder } from '../pages/sale';
import Primary from '../pages/marketing/landingpage';
import TaskOrder from '../pages/sale/task-order';
import Chat from '../pages/chat/chat';
import User from '../pages/chat/user';
import Product from '../pages/warehouse/product';
export default {
  route: {
    path: '',
    component: <BaseLayout />,
    routes: [
      {
        path: 'dashboard',
        name: 'Bảng điều khiển',
        icon: <PieChartFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='analysis' />
          },
          {
            path: 'analysis',
            name: 'Biểu đồ',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Analysis />
          }
        ]
      },
      {
        path: 'marketing',
        name: 'Tiếp thị',
        icon: <NotificationFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='marketing' />
          },
          {
            path: 'ads',
            name: 'Quảng cáo',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Ads />
          },
          {
            path: 'ads-detail',
            name: 'Biểu đồ',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <AdsDetail />
          },
          {
            path: 'landingpage',
            name: 'Landing Page',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Primary />
          }

        ]
      },
      {
        path: 'users',
        name: 'Tài khoản',
        icon: <ContactsFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='roles' />
          },
          {
            path: 'roles',
            name: 'Quyền',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Roles />
          },
          {
            path: 'users',
            name: 'Tài khoản con',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Users />
          }
        ],
      },
      {
        path: 'sale',
        name: 'Sale',
        icon: <MobileFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='list-order' />
          },
          {
            path: 'list-order',
            name: 'Danh sách đơn hàng',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <ListOrder />
          },
          {
            path: 'task-order',
            name: 'Đơn hàng',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <TaskOrder />
          },
        ],
      },
      {
        path: 'chat',
        name: 'Tin nhắn',
        icon: <WechatOutlined />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='chat' />
          },
          {
            path: 'chat',
            name: 'Hội thoại',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Chat />
          },
          {
            path: 'user',
            name: 'Tài khoản',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <User />
          },
        ],
      },
      {
        path: 'warehouse',
        name: 'Kho hàng',
        icon: <ShopFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='product' />
          },
          {
            path: 'product',
            name: 'Sản phẩm',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Product />
          }
        ],
      }
    ],
  },
};