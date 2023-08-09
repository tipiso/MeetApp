import { ReactElement } from 'react';
import useUserPage from '@/features/users/hooks/useUserPage';
import UserPageLayout from '@/components/Layouts/UserPageLayout';
import UserForm from '@/features/users/components/UserForm';
import PhotoForm from '@/features/users/components/PhotoForm';

const UserPage = () => {
  const { isLoading, user } = useUserPage();

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-4xl font-bold">Tell us about you!</h1>

      <PhotoForm photo={user.photoUrl} userName={user.userName} />
      <UserForm age={user.age} gender={user.gender} knownAs={user.knownAs} interests={user.interests} />
    </div>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <UserPageLayout>{page}</UserPageLayout>;
};

UserPage.secured = true;
export default UserPage;
