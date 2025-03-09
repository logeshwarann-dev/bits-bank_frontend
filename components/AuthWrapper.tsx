"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.server";

interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const sessionToken = localStorage.getItem("session_token");
            if (!sessionToken) {
                setUser(null); // Ensure user state updates
                router.push("/sign-in");
                return;
            }

            const loggedInUser = await getLoggedInUser(sessionToken);
            if (!loggedInUser) {
                setUser(null); // Ensure logout state is properly reflected
                router.push("/sign-in");
            } else {
                setUser(loggedInUser);
            }
        }

        fetchUser();
    }, [router]);

    if (user === undefined) return <p>Loading...</p>;

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
