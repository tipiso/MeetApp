import NavItem from '@/components/Navigation/NavItem';
import Link from 'next/link';
import { navRoutes, routes as appRoutes } from '@/routes';
import { signOut, useSession } from 'next-auth/react';
import Logo from '@/assets/images/Logo.svg';
import Image from 'next/image';

export default function Navbar() {
  const { data } = useSession();

  return (
    <header className="navbar bg-base-100 pt-12 px-12">
      <div className="flex-1">
        <Link className="h-6 normal-case text-xl relative w-32 disabled:hover" href={appRoutes.home}>
          <Image fill src={Logo} alt="meetApp logo" />
        </Link>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navRoutes.map((route) => (
            <NavItem key={route.href} {...route} />
          ))}
          <li className="dropdown" tabIndex={0}>
            <label tabIndex={0}>
              {data?.user?.name}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-50 mt-4">
              <li onClick={() => signOut({ callbackUrl: appRoutes.signin })}>
                <a>Log out</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
