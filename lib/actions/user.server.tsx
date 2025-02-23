
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";


// export async function getLoggedInUser() {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/auth/v1/get-user`, {
//             method: "GET",
//             credentials: "include",
//         });

//         if (!res.ok) {
//             throw new Error("Not authenticated");
//         }
//         const user = await res.json();
//         return parseStringify(user);
//     } catch (error) {
//         return null;
//     }

// }


export async function getLoggedInUser() {
    try {
        const sessionToken = localStorage.getItem("session_token"); 

        if (!sessionToken) {
            throw new Error("No session token found");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE}/auth/v1/get-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            },
        });

        if (!res.ok) {
            throw new Error("Not authenticated");
        }
        const user = await res.json();
        console.log(user)
        return user;
    } catch (error) {
        return null;
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


