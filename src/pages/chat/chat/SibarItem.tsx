import { Avatar } from 'antd'
import { Typography } from 'antd';
import { conversationsIdState, recipientId } from '../../../stores/app/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

const { Title, Text } = Typography;

const SibarItem = (props: any) => {
    const [conversationsId, setConversationsId] = useRecoilState(conversationsIdState)
    const setRecipient_id = useSetRecoilState(recipientId)

    return (
        <div onClick={() => {
            setConversationsId(props.id)
            setRecipient_id(props.client.recipient_id)
        }}
            className={`flex items-center justify-between p-4 gap-4 cursor-pointer ring-1 ring-purple-500 rounded-xl shadow-md ${props.id == conversationsId && "bg-white"}`}>
            <div className='flex gap-2'>
                <div>
                    <Avatar size={'large'} >
                        {props.client.name.split(" ")[0]}
                    </Avatar>
                </div>
                <Title level={5}>
                    {props.client.name}
                </Title>
            </div>
            <div className='flex flex-col justify-center items-end'>
                <div>
                    <Avatar size={'large'} src={props.affiliateAccount.avatar} />
                </div>
                <Text>{props.affiliateAccount.name}</Text>

            </div>
        </div>
    )
}

export default SibarItem