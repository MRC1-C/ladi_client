import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
    EditableProTable,
    ProCard,
    ProFormField,
} from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { Button, Form, Input, Space, Tag, Row, Col } from 'antd';
import React, { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const TagList: React.FC<{
    value?: {
        key: string;
        label: string;
    }[];
    onChange?: (
        value: {
            key: string;
            label: string;
        }[],
    ) => void;
}> = ({ value, onChange }) => {
    const ref = useRef<InputRef | null>(null);
    const [newTags, setNewTags] = useState<
        {
            key: string;
            label: string;
        }[]
    >([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        let tempsTags = [...(value || [])];
        if (
            inputValue &&
            tempsTags.filter((tag) => tag.label === inputValue).length === 0
        ) {
            tempsTags = [
                ...tempsTags,
                { key: `new-${tempsTags.length}`, label: inputValue },
            ];
        }
        onChange?.(tempsTags);
        setNewTags([]);
        setInputValue('');
    };

    return (
        <Space>
            {(value || []).concat(newTags).map((item) => (
                <Tag key={item.key}>{item.label}</Tag>
            ))}
            <Input
                ref={ref}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />
        </Space>
    );
};

type DataSourceType = {
    id: React.Key;
    title?: string;
    labels?: {
        key: string;
        label: string;
    }[];
    state?: string;
    created_at?: number;
    children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
    {
        id: 624748504,
        title: '活动名称一',
        labels: [{ key: 'woman', label: 'Admin' }],
        state: 'open',
        created_at: 1590486176000,
    },
    {
        id: 624691229,
        title: '活动名称二',
        labels: [{ key: 'man', label: 'Kế toán' }],
        state: 'closed',
        created_at: 1590481162000,
    },
    {
        id: 6247483504,
        title: '活动名称一',
        labels: [{ key: 'woman', label: 'Admin' }],
        state: 'open',
        created_at: 15902486176000,
    },
    {
        id: 6246931229,
        title: '活动名称二',
        labels: [{ key: 'man', label: 'Kế toán' }],
        state: 'closed',
        created_at: 15904812162000,
    },
    {
        id: 62474835304,
        title: '活动名称一',
        labels: [{ key: 'woman', label: 'Admin' }],
        state: 'open',
        created_at: 15930486176000,
    },
    {
        id: 62462452931229,
        title: '活动名称二',
        labels: [{ key: 'man', label: 'Kế toán' }],
        state: 'closed',
        created_at: 15904811620100,
    },
    {
        id: 624723548504,
        title: '活动名称一',
        labels: [{ key: 'woman', label: 'Admin' }],
        state: 'open',
        created_at: 15904863176000,
    },
];


const Users = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance<any>>();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
    const [form] = Form.useForm();
    const columns: ProColumns<DataSourceType>[] = [
        {
            title: 'Tên nhân viên',
            dataIndex: 'title',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: '30%',
        },
        {
            title: 'Trạng thái',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
                all: { text: '全部', status: 'Default' },
                open: {
                    text: '未解决',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                },
            },
        },
        {
            title: 'Quyền',
            dataIndex: 'labels',
            width: '20%',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            renderFormItem: (_, { isEditable }) => {
                return isEditable ? <TagList /> : <Input />;
            },
            render: (_, row) =>
                row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
        },
        {
            title: 'Hành động',
            valueType: 'option',
            width: 250,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    Sửa
                </a>,
                <EditableProTable.RecordCreator
                    key="copy"
                    record={{
                        ...record,
                        id: (Math.random() * 1000000).toFixed(0),
                    }}
                >
                    <a>Copy</a>
                </EditableProTable.RecordCreator>,
                <a
                    key="delete"
                    onClick={() => {
                        const tableDataSource = formRef.current?.getFieldValue(
                            'table',
                          ) as DataSourceType[];
                          formRef.current?.setFieldsValue({
                            table: tableDataSource.filter((item) => item.id !== record.id),
                          });
                    }}
                >
                    Xoá
                </a>,
            ],
        },
    ];
    return (
        <Row gutter={12} style={{ margin: 0 }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <ProCard>
                    <EditableProTable<DataSourceType>
                        rowKey="id"
                        scroll={{
                            x: true,
                        }}
                        name={'table'}
                        actionRef={actionRef}
                        headerTitle="Bảng nhân viên"
                        maxLength={11}
                        pagination={{
                            pageSize: 10,
                        }}
                        controlled
                        recordCreatorProps={{
                            position: 'top',
                            record: (index) => ({ id: index + 1 }),
                            creatorButtonText: 'Thêm nhân viên mới',
                        }}
                        columns={columns}
                        request={async () => ({
                            data: defaultData,
                            total: 10,
                            success: true,
                        })}

                        value={dataSource}
                        onChange={setDataSource}
                        editable={{
                            form,
                            editableKeys,
                            onSave: async () => {
                                await waitTime(2000);
                            },
                            saveText: 'Lưu',
                            cancelText: 'Huỷ',
                            onChange: setEditableRowKeys,
                            actionRender: (row, config, dom) => [dom.save, dom.cancel, dom.delete],
                        }}
                    />
                </ProCard>
            </Col>
        </Row>
    );
};

export default Users