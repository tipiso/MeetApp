import Tabs, { Tab, useTabs } from '@/components/Tabs';
import { Hobby } from '../../types';
import CustomInformations from './CustomInformations';

enum ProfilePageTabsKeys {
  CUSTOMER_INFO = 'customerInfo',
  PHOTOS = 'photos',
  CHAT = 'chat',
}

type Props = {
  active: Tab;
  hobbies?: Hobby[];
  introduction?: string;
};

export default function ProfileTabs({ active, hobbies, introduction }: Props) {
  switch (active.key) {
    case ProfilePageTabsKeys.CUSTOMER_INFO:
      return <CustomInformations hobbies={hobbies} introduction={introduction} />;
    case ProfilePageTabsKeys.CHAT:
      return <div>Chat</div>;
    case ProfilePageTabsKeys.PHOTOS:
      return <div>Photos</div>;
    default:
      return <div>No Tab Found</div>;
  }
}
