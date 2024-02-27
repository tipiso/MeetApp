import { PaginationHeaders } from '@/components/Pagination/types';
import { User } from '@/features/users/types';
import SuggestionCard from '../SuggestionCard';
import Pagination from '@/components/Pagination/Pagination';
import { SearchFriendsDTO } from '@/services/Users/dtos';

type Props = {
  wasFetched?: boolean;
  users?: User[];
  pagination: PaginationHeaders;
  formValues?: Record<string, unknown>;
  totalItems: number;
  getPage: (pageNumber: number, formValues: SearchFriendsDTO) => Promise<void>;
};

export default function Results({ wasFetched, users, pagination, formValues, getPage, totalItems }: Props) {
  if (!wasFetched || !users) return null;

  return (
    <div>
      {users && users.length ? (
        <>
          <p className="text-2xl font-bold">Search results ({totalItems})</p>
          <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((u) => (
              <SuggestionCard key={u.id} imgWidth={250} imgHeight={230} user={u} />
            ))}
          </div>
        </>
      ) : (
        <p>No results</p>
      )}
      {pagination.totalPage > 1 && <Pagination handlePageChange={getPage} formValues={formValues} {...pagination} />}
    </div>
  );
}
