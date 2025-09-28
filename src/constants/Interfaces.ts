import { MMKVStore } from '../store/mmkvStore';

export interface IObject {
  [key: string]: string;
}

/** Basic user info stored in global store */
// export interface IUser {
//   id: string;
//   name: string;
// }

/**
 * Context value for storage (MMKV) access
 */
export interface IStorageContextValue {
  globalStore: MMKVStore;
  userStore: MMKVStore;
}

/**
 * Theme types
 */
export type themeType = 'light' | 'dark' | 'system';

/**
 * Context value for theme access
 */
export interface IThemeContextValue {
  theme: themeType;
  setTheme: React.Dispatch<React.SetStateAction<themeType>>;
}
