interface FolderProps {
  folderName: string;
}

const Folder = ({ folderName }: FolderProps) => {
  return (
    <button className="px-3 py-2 border border-solid border-primary rounded-[5px] font-normal text-base hover:bg-[#e7effb]">
      {folderName}
    </button>
  );
};

export default Folder;
