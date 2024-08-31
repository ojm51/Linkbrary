import { useState } from 'react';

import IcVisible from '@/assets/icons/visible/ic_eye_on.svg';
import IcInVisible from '@/assets/icons/invisible/ic_eye_off.svg';

export const usePasswordVisuality = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleIcon, setVisibleIcon] = useState<string>(IcVisible);

  const handleVisible = () => {
    setVisible((prev) => !prev);
    setVisibleIcon((prev) => (prev === IcInVisible ? IcVisible : IcInVisible));
  };

  return { visible, visibleIcon, handleVisible };
};
