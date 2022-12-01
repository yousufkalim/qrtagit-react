import React from 'react'
import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from './Login'

const Store = () => {
    const { authStatus, user } = useAuthenticator((context) => [context.user, context.authStatus])

    if (authStatus === 'authenticated') {
        // Get info from the JWT
        const cognitoSession = user.getSignInUserSession()
        const xecurifyCustomerID = process.env.REACT_APP_SHOPIFY_SSO_CUSTOMER_ID // Provided by vendor
        
        // Specify the xecurify user store based on environment.
        const idpIdentifier = process.env.REACT_APP_SHOPIFY_USER_STORE_ID
        
        const jwtToken = cognitoSession.getIdToken().jwtToken
        const storeDomain = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN

        const shopifyRedirectURL = `https://store.xecurify.com/moas/broker/login/jwt/callback/${xecurifyCustomerID}/${idpIdentifier}/${jwtToken}?relay=https://store.xecurify.com/moas/broker/login/shopify/${storeDomain}/index`
        
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
