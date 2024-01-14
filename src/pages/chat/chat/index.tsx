import Sibar from './Sibar'
import ProviderChat from './ProviderChat'

const Chat = () => {
    return (
        <div className='grid grid-cols-3 h-full'>
            <div className='col-span-1 ring-1 ring-gray-200'>
                <Sibar/>
            </div>
            <div className='col-span-2 h-full'>
                <ProviderChat/>
            </div>
        </div>
    )
}

export default Chat