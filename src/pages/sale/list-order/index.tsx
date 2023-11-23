import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProDescriptions, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Col, Dropdown, Image, Row, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import ModalComponent from '../../../components/modal';

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        tip: '标题过长会自动收缩',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        disable: true,
        title: '状态',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '超长'.repeat(50) },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: '解决中',
                status: 'Processing',
            },
        },
    },
    {
        disable: true,
        title: '标签',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
        },
        render: (_, record) => (
            <Space>
                {record.labels.map(({ name, color }) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: '创建时间',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: '创建时间',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <ModalComponent
                trigger={<a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                    Xem
                </a>}>
                {/* <Row gutter={12} style={{margin: 0}}>
                    <Col  xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Image className='w-full aspect-square object-cover' preview={false} src='https://cdn.tuoitre.vn/thumb_w/640/471584752817336320/2023/2/13/tieu-su-ca-si-rose-blackpink-12-167628252304049682913.jpg' />
                    </Col>
                    <Col  xl={12} lg={24} md={24} sm={24} xs={24}>
                        <div className='font-bold'>Tên: <span className='font-normal'>Tony Tony Chopper Keycap Cherry Hồ sơ One Piece Anime PBT DYE-SUB Bàn phím cơ học Keycap</span></div>
                        <div className='font-bold'>Giá: <span className='text-red-600 font-bold'>688.000đ</span></div>
                        <div className='font-bold'>
                            Mô tả sản phẩm:
                            <span className='font-normal'>
                                👑Chào mừng bạn đến 🔰Skyzy🔰 Keycap House👑

                                🛒 Giao ngay

                                🚚 Giao hàng nhanh (2 ngày làm việc)💯

                                📦【Kiểm Tra các mặt hàng trước khi giao hàng và đóng gói đúng cách để đảm bảo rằng hàng hóa bạn nhận được còn nguyên vẹn】

                                💓Nếu bạn thích cửa hàng của chúng tôi, hãy chú ý đến cửa hàng của chúng tôi để nhận được nhiều giảm giá hơn trong tương lai!! 💖

                                💌Nếu bạn có bất kỳ câu hỏi nào, vui lòng nhấp vào "chat" và chúng tôi sẽ sẵn lòng giúp bạn

                                💖Của bạn ⭐️⭐️⭐️⭐️⭐️ Năm sao là nguồn động viên và hỗ trợ lớn nhất của chúng tôi! Cảm ơn bạn đã đến!

                            </span>

                        </div>
                    </Col>

                </Row> */}
                <ProDescriptions
                    column={2}
                >
                    <ProDescriptions.Item
                        span={1}
                        valueType="text"
                        contentStyle={{
                            maxWidth: '80%',
                        }}
                        // renderText={(_) => {
                        //     return _ + _;
                        // }}
                        // ellipsis
                        label="Tên sản phẩm"
                    >
                        Tony Tony Chopper Keycap Cherry Hồ sơ One Piece Anime PBT DYE-SUB Bàn phím cơ học Keycap
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="Tên khách hàng"
                        valueType="text"
                    >
                        Đỗ Mạnh Quân
                    </ProDescriptions.Item>
                    <ProDescriptions.Item label="Kho">
                        Hà đông
                    </ProDescriptions.Item>
                    <ProDescriptions.Item label="Địa chỉ">
                        Hà đông, Hà nội
                    </ProDescriptions.Item>
                    <ProDescriptions.Item label="Giá sản phẩm" valueType="text" render={(e) => <div className='text-red-600 font-bold'>{e}</div>}>
                        68.000 VNĐ
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="Số điện thoại"
                        // valueType="text"
                    >
                        034483924
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        label="Mô tả sản phẩm"
                        valueType="textarea"
                    >
                        👑Chào mừng bạn đến 🔰Skyzy🔰 Keycap House👑

                        🛒 Giao ngay

                        🚚 Giao hàng nhanh (2 ngày làm việc)💯

                        📦【Kiểm Tra các mặt hàng trước khi giao hàng và đóng gói đúng cách để đảm bảo rằng hàng hóa bạn nhận được còn nguyên vẹn】

                        💓Nếu bạn thích cửa hàng của chúng tôi, hãy chú ý đến cửa hàng của chúng tôi để nhận được nhiều giảm giá hơn trong tương lai!! 💖

                        💌Nếu bạn có bất kỳ câu hỏi nào, vui lòng nhấp vào "chat" và chúng tôi sẽ sẵn lòng giúp bạn

                        💖Của bạn ⭐️⭐️⭐️⭐️⭐️ Năm sao là nguồn động viên và hỗ trợ lớn nhất của chúng tôi! Cảm ơn bạn đã đến!

                    </ProDescriptions.Item>
                    <ProDescriptions.Item  >
                        <Image width={'100%'} className='object-cover aspect-[4/3]' src='https://cdn.tuoitre.vn/thumb_w/640/471584752817336320/2023/2/13/tieu-su-ca-si-rose-blackpink-12-167628252304049682913.jpg'/>
                    </ProDescriptions.Item>
                  
                </ProDescriptions>
            </ModalComponent>
        ],
    },
];

const ListOrder = () => {
    const actionRef = useRef<ActionType>();
    return (
        <div className='p-2'
        >
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    return request<{
                        data: GithubIssueItem[];
                    }>('https://proapi.azurewebsites.net/github/issues', {
                        params,
                    });
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 10,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="高级表格"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        新建
                    </Button>,
                    <Dropdown
                        key="menu"
                        menu={{
                            items: [
                                {
                                    label: '1st item',
                                    key: '1',
                                },
                                {
                                    label: '2nd item',
                                    key: '1',
                                },
                                {
                                    label: '3rd item',
                                    key: '1',
                                },
                            ],
                        }}
                    >
                        <Button>
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>,
                ]}
            />
        </div>
    );
};

export default ListOrder