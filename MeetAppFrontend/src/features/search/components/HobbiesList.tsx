import { Hobby } from '@/features/users/types';
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Badge, { BadgeSizes, defaultBadgeClassColors } from '@/components/Badge';

/** This is explicitly a regular variable, since it's important only on the first render, doesnt have to be stable. */
let idx = 0;
const colorsLength = defaultBadgeClassColors.length;

const HobbyListItem = ({
  hobby,
  parentWidth,
  takenPlace,
  hiddenTags,
  setTakenPlace,
  setHiddenTags,
}: {
  hobby: Hobby;
  setHiddenTags: (takenPlane: number) => void;
  setTakenPlace: Dispatch<SetStateAction<number>>;
  parentWidth: number;
  takenPlace: number;
  hiddenTags: number;
}) => {
  const listItemRef = useRef<HTMLSpanElement | null>(null);
  const [listItemWidth, setListItemWidth] = useState<number>(0);

  const currIndex = idx;
  if (idx === colorsLength - 1) {
    idx = 0;
  } else {
    idx++;
  }

  useEffect(() => {
    if (listItemRef.current && !!parentWidth) {
      setListItemWidth(listItemRef.current.clientWidth);
    }
  }, [parentWidth]);

  useEffect(() => {
    let newItemsLength = takenPlace + listItemWidth;
    if (parentWidth && newItemsLength <= parentWidth) {
      console.log('newItemsLength', listItemWidth, takenPlace);
      setTakenPlace((prevWidth) => {
        console.log('prevWidth', prevWidth);
        return newItemsLength;
      });
    }
  }, [listItemWidth, parentWidth]);
  console.log('takenPlace child', takenPlace);
  return (
    <Badge
      ref={listItemRef}
      className="mr-0.5"
      key={hobby.id}
      size={BadgeSizes.MD}
      color={defaultBadgeClassColors[currIndex]}
    >
      {hobby.name}
    </Badge>
  );
};

const HobbiesList = ({ hobbies }: { hobbies: Hobby[] }) => {
  const [takenPlace, setTakenPlace] = useState<number>(0);
  const [hiddenTags, setHiddenTags] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const listRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!!listRef.current) {
      setParentWidth(listRef.current.clientWidth);
    }
  }, [hobbies.length]);
  console.log('takenPlace', takenPlace);
  return (
    <div className="min-h-[1px] min-w-full" ref={listRef}>
      {parentWidth &&
        hobbies.map((h) => (
          <HobbyListItem
            hobby={h}
            hiddenTags={hiddenTags}
            parentWidth={parentWidth}
            takenPlace={takenPlace}
            setTakenPlace={setTakenPlace}
            setHiddenTags={setHiddenTags}
          />
        ))}
    </div>
  );
};

export default HobbiesList;
