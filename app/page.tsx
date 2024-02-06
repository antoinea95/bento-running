
import SigninButton from "./components/auth/signinBtn"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export default async function LoginPage() {

    const session = await getServerSession(authOptions);

    if(session) {
        redirect("/dashboard")
    }

    return (
        <article className="signin">
            <h1>Running Dashboard</h1>
            <SigninButton />
        </article>
    )
}