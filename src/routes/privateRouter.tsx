import {
  CrownFilled, PieChartFilled, NotificationFilled, ContactsFilled, MobileFilled
} from '@ant-design/icons';
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Test11 from '../pages/Test1/Test11';
import Test22 from '../pages/Test2/Test22';
import Test21 from '../pages/Test2/Test21';
import Test12 from '../pages/Test1/Test12';

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
export default {
  route: {
    path: '',
    component: <BaseLayout />,
    routes: [
      {
        path: 'dashboard',
        name: 'dashboard',
        icon: <PieChartFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='analysis' />
          },
          {
            path: 'analysis',
            name: 'analysis',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Analysis />
          }
        ]
      },
      {
        path: 'marketing',
        name: 'marketing',
        icon: <NotificationFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='marketing' />
          },
          {
            path: 'ads',
            name: 'ads',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Ads />
          },
          {
            path: 'ads-detail',
            name: 'ads-detail',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <AdsDetail />
          },
          {
            path: 'landingpage',
            name: 'landingpage',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Primary />
          }

        ]
      },
      {
        path: 'users',
        name: 'User',
        icon: <ContactsFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='roles' />
          },
          {
            path: 'roles',
            name: 'roles',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Roles />
          },
          {
            path: 'users',
            name: 'users',
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
            name: 'ListOrder',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <ListOrder />
          },
          {
            path: 'task-order',
            name: 'TaskOrder',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <TaskOrder />
          },
        ],
      },
      {
        path: 'test1',
        name: 'Test1',
        icon: <CrownFilled />,
        component: <Outlet />,
        routes: [
          {
            path: '',
            component: <SwitchIndex path='test11' />
          },
          {
            path: 'test11',
            name: 'Test11',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Test11 />
          },
          {
            path: 'test12',
            name: 'Test12',
            icon: <CrownFilled />,
            component: <Test12 />,
          }
        ],
      },
      {
        path: 'test2',
        name: 'Test2',
        icon: <CrownFilled />,
        component: <Outlet />,
        routes: [
          {
            path: 'test21',
            name: 'Test21',
            index: true,
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: <Test21 />
          },
          {
            path: 'test22',
            name: 'Test22',
            icon: <CrownFilled />,
            component: <Test22 />,
          }
        ],
      },
    ],
  },
};