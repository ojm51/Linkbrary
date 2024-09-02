export const getFromStorage = <T = any>(name: string) => {
  if (typeof window === 'undefined') return;
  const strItem = localStorage.getItem(name);
  if (strItem) {
    return JSON.parse(strItem) as T;
  }
};

export const setToStorage = <T = any>(name: string, item: T) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(name, JSON.stringify(item));
};

export const clearStorageItem = (name: string) => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(name);
};
