import Link from 'next/link';

type Breadcrumb = {
  text: string;
  link: string;
  active?: boolean;
};
type Props = {
  breadcrumbs: Breadcrumb[];
};

export default function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {breadcrumbs.map((bc) => (
          <li className={bc.active ? 'pointer-events-none font-bold' : ''}>
            <Link href={bc.link}>{bc.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
