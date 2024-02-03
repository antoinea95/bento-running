
import SigninButton from "../components/signinBtn"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import SignoutButton from "../components/signoutBtn";

export default async function LoginPage() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/")
    }

    return (
        <>
            <h1>Sign Out</h1>
            <SignoutButton />
        </>
    )
}