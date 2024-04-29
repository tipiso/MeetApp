import Loader, { LoaderSizes } from '@/components/Loader';
import { useLikedUsersWithPagination } from '@/features/users/hooks';
import { useEffect, useState } from 'react';
import { Hobby, User } from '../../types';
import HobbiesList from '@/features/search/components/HobbiesList';
import UsersList from './UsersList';

type Props = {
  hobbies?: Hobby[];
  introduction?: string;
  userId?: number;
};

export default function CustomInformations({ hobbies, introduction, userId }: Props) {
  const [usersList, setUsersList] = useState<User[]>([]);
  const { isMutating, getPage, pagination } = useLikedUsersWithPagination(userId);

  const getUsers = async () => {
    if (userId) {
      const users = await getPage({ pageNumber: 1, pageSize: 6, userId, predicate: 'friends' });
      setUsersList(users ? users.data : []);
    }
  };

  const updateUsers = async () => {
    if (userId) {
      const users = await getPage({
        pageNumber: pagination.currentPage + 1,
        pageSize: 6,
        userId,
        predicate: 'friends',
      });
      setUsersList(users ? [...usersList, ...users.data] : []);
    }
  };

  useEffect(() => {
    getUsers();
  }, [userId]);

  if (isMutating) return <Loader size={LoaderSizes.lg} />;

  return (
    <>
      <section className="pt-10">
        <h2 className="mb-3 text-2xl font-bold">Hobby</h2>
        <HobbiesList hobbies={hobbies ?? []} />
      </section>
      <section className="pt-10">
        <h2 className="mb-3 text-2xl font-bold">More information</h2>
        <p>{introduction ?? ''}</p>
      </section>
      <section className="pt-10">
        <h2 className="mb-3 text-2xl font-bold">Friends ({pagination.totalItems ? pagination.totalItems : 0})</h2>
        <UsersList usersList={usersList} pagination={pagination} updateUsers={updateUsers} />
      </section>
    </>
  );
}
