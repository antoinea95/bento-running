"use client"

import Link from "next/link"
import { redirect } from "next/navigation"


export default function DemoButton() {

    return (
        <Link
        className="signin-demo_link"
        href={"/demo"}
        aria-label="Check Demo"
        >
            <span>Check demo</span>

        </Link>
    )
}