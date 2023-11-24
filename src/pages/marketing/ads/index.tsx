import {
    ProList,
} from '@ant-design/pro-components';
import { Tag } from 'antd';
import { RingProgress } from '@ant-design/plots';
import { useNavigate } from 'react-router-dom';





const data = [
    '语雀的天空',
    'Ant Design',
    '蚂蚁金服体验科技',
    'TechUI',
    'TechUI 2.0',
    'Bigfish',
    'Umi',
    'Ant Design Pro',
    'Ant Design Pro1s',
].map((item) => {
    const percent = Math.random()
    const config = {
        autoFit: true,
        percent: percent,
        color: percent < 0.3 ? ['#FF4D4F', '#E8EDF3'] : ['#5B8FF9', '#E8EDF3'],
        innerRadius: 0.85,
        radius: 0.98,
        statistic: {
            title: {
                style: {
                    // color: '#363636',
                    fontSize: '12px',
                    lineHeight: '14px',
                },
                formatter: () => 'Tỉ lệ chuyển đổi',
            },
        },
    };
    return ({
        title: item,
        subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
        actions: [<a key="run">邀请</a>, <a key="delete">删除</a>],
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        content: (
            <div
                className='w-full aspect-video'
            >
                <RingProgress style={{ width: '100%', height: '100%' }} {...config} />
            </div>
        ),
    })
});

const Ads = () => {
    const navigate = useNavigate()
    return (
        <div
            className='p-2'
        >
            <ProList
                ghost={false}
                itemCardProps={{
                    ghost: false,
                }}
                pagination={{
                    defaultPageSize: 9,
                    showSizeChanger: false,
                }}
                toolBarRender={() => {
                    return [
                        // <ModalComponent children={<></>}/>
                    ];
                }}
                search={{

                }}
                showActions="hover"
                // rowSelection={{}}
                grid={{
                    gutter: 12, 
                    xs: 1, 
                    sm: 3,
                    md: 4,
                    lg: 4,
                    xl: 4
                }}
                onItem={(record) => {
                    return {
                        onMouseEnter: () => {
                            console.log(record);
                        },
                        onClick: () => {
                            navigate('/marketing/ads-detail')
                        },
                    };
                }}
                metas={{
                    title: {},
                    subTitle: {},
                    type: {},
                    avatar: {},
                    content: {},
                    actions: {
                        cardActionProps: 'extra',
                    },
                }}
                headerTitle="Chiến dịch quảng cáo"
                dataSource={data}
            />
        </div>
    );
};

export default Ads