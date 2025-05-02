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
    const admin = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const pathname = usePathname();
    setLocalStorage("path", pathname);


    useEffect(() => {
        if (!admin) {
            router.replace("/sign-in");
        } else {
            router.replace(getLocalStorage("path") || "/admin");
        }
    }, [admin, router]); // Runs when admin state changes

    if (!admin) {
        return null; // Prevent rendering before redirect
    }

    return <div>{children}</div>;
};

export default AdminPrivateLayout;