import { ProForm, ProFormList, ProFormText, ProFormTextArea } from '@ant-design/pro-components'

const FormCreateProduct = () => {
    return (
        <div>
            <ProForm.Group>
                <ProFormText
                    name="name"
                    width="md"
                    label="Tên tài khoản"
                    placeholder="Tài khoản"

                />
                <ProFormList
                    name="tags"
                    initialValue={[]}
                    creatorButtonProps={{
                        position: 'bottom',
                        creatorButtonText: 'Building a line',
                    }}
                    creatorRecord={{
                        tag: 'none',
                    }}
                >
                    <ProFormText
                        key="tag"
                        width="md"
                        name="useMode"
                        label="Contract agreement effective method"
                    />
                </ProFormList>
            </ProForm.Group>
            <ProFormTextArea
                name="description"
                label="Mô tả"
                placeholder="Nội dung"
            />

        </div>
    )
}

export default FormCreateProduct