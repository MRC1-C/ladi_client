import {
  DrawerForm,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

type DrawerType = {
  name: string,
  content: any,
  onFinish: any
}

const DrawerComponent = ({name, content, onFinish}: DrawerType) => {
  const [form] = Form.useForm<any>();

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title={name}
      form={form}
      trigger={
        <Button type="primary">
          {name}
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={onFinish}
      
    >
      {content}
    </DrawerForm>
  );
};

export default DrawerComponent