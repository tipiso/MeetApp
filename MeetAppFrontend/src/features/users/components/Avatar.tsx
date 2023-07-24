import Button from '@/components/Button';

type Props = {
  imgUrl?: string;
  name: string;
};

const Avatar = ({ imgUrl, name }: Props) => {
  return (
    <div className="avatar">
      {imgUrl ? (
        <div className="w-32 rounded-full">
          <img src={imgUrl} alt={`Avatar img for user ${name}`} />
        </div>
      ) : (
        <div className="placeholder avatar">
          <div className="w-32 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-3xl">{name.substring(0, 1).toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
