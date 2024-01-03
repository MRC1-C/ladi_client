import React, { useEffect, useState } from 'react'
import Sibar from './Sibar'
import ProviderChat from './ProviderChat'
import CreateOrder from './createOrder'
import axios from 'axios'

const Chat = () => {
    

    return (
        <div className='grid grid-cols-4 h-full'>
            <div className='col-span-1 ring-1 ring-gray-200'>
                <Sibar/>
            </div>
            <div className='col-span-3 h-full'>
                <ProviderChat/>
            </div>
        </div>
    )
}

export default Chat