"use client"

import {signOut } from "next-auth/react"

export default function SignoutButton() {

    return (
        <button onClick={() => signOut()}>Connect with strava</button>
    )
}