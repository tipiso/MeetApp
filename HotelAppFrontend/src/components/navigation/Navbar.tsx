import NavItem from '@/components/navigation/NavItem';

const routes = [{ href: 'users', text: 'Users' }];

export default function Navbar() {
  return (
    <header className="flex p-3">
      <nav>
        {routes.map((route) => (
          <NavItem key={route.href} {...route} />
        ))}
      </nav>
    </header>
  );
}
