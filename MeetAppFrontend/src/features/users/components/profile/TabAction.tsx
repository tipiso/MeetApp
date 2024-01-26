import Button from '@/components/Button';
import { Tab } from '@/components/Tabs';
import { ColorTypeEnum, ProfilePageTabsKeys } from '@/utils/constants';
import PhotoForm from './PhotoForm';

type Props = {
  active: Tab;
  displayInviteBtn: boolean;
};

export default function TabAction({ active, displayInviteBtn }: Props) {
  if (displayInviteBtn) return <Button btnType={ColorTypeEnum.PRIMARY}>Invite to friends</Button>;

  /** Current user profile setup */
  if (active.key === ProfilePageTabsKeys.PHOTOS) {
    return <PhotoForm />;
  }

  return null;
}
