import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import MessengerItem from './MessengerItem'
import axios from 'axios'

const ProviderChat = () => {
    const [input, setInput] = useState('')
    const [data, setData] = useState<any>([])
    useEffect(() => {
        axios.get('http://localhost:3000/facebook/mess/')
            .then(data => setData(data.data.data))
    }, [])
    const onSubmit = () => {
        axios.post('http://localhost:3000/facebook/send/' + input)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
        setInput('')
        axios.get('http://localhost:3000/facebook/mess/')
            .then(data => setData(data.data.data))
    }
    return (
        <div className='w-full h-[calc(100vh-56px)] overflow-y-auto p-3'>
            <div className='h-[calc(100%-32px)] overflow-y-auto p-3 flex flex-col-reverse gap-3'>
                {data.map((dt: any) => {
                    return (

                        dt.from.name != "Xjoke" ?
                            <MessengerItem mess={dt.message}/> :
                            <MessengerItem me mess={dt.message}/>

                    )
                })}

            </div>
            <div className='flex gap-3'>
                <Input placeholder='Nhập tin nhắn' value={input} onChange={e => setInput(e.target.value)} />
                <Button onClick={onSubmit} type='primary'>Gửi</Button>
            </div>
        </div>
    )
}

export default ProviderChat