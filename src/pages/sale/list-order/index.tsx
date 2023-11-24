import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {  ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import DrawerComponent from '../../../components/drawer';

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
        title: 'title',
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
        title: 'state',
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
        title: 'label',
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
        title: 'time',
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
        title: '',
        valueType: 'option',
        key: 'option',
        render: () => [
            <DrawerComponent />
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
                options={false}

                editable={{
                    type: 'multiple',
                }}
                // columnsState={{
                //     persistenceKey: 'pro-table-singe-demos',
                //     persistenceType: 'localStorage',
                //     onChange(value) {
                //         console.log('value: ', value);
                //     },
                // }}
                rowKey="id"
                // search={{
                //     labelWidth: 'auto',
                // }}
                // options={{
                //     setting: {
                //         listsHeight: 400,
                //     },
                // }}
                // form={{
                //     // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                //     syncToUrl: (values, type) => {
                //         if (type === 'get') {
                //             return {
                //                 ...values,
                //                 created_at: [values.startTime, values.endTime],
                //             };
                //         }
                //         return values;
                //     },
                // }}
                pagination={{
                    pageSize: 10,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="高级表格"
            />
        </div>
    );
};

export default ListOrder