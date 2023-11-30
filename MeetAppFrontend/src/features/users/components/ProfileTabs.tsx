import Tabs, { Tab, useTabs } from '@/components/Tabs';

enum ProfilePageTabsKeys {
  CUSTOMER_INFO = 'customerInfo',
  PHOTOS = 'photos',
  CHAT = 'chat',
}

type Props = {
  active: Tab;
}

export default function ProfileTabs({active}:Props) {
  switch (active.key) {
    case ProfilePageTabsKeys.CUSTOMER_INFO:
      return <div>Customer Info</div>
    case ProfilePageTabsKeys.CHAT:
      return <div>Chat</div>
    case ProfilePageTabsKeys.PHOTOS:
      return <div>Photos</div>
    default:
      return;
  }
}
