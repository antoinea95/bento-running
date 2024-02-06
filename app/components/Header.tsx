import Link from "next/link";
import SignoutButton from "./auth/signoutBtn";
import { StravaProfileType } from "../types/schema";
import Image from "next/image";

export default function Header({ profile }: { profile: StravaProfileType }) {
  return (
    <header className="header">
      <p>Welcome {profile.firstname}</p>

      <div className="header-profile">
        <Image
          src={profile.profile_medium}
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
