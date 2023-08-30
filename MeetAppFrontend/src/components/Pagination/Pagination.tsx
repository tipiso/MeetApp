type Props = {
  pageSize: number;
  totalPage: number;
  totalSize: number;
  currentPage: number;
};

export default function Pagination({ pageSize, totalSize, totalPage, currentPage }: Props) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <div className="join">
      {pages.map((p) => (
        <button className={p == currentPage ? 'btn-active btn-md join-item btn' : 'btn-md join-item btn'}>{p}</button>
      ))}
    </div>
  );
}
