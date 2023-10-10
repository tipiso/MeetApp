type Props = {
  name: string;
};

export default function UserNameText({ name }: Props) {
  return <span className="text-lg font-bold text-white">{name}</span>;
}
