import {
  CaretDownFilled,
  DoubleRightOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import {
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { StyleProvider } from '@ant-design/cssinjs';
import {
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Popover,
  Skeleton,
  theme,
} from 'antd';
import React, { useEffect, useState } from 'react';
import router from '../routes/privateRouter'
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { conversationsState, pathnameState, settingState } from '../stores/app/atoms';
import { gql, useQuery, useSubscription } from '@apollo/client';

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
          color: ${token.colorTextSecondary};
          font-size: 14px;
          cursor: pointer;
          line-height: 22px;
          margin-bottom: 8px;
          &:hover {
            color: ${token.colorPrimary};
          }
        `}
      style={{
        width: '33.33%',
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (
  props,
) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(6).fill(1).map((_, index) => {
          return <Item key={index}>具体的解决方案-{index}</Item>;
        })}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px',
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="金融解决方案" />
              <List
                title="其他解决方案"
                style={{
                  marginBlockStart: 32,
                }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16,
              }}
            >
              <div
                className={css`
                    font-size: 14px;
                    color: ${token.colorText};
                    line-height: 22px;
                  `}
              >
                热门产品
              </div>
              {new Array(3).fill(1).map((_, index) => {
                return (
                  <div
                    key={index}
                    className={css`
                        border-radius: 4px;
                        padding: 16px;
                        margin-top: 4px;
                        display: flex;
                        cursor: pointer;
                        &:hover {
                          background-color: ${token.colorBgTextHover};
                        }
                      `}
                  >
                    <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                    <div
                      style={{
                        marginInlineStart: 14,
                      }}
                    >
                      <div
                        className={css`
                            font-size: 14px;
                            color: ${token.colorText};
                            line-height: 22px;
                          `}
                      >
                        Ant Design
                      </div>
                      <div
                        className={css`
                            font-size: 12px;
                            color: ${token.colorTextSecondary};
                            line-height: 20px;
                          `}
                      >
                        杭州市较知名的 UI 设计语言
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
          className={css`
              &:hover {
                background-color: ${token.colorBgTextHover};
              }
            `}
        >
          <span> 企业级资产中心</span>
          <CaretDownFilled />
        </div>
      </Popover>
    </div>
  );
};

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        bordered={false}
      />
      <PlusCircleFilled
        style={{
          color: token.colorPrimary,
          fontSize: 24,
        }}
      />
    </div>
  );
};

const GET_ME = gql`
    query Me {
      me {
        username
        id
      }
    }
`;

const REALTIME = gql`
  subscription Subscription($userId: String!) {
    messageAdded(userId: $userId) {
      text
      client {
        id
        name
      }
      Conversations {
        id
      }
      createdAt
    }
  }
`

const BaseLayout = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ME);
  const [settings, setSetting] = useRecoilState(settingState);
  const [pathname, setPathname] = useRecoilState(pathnameState);
  const setconversations = useSetRecoilState(conversationsState);
  const [collapsed, setCollapsed] = useState(true);
  const {loading: loading1, error: err1, data: data1 } = useSubscription(REALTIME, {
    variables: {
      userId: data?.me?.id
    }
  })
  useEffect(() => {
    if (err1) {
      console.error('Error in subscription:', err1);
    }

    if (!loading1 && data1) {
      setconversations((prev) => [...prev, data1.messageAdded]);
    }
  }, [loading1, err1, data1]);

  useEffect(() => {
    setTimeout(() => {
      setCollapsed(true)
    }, 1500)
  }, [])
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);
  if (loading) {
    return <Skeleton />
  }
  if (error) {
    navigate('/')
    return
  }
  return (
    <div
      id="penci"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('penci') || document.body;
          }}
        >
          <StyleProvider hashPriority="high">
            <ProLayout
              prefixCls="my-prefix"
              title="Penci"
              collapsed={collapsed}
              onCollapse={setCollapsed}
              bgLayoutImgList={[
                {
                  src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                  left: 85,
                  bottom: 100,
                  height: '303px',
                },
                {
                  src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                  bottom: -68,
                  right: -45,
                  height: '303px',
                },
                {
                  src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                  bottom: 0,
                  left: 0,
                  width: '331px',
                },
              ]}
              logo="https://lh3.googleusercontent.com/a/ACg8ocJ1M5cvaqAFR3JLfrNt0sVxtoEtPFGQZV2t1iO1u1JzGQ=s360-c-no"
              {...router}
              location={{
                pathname,
              }}
              token={{
                header: {
                  colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                },
                sider: {
                }
              }}
              menu={{
                collapsedShowGroupTitle: true,
              }}
              avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: data.me.username,
                render: (_, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: "Đăng xuất",
                            onClick: () => {
                              localStorage.removeItem('accessToken');
                              navigate('/')
                             }
                          }
                        ],
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                },
              }}
              onPageChange={location => navigate('' + location?.pathname)}
              actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === 'undefined') return [];
                return [
                  props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                    <SearchInput />
                  ) : undefined,
                  <div className='w-full cursor-pointer' onClick={() => setSetting(prev => ({ ...prev, navTheme: prev?.navTheme == 'realDark' ? 'light' : 'realDark' }))}>
                    <img className='w-6 mx-auto' src={settings?.navTheme == 'realDark' ? 'https://static-00.iconduck.com/assets.00/mode-light-icon-512x512-yuubs6qt.png' : 'https://cdn-icons-png.flaticon.com/512/6771/6771009.png'} />
                  </div>
                ];
              }}
              headerTitleRender={(logo, title, _) => {
                const defaultDom = (
                  <a>
                    {logo}
                    {title}
                  </a>
                );
                if (typeof window === 'undefined') return defaultDom;
                if (document.body.clientWidth < 1400) {
                  return defaultDom;
                }
                if (_.isMobile) return defaultDom;
                return (
                  <>
                    {defaultDom}
                    <MenuCard />
                  </>
                );
              }}
              menuFooterRender={(props) => {
                if (props?.collapsed) return undefined;
                return (
                  <div
                    style={{
                      textAlign: 'center',
                      paddingBlockStart: 12,
                    }}
                  >
                    <div>© 2023 Made with love</div>
                    <div>by Mr_CJ</div>
                  </div>
                );
              }}
              menuItemRender={(item, dom) => (
                <div
                  onClick={() => {
                    setPathname(item.path || '/welcome');
                  }}
                >
                  {dom}
                </div>
              )}
              {...settings}
            >
              <div className='h-[calc(100vh-56px)] overflow-y-auto'>
                <Outlet />
              </div>
            </ProLayout>
          </StyleProvider>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

export default BaseLayout