import { MMKV } from 'react-native-mmkv';

/**
 * Main class to create MMKV-backed key value stores.
 * Each store is identified by a unique id string.
 */
export class MMKVStore {
  private storage: MMKV;

  constructor(id: string) {
    this.storage = new MMKV({ id });
  }

  /*
   * Store any serializable value
   */
  setItem<T = unknown>(key: string, value: T): void {
    try {
      this.storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to setItem(${key}):`, error);
    }
  }

  /*
   * Retrieve a value or null if missing/parse fails
   */
  getItem<T = unknown>(key: string): T | null {
    try {
      const raw = this.storage.getString(key);
      if (raw == null) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      console.warn(`Failed to getItem(${key}):`, error);
      return null;
    }
  }

  /** Remove a single key */
  removeItem(key: string): void {
    try {
      this.storage.delete(key);
    } catch (error) {
      console.warn(`Failed to removeItem(${key}):`, error);
    }
  }

  /** Clear all data in this store */
  clearAll(): void {
    try {
      this.storage.clearAll();
    } catch (error) {
      console.warn('Failed to clearAll:', error);
    }
  }
}

/*
 * Global store instance - for app-wide data
 */
export const globalStore = new MMKVStore('global');

export const userStore = new MMKVStore('user');

/* The below code is commented for now - this will be utilized later to add multiple-account support */

// /**
//  * Map of logged in users to their MMKVStore instances
//  */
// const userStoresMap = new Map<string, MMKVStore>();

// /**
//  * Returns all users in global store
//  */
// export function getAllUsers(): IUser[] {
//   return globalStore?.getItem<IUser[]>('users') ?? [];
// }

// /**
//  * Check if a user exists i.e. is logged in
//  */
// export function ifUserExists(userId: string): boolean {
//   return getAllUsers()?.some(u => u?.id === userId);
// }

// /**
//  * Returns (or creates) a per-user store instance.
//  */
// export function getUserStore(userId: string): MMKVStore | null {
//   let store = userStoresMap?.get(userId);
//   if (!store) {
//     // Create a new instance if the user exists but the storage is not found
//     if (ifUserExists(userId)) {
//       store = new MMKVStore(userId);
//       userStoresMap?.set(userId, store);
//     } else {
//       return null;
//     }
//   }
//   return store;
// }

// /**
//  * Initialize the user stores map from the global store.
//  */
// export function initializeUserStoresMap(): void {
//   const users = getAllUsers();
//   if (!users || users.length === 0) {
//     userStoresMap?.clear();
//     globalStore?.setItem('isNoUserLoggedIn', true);
//     return;
//   }
//   users?.forEach(user => getUserStore(user.id));
// }

// /**
//  * Add a user to the global list and create their store.
//  * Returns:
//  *  - true if succeeded
//  *  - null if user already exists
//  *  - false on error
//  */
// export function addUser(user: IUser): boolean | null {
//   try {
//     const users = getAllUsers();
//     if (users?.find(u => u?.id === user?.id)) return null; // already exists

//     users.push(user);
//     globalStore.setItem('users', users);

//     // create the per-user store
//     getUserStore(user.id);

//     if(users.length === 1) {
//       globalStore.setItem('activeUserId', user.id);
//       globalStore.setItem('isNoUserLoggedIn', false);
//     }
//     return true;
//   } catch (error) {
//     console.warn('Failed to addUser:', error);
//     return false;
//   }
// }

// /**
//  * Remove a user from global list and delete their store.
//  * Returns:
//  *  - true if succeeded
//  *  - null if user does not exist
//  *  - false on error
//  */
// export function removeUser(userId: string): boolean | null {
//   try {
//     const users = getAllUsers();
//     if (!users.find(u => u.id === userId)) return null; // user not found

//     const newUsers = users?.filter(u => u.id !== userId);
//     globalStore.setItem('users', newUsers);

//     if(newUsers.length === 0) {
//       globalStore.removeItem('activeUserId');
//       globalStore.setItem('isNoUserLoggedIn', true);
//     } else if(newUsers.length === 1) {
//       globalStore.setItem('activeUserId', newUsers[0].id);
//     }

//     // remove per-user store
//     const store = userStoresMap?.get(userId);
//     if (store) {
//       store.clearAll();
//       userStoresMap.delete(userId);
//     }
//     if (globalStore.getItem<string>('activeUserId') === userId) {
//       globalStore.removeItem('activeUserId');
//     }

//     return true;
//   } catch (error) {
//     console.warn('Failed to removeUser:', error);
//     return false;
//   }
// }

// /**
//  * Set the active user, and return their store - for use in the storage context.
//  */
// export function switchActiveUser(userId: string): MMKVStore | null {
//   const store = getUserStore(userId);
//   if (!store) return null;
//   globalStore.setItem('activeUserId', userId);
//   return store;
// }

// /**
//  * Get the active user, and their store
//  */
// export function getActiveUser(): {
//   userInfo: IUser | null;
//   userStore: MMKVStore | null;
// } {
//   const activeUserId = globalStore.getItem<string>('activeUserId');
//   if (!activeUserId) return { userInfo: null, userStore: null };
//   const users = getAllUsers();
//   return {
//     userInfo: users.find(u => u.id === activeUserId) ?? {
//       id: activeUserId,
//       name: 'Unknown',
//     },
//     userStore: getUserStore(activeUserId),
//   };
// }
