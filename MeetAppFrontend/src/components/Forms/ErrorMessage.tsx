type Props = {
  msg: string;
};
export default function ErrorMessage({ msg }: Props) {
  return <span className="text-xs text-red">{msg}</span>;
}
