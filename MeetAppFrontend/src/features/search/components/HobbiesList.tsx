import { Hobby } from '@/features/users/types';
import { Dispatch, SetStateAction, useCallback, useLayoutEffect, useRef, useState } from 'react';
import Badge, { BadgeSizes, defaultBadgeClassColors } from '@/components/Badge';

/** This is explicitly a regular variable, since it's important only on the first render, doesnt have to be stable. */
let idx = 0;
const colorsLength = defaultBadgeClassColors.length;
const HobbyListItem = ({
  hobby,
  parentWidth,
  takenPlace,
  setTakenPlace,
  hobbiesLength,
}: {
  hobby: Hobby;
  setTakenPlace: Dispatch<SetStateAction<{ id: number; width: number }[]>>;
  parentWidth: number;
  takenPlace: { id: number; width: number }[];
  hobbiesLength: number;
}) => {
  const currIndex = idx;
  if (idx === colorsLength - 1) {
    idx = 0;
  } else {
    idx++;
  }

  const refCb = useCallback(
    (node: HTMLSpanElement | null) => {
      if (node && !!parentWidth && takenPlace.length < hobbiesLength) {
        setTakenPlace((prevArr) => [...prevArr, { id: hobby.id, width: node.clientWidth }]);
      }
    },
    [parentWidth, hobbiesLength],
  );

  return (
    <Badge
      ref={refCb}
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
  const [takenPlace, setTakenPlace] = useState<{ id: number; width: number }[]>([]);
  const [hiddenTags, setHiddenTags] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState<number>(0);

  const listRef = useRef<HTMLDivElement | null>(null);
  const widthSum = takenPlace.length ? takenPlace.reduce((prev, curr) => prev + curr.width, 0) : 0;

  useLayoutEffect(() => {
    if (!!listRef.current && !parentWidth) {
      setParentWidth(listRef.current.clientWidth);
    }
  }, [hobbies.length]);
  console.log('widthSum', widthSum);

  if (widthSum > parentWidth) {
    let tmpWidth = 0;
    let i = 0;
    for (i; i < takenPlace.length; i++) {
      if (tmpWidth + takenPlace[i].width <= parentWidth) {
        tmpWidth += takenPlace[i].width;
      } else break;
    }
    return (
      <div className="min-h-[1px] min-w-full" ref={listRef}>
        {hobbies.slice(0, i).map((h) => (
          <HobbyListItem
            key={h.id}
            hobby={h}
            parentWidth={parentWidth}
            takenPlace={takenPlace}
            setTakenPlace={setTakenPlace}
            hobbiesLength={hobbies.length}
          />
        ))}
        <Badge size={BadgeSizes.LG} color="badge-neutral">
          +{hobbies.length - i}
        </Badge>
      </div>
    );
  }

  return (
    <div className="min-h-[1px] min-w-full" ref={listRef}>
      {hobbies.map((h) => (
        <HobbyListItem
          key={h.id}
          hobby={h}
          parentWidth={parentWidth}
          takenPlace={takenPlace}
          setTakenPlace={setTakenPlace}
          hobbiesLength={hobbies.length}
        />
      ))}
    </div>
  );
};

export default HobbiesList;
