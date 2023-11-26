import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
} from '@ant-design/pro-components';
import { Tag } from 'antd';
import React, { useState } from 'react';
import PermissionManagement from '../../Test1/Tree';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  labels?: string[];
  children?: DataSourceType[];
};

const colors = ['bg-indigo-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500']
const TagList: React.FC<{
  value?: [];
  onChange?: (
    value: [],
  ) => void;
}> = ({ value, onChange }) => {
  return (
    <PermissionManagement value={value} onChange={onChange} />
  );
};
const defaultData: DataSourceType[] = [];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Vai trò',
      dataIndex: 'title',
      tooltip: 'Quyền vào các trang',
      width: '15%',
    },
    {
      title: 'Quyền',
      dataIndex: 'labels',
      width: '75%',
      valueType: 'formList',
      renderFormItem: () => <TagList />,
      render: (_, row) => row?.labels?.map((item) => {
        if (item.includes('*')) {
          let i = item.split('*')
          let color = ''
          switch (i[1]) {
            case "Create":
              color = colors[0]
              break;

            case "Read":
              color = colors[1]
              break;

            case "Update":
              color = colors[2]
              break;

            case "Delete":
              color = colors[3]
              break;
            default:
              console.log("Hành động không được nhận diện");
          }
          return <Tag key={item} className={`${color} text-white`}>{i[0] + "-" + i[1]}</Tag>
        }
      })
 
    },
    {
      title: '',
      valueType: 'option',
      width: '10%',
      render: (__, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Sửa
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Xoá
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="Bảng vai trò"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: 'top',
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
          creatorButtonText: 'Tạo vai trò mới',
        }
        }
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          saveText: "Lưu",
          cancelText: 'Huỷ',
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime();
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};