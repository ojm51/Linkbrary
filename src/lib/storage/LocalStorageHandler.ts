export const getFromStorage = <T>(name: string) => {
  let result;
  if (typeof window !== 'undefined') {
    const strItem = localStorage.getItem(name);
    if (strItem) {
      result = JSON.parse(strItem) as T;
    }
  }
  return result;
};

export const setToStorage = <T>(name: string, item: T) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(name, JSON.stringify(item));
};

export const clearStorageItem = (name: string) => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(name);
};
