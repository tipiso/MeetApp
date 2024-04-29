import { PaginationHeaders } from '@/components/Pagination/types';
import { User } from '../../types';
import FriendCard from '@/features/search/components/FriendCard';
import { ColorTypeEnum } from '@/utils/constants';
import Button from '@/components/Button';

type Props = {
  usersList: User[];
  pagination: PaginationHeaders;
  updateUsers: () => Promise<void>;
};

export default function UsersList({ usersList, pagination, updateUsers }: Props) {
  if (!usersList || !usersList.length) {
    return (
      <div className="flex justify-center p-10 text-2xl font-light">
        <p className="max-w-sm text-center">No friends added yet.</p>
      </div>
    );
  }
  return (
    <>
      <div className="relative grid grid-cols-4 gap-x-6 gap-y-3 xl:grid-cols-6">
        {usersList.map((u) => (
          <FriendCard key={u.id} user={u} imgWidth={250} imgHeight={250} />
        ))}
      </div>
      {pagination.currentPage < pagination.totalPage && (
        <div className="pt-6 text-right">
          <Button outline type="button" btnType={ColorTypeEnum.PRIMARY} onClick={updateUsers}>
            Check more
          </Button>
        </div>
      )}
    </>
  );
}
