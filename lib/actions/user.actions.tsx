'use client';

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
        // console.log('Success:', data);
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
        
        return parseStringify(response);
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




