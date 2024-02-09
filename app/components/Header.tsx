import Link from "next/link";
import SignoutButton from "./auth/signoutBtn";
import { StravaProfileSchema, StravaProfileType } from "../types/schema";
import Image from "next/image";
import { fetchStravaApi } from "../lib/strava";

export default async function Header() {

  const profile = await fetchStravaApi <StravaProfileType>("https://www.strava.com/api/v3/athlete", StravaProfileSchema);
  
  if(!profile.data) {
      return <p>Loading...</p>
  }


  return (
    <header className="header">
      <p>Welcome {profile.data.firstname}</p>

      <div className="header-profile">
        <Image
          src={profile.data.profile_medium}
          alt="Profile picture"
          width={40}
          height={40}
          className="header-profile_img"
        />
        <SignoutButton />
      </div>
    </header>
  );
};
