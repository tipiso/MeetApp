import Link from 'next/link';

type NavItemProps = {
  href: string;
  text: string;
};

export default function NavItem({ href, text }: NavItemProps) {
  return (
    <div className="mr-2">
      <Link href={href}>{text}</Link>
    </div>
  );
}
