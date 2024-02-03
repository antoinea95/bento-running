import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <ul className="flex gap-x-4">
        <li>
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
        </li>

        <li>
          <Link href="/signin" className="text-white hover:underline">
            Sign In
          </Link>
        </li>

        <li>
          <Link href="/signout" className="text-white hover:underline">
            Sign Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};