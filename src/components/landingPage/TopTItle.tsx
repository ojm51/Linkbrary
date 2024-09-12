type TopTitleProps = {
  children: string;
};

export const TopTitle = ({ children }: TopTitleProps) => {
  return (
    <section className="bg-bg h-[5.5rem] pt-[0.625rem] text-center mb-5 md:mb-[6.25rem] md:h-32 md:pt-5">
      <h2 className="text-[2rem] font-bold md:text-[2.5rem]">{children}</h2>
    </section>
  );
};
