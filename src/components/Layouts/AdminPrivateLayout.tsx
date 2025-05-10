"use client";
// components/PrivateLayout.tsx
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface PrivateLayoutProps {
    children: ReactNode;
}

const AdminPrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const pathname = usePathname();
    setLocalStorage("path", pathname);
// console.log(user);


    useEffect(() => {
        if (!user?.isAdmin) {
            router.replace("/auth/login");
        } else {
            router.replace(getLocalStorage("path") || "/admin");
        }
    }, [user, router]); // Runs when admin state changes

    if (!user) {
        return null; // Prevent rendering before redirect
    }

    return <div>{children}</div>;
};

export default AdminPrivateLayout;