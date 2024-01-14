import { Button } from 'antd'

const ButtonRemove = ({loading, removeAffiliateAccountMution, id, refetch}:any) => {
    return (
        <Button key={'delete'} type='primary' loading={loading} danger onClick={async () => {
            await removeAffiliateAccountMution({
                variables: {
                    removeAffiliateAccountId: id
                }
            })
            await refetch()
        }}>Xoá</Button>
    )
}

export default ButtonRemove