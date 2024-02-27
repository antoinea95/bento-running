
import SigninButton from "./components/auth/signinBtn"
import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import DemoButton from "./components/auth/demoBtn";

export default async function LoginPage() {

    //check if user is logged
    const session = await getServerSession(authOptions);

    if(session) {
        redirect("/dashboard")
    }

    return (
        <article className="signin">
            <div className="signin-container">
                <section className="signin-image">
                    <Image src="/images/screen-dark.png" width={1000} height={500} alt="Screen" />
                </section>
                <div className="signin-content">
                <section className="signin-title">
                    <h1>Bento running</h1>
                </section>
                <section className="signin-text">
                    <p>Follow your Strava Data with simplicity </p>
                </section>
                <section className="signin-connect">
                <SigninButton />
                </section>
                </div>  
            </div>  
            <section className="signin-demo">
                    <p>{"You don't have a Strava Account ? "}<DemoButton /></p>
            </section>
        </article>
    )
}