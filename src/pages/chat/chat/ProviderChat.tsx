import { Button, Input, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import MessengerItem from './MessengerItem'
import { useMutation } from '@apollo/client'
import { FindAllMessenger, SendMess } from './gql'
import { useRecoilValue } from 'recoil'
import { conversationsIdState, conversationsState, recipientId } from '../../../stores/app/atoms'
import axios from 'axios'
import AutoScrollContainer from '../../../components/AutoScrollContainer'

const ProviderChat = () => {
    const [input, setInput] = useState('')
    const conversationsId = useRecoilValue(conversationsIdState)
    const conversations = useRecoilValue(conversationsState)
    const recipient_id = useRecoilValue(recipientId)
    const [sendMess, { loading: ld }] = useMutation(SendMess);


    const [findAll, { loading, error, data }] = useMutation(FindAllMessenger);
    useEffect(() => {
        if (conversationsId) {
            findAll({ variables: { findAllMessengerId: conversationsId } })
        }
    }, [conversationsId]);
    if (error) {
        return <div>err</div>
    }
    const onSubmit = () => {
        sendMess(({
            variables: {
                sendMessengerInput: {
                    "text": input,
                    "recipient_id": recipient_id,
                    "conversationsId": conversationsId
                }
            }
        }))
    }

    const onExtrax = () => {
        const dt = data?.findAllMessenger.map((dt:any) => `${dt.client?dt.client.name:"Người bán hàng"}: ${dt.text}`).join('\n')
        console.log(dt)
        axios.post('http://127.0.0.1:5000/process_data', {
            text: dt
        })
            .then(data => console.log(data))
    }

    return (
        <div className='w-full h-[calc(100vh-56px)] overflow-y-auto p-3'>
            <div className='h-[calc(100%-32px)]'>
                <AutoScrollContainer>
                    {loading && <Skeleton className='h-full' />}
                    {data?.findAllMessenger.map((dt: any) => {
                        return (
                            <MessengerItem key={dt.id} me={!dt.client} createdAt={dt.createdAt} mess={dt.text} />
                        )
                    })}
                    {conversations.map((dt: any, index) => {
                        return dt.Conversations.id == conversationsId && (
                            <MessengerItem key={index} me={!dt.client} createdAt={dt.createdAt} mess={dt.text} />
                        )
                    })}

                </AutoScrollContainer>
            </div>
            <div className='flex gap-3'>
                <Input placeholder='Nhập tin nhắn' value={input} onChange={e => setInput(e.target.value)} />
                <Button loading={ld} onClick={onSubmit} type='primary'>Gửi</Button>
                <Button onClick={onExtrax} type='primary'>Extrac</Button>

            </div>
        </div>
    )
}

export default ProviderChat