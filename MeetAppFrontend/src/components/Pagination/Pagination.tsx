type Props = {
  pageSize: number;
  totalPage: number;
  totalSize: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

export default function Pagination({ pageSize, totalSize, totalPage, currentPage, handlePageChange }: Props) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="join flex w-full justify-center ">
      {pages.map((p) => (
        <button
          onClick={() => handlePageChange(p)}
          className={
            p == currentPage ? 'btn-primary btn-active btn-md join-item btn' : 'btn-neutral btn-md join-item btn'
          }
        >
          {p}
        </button>
      ))}
    </div>
  );
}
