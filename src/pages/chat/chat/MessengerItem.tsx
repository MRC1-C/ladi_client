import { Avatar } from 'antd'
import React from 'react'

const MessengerItem = (props: any) => {
    return (
        <div className={`w-full flex ${props.me ? "justify-end" : 'justify-start'}`}>
            <div className={`flex gap-3 ${props.me ? "self-start" : "self-end"}`}>
                <Avatar src='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'/>
                <div className="max-w-2/3 p-2 bg-purple-500 text-white rounded-xl shadow-lg">
                    <p className="mb-2">{props.mess}</p>
                    <span className="text-xs text-gray-300">12:34 PM</span>
                </div>
            </div>
        </div>
    )
}

export default MessengerItem