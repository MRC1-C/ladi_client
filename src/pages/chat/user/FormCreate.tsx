import { ProForm, ProFormMoney, ProFormSelect, ProFormText } from '@ant-design/pro-components'

const FormCreate = () => {
    return (
        <div>
            <ProForm.Group>
                <ProFormText
                    name="name"
                    width="md"
                    label="Tên tài khoản"
                    placeholder="Tài khoản"
                />
                <ProFormSelect
                    options={[
                        {
                            value: 'FACEBOOK',
                            label: 'FACEBOOK',
                        },
                    ]}
                    width="md"
                    name="type"
                    label="Loại tài khoản"
                    placeholder="Loại tài khoản"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    name="avatar"
                    width="md"
                    label="Ảnh"
                    placeholder="url ảnh"
                />
                <ProFormText
                    width="md"
                    name="accesstoken"
                    label="Mã"
                    placeholder="Mật khẩu"
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormMoney
                    name="expiry_date"
                    width="md"
                    label="Ngày hết hạn"
                    placeholder="Tài khoản"
                />

            </ProForm.Group>
            {/* <Button onClick={()=>{

            }}>Thêm tài khoản</Button> */}
        </div>
    )
}

export default FormCreate