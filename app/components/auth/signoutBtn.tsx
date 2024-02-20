"use client"

import { LogOut } from "lucide-react";
import {signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export default function SignoutButton() {

    return (
        <button 
        onClick={() => signOut({callbackUrl: "/"})}
        className="signout-btn"
        >
            <LogOut className="header-profile_logout" />
        </button>
    )
}