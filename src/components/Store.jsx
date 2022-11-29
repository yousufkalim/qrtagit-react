import React from 'react'
import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from './Login'

const Store = () => {
    const { authStatus, user } = useAuthenticator((context) => [context.user, context.authStatus])

    if (authStatus === 'authenticated') {
        // Get info from the JWT
        const cognitoSession = user.getSignInUserSession()
        const xecurifyCustomerID = '23154' // Provided by vendor
        
        // Specify the xecurify user store based on environment.
        const idpIdentifier = process.env.REACT_APP_SHOPIFY_USER_STORE_DEFINITION
        
        const jwtToken = cognitoSession.getIdToken().jwtToken
        const storeDomain = 'qrtagit.myshopify.com' // TODO: Set this to the correct store URL once it's customized.

        // TODO: How do we redirect to the store instead of /account or /cart?
        const shopifyRedirectURL = `https://store.xecurify.com/moas/broker/login/jwt/callback/${xecurifyCustomerID}/${idpIdentifier}/${jwtToken}?relay=https://store.xecurify.com/moas/broker/login/shopify/${storeDomain}/cart`

        // console.log(shopifyRedirectURL);
        
        // Redirect to shopify URL
        window.location.href = shopifyRedirectURL;
        return null
    
    } else {
        return (
            <>
            {authStatus === 'configuring' && 'Loading...'}
            <Login />
            </>
            
        )
    }
}

export default Store
