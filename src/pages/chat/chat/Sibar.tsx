import SibarItem from './SibarItem'
import { useQuery } from '@apollo/client'
import { FindAllConversations } from './gql'

const Sibar = () => {
    const { loading, error, data } = useQuery(FindAllConversations)
    if (error) {
        return <div>err</div>
    }
    if (loading) {
        return <div>loading...</div>
    }
    console.log(data.findAllConversations[0])
    return (
        <div className='w-full p-3 flex flex-col gap-3 h-[calc(100vh-56px)] overflow-y-auto '>
            {
                data.findAllConversations.map((dt:any) => (
                    <SibarItem key={dt.id} id={dt.id} client={dt.Clients[0]} affiliateAccount={dt.AffiliateAccount}/>
                ))
            }
        </div>
    )
}

export default Sibar