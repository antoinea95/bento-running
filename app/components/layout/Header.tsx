import SignoutButton from "../auth/signoutBtn";
import Image from "next/image";
import { fetchStravaProfile } from "../../lib/strava";
import { Suspense } from "react";
import { ThemeChanger } from "../ThemeChanger";
import { StravaProfileType } from "@/app/types/schema";
import { mockedProfile } from "@/app/utils/mock";

export default async function Header({mocked} : {mocked?:boolean}) {

  let profile:StravaProfileType;

  if(mocked) {
    profile = mockedProfile;
  } else {
    profile = await fetchStravaProfile();
  }



  return (
    <header className="header">
      <Suspense fallback={<p>Wecome ... </p>}>
        <h1>Welcome {profile.firstname}</h1>
      </Suspense>

        <div className="header-profile">
        <div className="header-profile_image">
          <Suspense fallback={<div></div>}>
            <Image
              src={profile.profile_medium === "avatar/athlete/medium.png" ? mockedProfile.profile_medium : profile.profile_medium}
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
