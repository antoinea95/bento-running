import SignoutButton from "../auth/signoutBtn";
import Image from "next/image";
import { fetchStravaProfile } from "../../lib/strava";
import { Suspense } from "react";
import { ThemeChanger } from "../ThemeChanger";

export default async function Header() {
  const profile = await fetchStravaProfile();

  return (
    <header className="header">
      <Suspense fallback={<p>Wecome ... </p>}>
        <p>Welcome {profile.firstname}</p>
      </Suspense>

        <div className="header-profile">
        <div className="header-profile_image">
          <Suspense fallback={<div></div>}>
            <Image
              src={profile.profile_medium}
              alt="Profile picture"
              width={40}
              height={40}
              className="header-profile_img"
            />
          </Suspense>
        </div>
        <ThemeChanger />
        <SignoutButton />
        </div>
    </header>
  );
}
