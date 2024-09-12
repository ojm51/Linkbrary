export const DropBoxOption = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  return (
    <li>
      <button className="p-4 hover:bg-secondary-10" onClick={onClick}>
        {value}
      </button>
    </li>
  );
};
