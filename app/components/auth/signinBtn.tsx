"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"


export default function SigninButton() {

    return (
        <button 
        className="signin-btn"
        onClick={() => signIn("strava")}
        >
            <span>Sign in with strava</span>
            <Image src={"/images/strava-icon.webp"} alt="Logo de strava" width={100} height={20} />

        </button>
    )
}