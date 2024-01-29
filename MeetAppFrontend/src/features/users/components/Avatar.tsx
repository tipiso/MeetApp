import Image from 'next/image';

type Props = {
  imgUrl?: string;
  name: string;
  width?: number;
  minWidth?: number;
  height?: number;
};

const Avatar = ({ imgUrl, name, width = 128, height = 128, minWidth }: Props) => {
  return (
    <div className="avatar">
      {imgUrl ? (
        <div className="rounded-full">
          <Image
            src={imgUrl}
            alt={`Avatar img for user ${name}`}
            style={{ maxWidth: `${width}px`, maxHeight: `${height}px`, minWidth: minWidth ?? 'auto' }}
            width={width}
            height={height}
          />
        </div>
      ) : (
        <div className="placeholder avatar">
          <div className="rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-3xl">{name.substring(0, 1).toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
