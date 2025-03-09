"use client";  // ✅ Ensure this is a client component

import { useAuth } from "@/components/AuthWrapper"; // ✅ Use the auth hook
import { logoutAccount } from "@/lib/actions/user.actions"; // ✅ Import from client-side file
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ type = "desktop" }) => {
    const { user, setUser } = useAuth(); // ✅ Get user from auth hook
    const router = useRouter();

    const handleLogout = async () => {
        const loggedOut = await logoutAccount();
        if (loggedOut) {
            setUser(null); // ✅ Clear user state
            router.push("/sign-in");
        }
    };

    return (
        <footer className="footer">
            <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
                <p className="text-xl font-bold text-gray-700">{user?.firstName?.[0]}</p>
            </div>
            <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">{user?.username}</p>
            </div>
            <div className="footer_image" onClick={handleLogout}>
                <Image src="icons/logout.svg" fill alt="Logout" />
            </div>
        </footer>
    );
};

export default Footer;
