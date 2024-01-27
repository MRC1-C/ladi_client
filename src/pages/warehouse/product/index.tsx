import {
  ProList,
} from '@ant-design/pro-components';
import { Image, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import DrawerComponent from '../../../components/drawer';
import FormCreateProduct from './FormCreateProduct';





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
  return ({
    title: item,
    subTitle: <Tag color="#5BD8A6">New</Tag>,
    actions: [<a key="run">Sửa</a>, <a key="delete">Xoá</a>],
    content: (
      <div
        className='w-full aspect-square'
      >
        <Image className='w-full aspect-square object-cover rounded-lg' preview={false} src='https://tq1.mediacdn.vn/thumb_w/660/203336854389633024/2021/2/18/rose-20-16136423199831820634769.jpg' />
      </div>
    ),
  })
});

const Product = () => {
  return (
    <div
      className='p-2'
    >
      <div className='flex justify-between p-2'>
        <div>
          <Search placeholder='Tìm kiếm'/>
        </div>
        <DrawerComponent name="Tạo sản phẩm" content={<FormCreateProduct />} onFinish={()=>console.log('first')}/>
        {/* <Button type='primary'>Tạo sản phẩm</Button> */}
      </div>
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
        search={false}
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
              // navigate('/marketing/ads-detail')
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
        headerTitle="Sản phẩm"
        dataSource={data}
      />
    </div>
  );
};

export default Product