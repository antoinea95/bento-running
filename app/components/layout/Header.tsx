import SignoutButton from "../auth/signoutBtn";
import Image from "next/image";
import { fetchStravaProfile } from "../../lib/strava";
import { Suspense } from "react";

export default async function Header() {
  const profile = await fetchStravaProfile();

  return (
    <header className="header">
      <Suspense fallback={<p>Wecome ... </p>}>
        <p>Welcome {profile.firstname}</p>
      </Suspense>

      <div className="header-profile">
        <div className="header-credits">
          <p>Powered by</p>
          <Image
            src="/images/strava-logo.webp"
            width={30}
            height={30}
            alt="Strava logo"
          />
        </div>
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
        <SignoutButton />
      </div>
    </header>
  );
}
