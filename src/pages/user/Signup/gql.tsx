import { gql } from "@apollo/client"



export const SIGN_UP = gql`
    mutation Signup($signupInput: LoginInput!) {
        signup(signupInput: $signupInput) {
            accessToken
            error
        }
    }
`