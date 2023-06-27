import NavItem from '@/components/Navigation/NavItem';
import Link from 'next/link';
import { navRoutes, routes as appRoutes } from '@/routes';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data } = useSession();

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl hover:bg-transparent" href={appRoutes.home}>
          Meet App
        </Link>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navRoutes.map((route) => (
            <NavItem key={route.href} {...route} />
          ))}
          <li tabIndex={0}>
            <a>
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
            </a>
            <ul className="p-2 bg-base-100">
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
