import SibarItem from './SibarItem'
import { useQuery } from '@apollo/client'
import { FindAllConversations } from './gql'
import { useSetRecoilState } from 'recoil'
import { conversationsIdState, recipientId } from '../../../stores/app/atoms'

const Sibar = () => {
    const { loading, error, data } = useQuery(FindAllConversations)
    const setConversationsId = useSetRecoilState(conversationsIdState)
    const setRecipient_id = useSetRecoilState(recipientId)

    if (error) {
        return <div>err</div>
    }
    if (loading) {
        return <div>loading...</div>
    }
    if (data) {
        setConversationsId(data.findAllConversations[0].id)
        setRecipient_id(data.findAllConversations[0].Clients[0]?.recipient_id)
    }
    return (
        <div className='w-full p-3 flex flex-col gap-3 h-[calc(100vh-56px)] overflow-y-auto '>
            {
                data.findAllConversations.map((dt: any) => (
                    <SibarItem key={dt.id} id={dt.id} client={dt.Clients[0]} affiliateAccount={dt.AffiliateAccount} />
                ))
            }
        </div>
    )
}

export default Sibar