import {
    CaretDownFilled,
    DoubleRightOutlined,
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined,
  } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import {
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Popover,
  theme,
} from 'antd';
import React, { useEffect, useState } from 'react';
import router from '../routes/privateRouter'
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { pathnameState } from '../stores/app/atoms';
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
  
  const BaseLayout = () => {
    const navigate = useNavigate();
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        "fixSiderbar": true,
        "layout": "mix",
        "splitMenus": false,
        "navTheme": "realDark",
        "contentWidth": "Fluid",
        "colorPrimary": "#722ED1",
        "siderMenuType": "sub"
    });
  
    const [pathname, setPathname] = useRecoilState(pathnameState);
    const [collapsed, setCollapsed] = useState(false);
    useEffect(()=>{
      setTimeout(()=>{
        setCollapsed(true)
      },1500)
    },[])
    return (
      <div
        id="ladi"
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ProConfigProvider hashed={false}>
          <ConfigProvider
            getTargetContainer={() => {
              return document.getElementById('ladi') || document.body;
            }}
          >
            <ProLayout
              prefixCls="my-prefix"
              title="Ladi"
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
              siderMenuType="group"
              menu={{
                collapsedShowGroupTitle: true,
              }}
              avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: 'CJ',
                render: (_, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: '退出登录',
                          },
                        ],
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                },
              }}
              onPageChange={location => navigate(''+location?.pathname)}
              actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === 'undefined') return [];
                return [
                  props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                    <SearchInput />
                  ) : undefined,
                  <InfoCircleFilled key="InfoCircleFilled" />,
                  <QuestionCircleFilled key="QuestionCircleFilled" />,
                  <GithubFilled key="GithubFilled" />,
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
              // onMenuHeaderClick={(e) => console.log(e)}
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
                <Outlet/>
              </div>
              {/* <PageContainer className='pt-2 h-[calc(100vh-56px)] overflow-y-auto' token={{paddingInlinePageContainerContent: 4}} pageHeaderRender={()=><></>}>
              </PageContainer> */}
              <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={(e: unknown) => {
                  if (typeof window === 'undefined') return e;
                  return document.getElementById('ladi');
                }}
                settings={settings}
                onSettingChange={(changeSetting) => {
                  setSetting(changeSetting);
                }}
                disableUrlParams={false}
              />
            </ProLayout>
          </ConfigProvider>
        </ProConfigProvider>
      </div>
    );
  };
  
  export default BaseLayout