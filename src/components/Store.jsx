import React from 'react'
import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from './Login'


const Store = () => {
    const { signOut, user } = useAuthenticator((context) => [context.user])
  
    return (
        <>
        {!user ? <Login /> :
            <div>
                <h1>Shopify</h1>
                <div className="px-2 bodyText">Hello {user.attributes.email}</div>
                <div className="p-2"><button onClick={signOut} className="btn btn-sm btn-outline-secondary btn-rounded">Sign out</button></div>
            </div>
        }
        </>
        
    )
}

export default Store