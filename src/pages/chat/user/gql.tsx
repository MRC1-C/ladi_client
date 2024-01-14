import { gql } from "@apollo/client";


export const FindAllAffiliateAccount = gql`
    query FindAllAffiliateAccount {
        findAllAffiliateAccount {
        name
        accesstoken
        avatar
        type
        expiry_date
        id
        bot
        }
    }
`

export const CreateAffiliateAccount = gql`
    mutation CreateAffiliateAccount($createAffiliateAccountInput: AffiliateAccountCreateInput!) {
        createAffiliateAccount(createAffiliateAccountInput: $createAffiliateAccountInput) {
            name
        }
    }
`

export const RemoveAffiliateAccount = gql`
    mutation RemoveAffiliateAccount($removeAffiliateAccountId: String!) {
        removeAffiliateAccount(id: $removeAffiliateAccountId) {
        name
        }
    }
`
export const UpdateAffiateAccout = gql`
    mutation UpdateAffiliateAccount($updateAffiliateAccountId: String!, $updateAffiliateAccountInput: AffiliateAccountUpdateInput!) {
        updateAffiliateAccount(id: $updateAffiliateAccountId, updateAffiliateAccountInput: $updateAffiliateAccountInput) {
            bot
        }
    }
`

export const getUrlLogin = gql`
    query Query($affiliateAccount: AffiliateAccountType!) {
        getUrlLogin(affiliate_account: $affiliateAccount)
    }
`