type Props = {
  pageSize: number;
  totalPage: number;
  totalSize: number;
  currentPage: number;
  /**TODO: Maybe handle this more gracefully than open type */
  handlePageChange: (page: number, formValues?: any) => void;
  formValues?: Record<string, unknown>;
};

export default function Pagination({
  totalPage,
  currentPage,
  handlePageChange,
  formValues,
}: Props) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const isValues = !!formValues;

  return (
    <div className="join flex w-full justify-center pt-4">
      {pages.map((p) => (
        <button
          onClick={() => (isValues ? handlePageChange(p, formValues) : handlePageChange(p))}
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
