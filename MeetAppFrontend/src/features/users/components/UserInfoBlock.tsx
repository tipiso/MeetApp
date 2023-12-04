type Props = {
  label: string;
  content: string;
};

export default function UserInfoBlock({ label, content }: Props) {
  return (
    <div className="pb-3">
      <p className="font-bold">{label}</p>
      <p>{content}</p>
    </div>
  );
}
