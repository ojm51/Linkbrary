import { Context, useContext } from "react";

export const useCustomContext = <T,>(context: Context<T | undefined>) => {
  const CustomContext = useContext(context);
  if (!CustomContext) {
    throw new Error('ContextSelector는 프로바이더 내부에서 사용되어야 합니다.');
  }
  return CustomContext;
};
