import { Tab } from '@/components/Tabs';
import { Hobby, Photo } from '../../types';
import CustomInformations from './CustomInformations';
import Photos from './Photos';
import { ProfilePageTabsKeys } from '@/utils/constants';
import Chat from './Chat';

type Props = {
  active: Tab;
  hobbies?: Hobby[];
  introduction?: string;
  photos?: Photo[];
};

export default function ProfileTabs({ active, hobbies, introduction, photos }: Props) {
  switch (active.key) {
    case ProfilePageTabsKeys.CUSTOMER_INFO:
      return <CustomInformations hobbies={hobbies} introduction={introduction} />;
    case ProfilePageTabsKeys.CHAT:
      return <Chat />;
    case ProfilePageTabsKeys.PHOTOS:
      return <Photos photos={photos} />;
    default:
      return 'Default';
  }
}
