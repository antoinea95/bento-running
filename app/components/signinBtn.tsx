"use client"

import { signIn } from "next-auth/react"

export default function SigninButton() {

    return (
        <button onClick={() => signIn("strava")}>Connect with strava</button>
    )
}