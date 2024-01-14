import { Avatar } from 'antd'
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';


const MessengerItem = (props: any) => {
    return (
        <div className={`w-full p-3 flex gap-3 ${props.me ? "flex-row-reverse" : 'flex-row'}`}>
            <Avatar src='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg' />
            <div className={`max-w-[60%] p-2 ${!props.me?"bg-purple-500 text-white ":"bg-white text-black"} rounded-xl shadow-xl`}>
                <p className="mb-2">{props.mess}</p>
                <span className="text-xs text-gray-300">{formatDistanceToNow(new Date(props.createdAt), { addSuffix: true, locale: vi })}</span>
            </div>
        </div>
    )
}

export default MessengerItem