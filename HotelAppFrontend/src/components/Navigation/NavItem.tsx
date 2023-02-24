import Link from 'next/link';

type NavItemProps = {
  href: string;
  text: string;
};

export default function NavItem({ href, text }: NavItemProps) {
  return (
    <li>
      <Link href={href}>{text}</Link>
    </li>
  );
}
