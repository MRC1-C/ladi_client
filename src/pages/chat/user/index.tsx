import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import DrawerComponent from '../../../components/drawer';
import { Avatar, Button } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { FindAllAffiliateAccount, RemoveAffiliateAccount, UpdateAffiateAccout, getUrlLogin } from './gql';
import FormCreate from './FormCreate';

const User = () => {
  const actionRef = useRef<ActionType>();
  const { loading, error, data, refetch } = useQuery(FindAllAffiliateAccount);
  const [removeAffiliateAccountMution, { loading: loadingRemove }] = useMutation(RemoveAffiliateAccount);
  const [updateAffiliateAccountMution] = useMutation(UpdateAffiateAccout);
  const { data: dataUrl } = useQuery(getUrlLogin, {
    variables: {
      "affiliateAccount": {
        "type": "FACEBOOK"
      }
    }
  })

  const [loadingId, setLoadingId] = useState('')

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      tip: 'Id',
      hideInTable: true,
      key: "id"
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      align: 'center',
      copyable: true,
      tip: 'Tên'
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      copyable: true,
      tip: 'Tên',
      render: (_, record) => {
        return <Avatar src={record.avatar} />
      }
    },
    {
      title: 'Kiểu tài khoản',
      dataIndex: 'type',
      copyable: true,
      tip: 'Tên'
    },
    {
      title: 'Mã',
      dataIndex: 'accesstoken',
      copyable: true,
      ellipsis: true,
      tip: 'Tên',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiry_date',
      copyable: true,
      tip: 'Tên'
    },
    {
      title: 'chatbot',
      dataIndex: 'bot',
      copyable: true,
      tip: 'Tên',
      render: (_, record) => {
        return <div>{record.bot ? <img className='h-6' src='https://cdn-icons-png.flaticon.com/512/1698/1698535.png' /> : <div>X</div>}</div>
      }
    },
    {
      title: '',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <div key={'edit'}>
          <DrawerComponent name='Sửa' content={<div>ádf</div>} onFinish={() => true} />
        </div>,
        <Button key={'delete'} type='primary' loading={record.id == loadingId ? loadingRemove : false} danger onClick={async () => {
          setLoadingId(record.id)
          await removeAffiliateAccountMution({
            variables: {
              removeAffiliateAccountId: record.id
            }
          })
          await refetch()
        }}>Xoá</Button>,
        <Button key={'bot'} onClick={async () => {
          await updateAffiliateAccountMution({
            variables: {
              "updateAffiliateAccountId": record.id,
              "updateAffiliateAccountInput": {
                "bot": {
                  "set": !record.bot
                }
              }
            }
          })
          await refetch()
        }}>
          <img className='h-6 w-6 object-contain' src='https://cdn-icons-png.flaticon.com/512/1698/1698535.png' />
        </Button>
      ],
    },
  ];

  if (error) {
    return <>err</>
  }
  return (
    <div className='p-2 flex flex-col gap-3'
    >
      <div className='self-end'>
        <DrawerComponent name='Thêm tài khoản liên kết' content={<FormCreate />} onFinish={async () => {
          // await createAffiliateAccountMution({
          //   variables: { createAffiliateAccountInput: { ...e, bot: false } },
          // })

          // Các tùy chọn cho cửa sổ mới
          let windowFeatures = 'width=600,height=400,location=yes,menubar=yes,toolbar=yes';

          // Sử dụng window.open() để mở cửa sổ mới
          window.open(dataUrl.getUrlLogin, '_blank', windowFeatures);

          // await refetch()
          return true
        }} />
      </div>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        dataSource={data && data.findAllAffiliateAccount}
        cardBordered
        loading={loading}
        options={false}
        rowKey="id"
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        search={false}
        dateFormatter="string"
        headerTitle="Tài khoản liên kết"

      />
    </div>
  );
};

export default User