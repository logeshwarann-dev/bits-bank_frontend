'use client';

import { revalidatePath } from "next/cache";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";

export const signIn = async (loginData: LoginUser) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/auth/v1/sign-in`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('In SignIn, Success:', data);
        localStorage.setItem("session_token", data.session_token); 
        return parseStringify(data.user);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/auth/v1/sign-up`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        localStorage.setItem("session_token", data.session_token); 
        // console.log("New User: ",data.user)
        return parseStringify(data.user);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function logoutAccount() {
    try{
        const sessionToken = localStorage.getItem("session_token");

        if (!sessionToken) {
            throw new Error("No session token found");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/auth/v1/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            },
        });

        if (!res.ok) {
            throw new Error("Session Not Deleted");
        }
        localStorage.removeItem("session_token");
        return true;
    }catch(error){
        console.error("Logout Error:", error);
        return false;    
    }
    
}

export const creatLinkToken = async (user: User) => {
    try {
        console.log("User in createLinkToken: ", user)
        // console.log(`Link Token Payload: {email: ${user.email}, name: ${user.firstName}} `)
        const response = await fetch(`${process.env.NEXT_PUBLIC_PLAID_SERVICE}/plaid/v1/token/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.userId,
                email: user.email, 
                name: user.firstName
            })
            
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tokenResponse = await response.json();
        console.log('Success:', tokenResponse);
        return parseStringify({linkToken: tokenResponse.link_token});
    } catch (error) {
        console.error('Error:', error);
    }
}


export const exchangePublicToken = async ({publicToken, user}: exchangePublicTokenProps) => {
    try {
        console.log("User in exchangePublicToken: ", user)
        const response = await fetch(`${process.env.NEXT_PUBLIC_PLAID_SERVICE}/plaid/v1/token/exchange`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                publicToken: publicToken, 
                user: user
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        revalidatePath("/")
        
        return parseStringify({publicTokenExchange: "complete"});
    } catch (error) {
        console.error('Error while exchanging token:', error);
    }
}



export const getAccounts = async ({userId}: getAccountsProps) => {
    try {
        console.log("UserId in getAccounts: ", userId)
        const response = await fetch(`${process.env.NEXT_PUBLIC_PLAID_SERVICE}/plaid/v1/get/accounts`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
            })
            
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const accountsResponse = await response.json();
        console.log('Success:', accountsResponse);
        return parseStringify({data: accountsResponse});
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getAccount  = async ({appwriteItemId}: getAccountProps) => {
    try {
        console.log("UserId in getAccounts: ", appwriteItemId)
        const response = await fetch(`${process.env.NEXT_PUBLIC_PLAID_SERVICE}/plaid/v1/get/account`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plaidTrackId: appwriteItemId,
            })
            
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const accountResponse = await response.json();
        console.log('Success:', accountResponse);
        return parseStringify({data: accountResponse});
    } catch (error) {
        console.error('Error:', error);
    }
}

export const transferPayment  = async ({data}: any) => {
    try {
        console.log("in transferpayment: ", data)
        const response = await fetch(`${process.env.NEXT_PUBLIC_PLAID_SERVICE}/plaid/v1/dwolla/transfer`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data,
            })
            
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const transaction = await response.json();
        console.log('Success:', transaction);
        return parseStringify({transaction});
    } catch (error) {
        console.error('Error:', error);
    }
}


