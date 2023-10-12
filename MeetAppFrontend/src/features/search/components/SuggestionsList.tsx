import Loader, { LoaderSizes } from '@/components/Loader';
import Carousel from '@/components/Carousel/Carousel';
import Button from '@/components/Button';
import { ColorTypeEnum } from '@/utils/constants';
import { Hobby, User } from '@/features/users/types';
import UserCard from '@/features/search/components/UserCard';
import UserNameText from '@/features/users/components/UserNameText';
import Badge, { BadgeSizes, defaultBadgeClassColors } from '@/components/Badge';
import { useRef, useState } from 'react';

type Props = {
  data?: User[];
  isLoading: boolean;
};

const HobbiesList = ({ hobbies }: { hobbies: Hobby[] }) => {
  /** This is explicitly a regular variable, since it's important only on the first render */
  const [takenPlace, setTakenPlace] = useState<number>(0);
  const [displayAnotherTag, setDisplayAnotherTag] = useState(true);

  let idx = 0;
  const colorsLength = defaultBadgeClassColors.length;
  const listRef = useRef<HTMLDivElement>();

  return (
    <div
      ref={(node) => {
        if (node) listRef.current = node;
      }}
    >
      {hobbies.map((h) => {
        const currIndex = idx;

        if (idx === colorsLength - 1) {
          idx = 0;
        } else {
          idx++;
        }
        console.log(takenPlace);
        return (
          <Badge
            ref={(node) => {
              console.log(node, listRef.current?.clientWidth, 'REF');
              if (node) {
                // @ts-ignore
                if (node.clientWidth + takenPlace <= listRef.current?.clientWidth) {
                  setTakenPlace(takenPlace + node.clientWidth);
                }
              }
            }}
            className="mr-0.5"
            key={h.id}
            size={BadgeSizes.MD}
            color={defaultBadgeClassColors[currIndex]}
          >
            {h.name}
          </Badge>
        );
      })}
    </div>
  );
};

export default function SuggestionsList({ data, isLoading }: Props) {
  if (isLoading) return <Loader size={LoaderSizes.lg} />;
  if (!data) return <div>We have no suggestions for you yet.</div>;

  const prepareInfoString = (user: User) => {
    const genderFirstLetter = user.gender.slice(0, 1).toUpperCase();
    return `${genderFirstLetter + user.gender.slice(1)}, ${user.age}yo, ${user.city}`;
  };

  return (
    <>
      <h1 className="mb-4 px-10 text-2xl font-bold">Catch some suggestions from around Ortar!</h1>
      <Carousel carouselData={data}>
        {data?.map((u) => {
          return (
            <UserCard
              key={u.id}
              className="px-4"
              imgWidth={250}
              imgHeight={230}
              user={u}
              imgAction={
                <Button btnType={ColorTypeEnum.PRIMARY} className="mt-auto w-full rounded-t-none">
                  Invite to friends
                </Button>
              }
              userInfo={
                <>
                  <UserNameText name={u.knownAs} />
                  {u.hobbys.length ? <HobbiesList hobbies={u.hobbys} /> : null}
                  <span className="text-base text-white">{prepareInfoString(u)}</span>
                </>
              }
            />
          );
        })}
      </Carousel>
    </>
  );
}
