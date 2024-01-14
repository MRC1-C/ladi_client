import { gql } from "@apollo/client";

export const FindAllConversations = gql`
    query FindAllConversations {
        findAllConversations {
            id
            Clients {
                name
                recipient_id
            }
            AffiliateAccount {
                name
                avatar
            }
        }
    }
`
export const FindAllMessenger = gql`
    mutation FindAllMessenger($findAllMessengerId: String!) {
        findAllMessenger(id: $findAllMessengerId) {
        text
        createdAt
        client {
            id
            name
        }
        conversationsId
        }
    }
`

export const SendMess = gql`
mutation SendMess($sendMessengerInput: SendMess!) {
    sendMess(sendMessengerInput: $sendMessengerInput) {
      text
    }
  }
`