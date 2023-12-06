import Button from '@/components/Button';
import { Tab } from '@/components/Tabs';
import { ColorTypeEnum, ProfilePageTabsKeys } from '@/utils/constants';

type Props = {
  active: Tab;
  isCurrentUserProfile: boolean;
};

export default function TabAction({ active, isCurrentUserProfile }: Props) {
  if (!isCurrentUserProfile) return <Button btnType={ColorTypeEnum.PRIMARY}>Invite to friends</Button>;

  /** Current user profile setup */
  if (active.key === ProfilePageTabsKeys.PHOTOS) return <Button btnType={ColorTypeEnum.PRIMARY}>Add photo</Button>;
}
