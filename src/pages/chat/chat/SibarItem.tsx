import { Avatar } from 'antd'
import React from 'react'

const SibarItem = () => {
    return (
        <div className='flex items-center p-4 gap-4 cursor-pointer ring-1 ring-purple-500 rounded-xl shadow-md'>
            <div>
                <Avatar size={'large'} src="https://i.pinimg.com/736x/cf/8f/a1/cf8fa1c86f5bc90e87bbd14fc80356b0.jpg" />
            </div>
            <div>
                <div className='font-bold'>
                    XJoke
                </div>
                <div className='font-thin text-gray-500'>
                    Hãy trả lời tin nhắn
                </div>
            </div>
        </div>
    )
}

export default SibarItem