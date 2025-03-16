
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { getAccounts as fetchAccounts, getAccount as fetchAccount } from "@/lib/actions/user.actions";

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


export async function getLoggedInUser(sessionToken: string | null) {
    try {
        console.log("inside getLoggedInUser function")
        // const sessionToken = localStorage.getItem("session_token"); 
        console.log("Auth token: ", sessionToken)
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



