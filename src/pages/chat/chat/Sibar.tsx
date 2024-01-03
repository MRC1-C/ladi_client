import { Avatar } from 'antd'
import SibarItem from './SibarItem'

const Sibar = () => {
    return (
        <div className='w-full p-3 flex flex-col gap-3 h-[calc(100vh-56px)] overflow-y-auto '>
            <SibarItem />
        </div>
    )
}

export default Sibar