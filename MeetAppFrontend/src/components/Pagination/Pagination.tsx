type Props = {
  totalCount: number;
};

export default function Pagination({ totalCount }: Props) {
  return (
    <div className="join">
      <button className="btn-md join-item btn">1</button>
      <button className="btn-active btn-md join-item btn">2</button>
      <button className="btn-md join-item btn">3</button>
      <button className="btn-md join-item btn">4</button>
    </div>
  );
}
