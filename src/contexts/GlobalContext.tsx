import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import { globalStore, userStore } from '../store/mmkvStore';
import {
  IStorageContextValue,
  IThemeContextValue,
  themeType,
} from '../constants/Interfaces';

const StorageContext = React.createContext<IStorageContextValue>(
  {} as IStorageContextValue,
);
const ThemeContext = React.createContext<IThemeContextValue>(
  {} as IThemeContextValue,
);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();

  // Read persisted theme (fallback to "system")
  const [theme, setTheme] = React.useState<themeType>(
    (globalStore.getItem('theme') as themeType) ?? 'system',
  );

  useEffect(() => {
    globalStore.setItem('theme', theme);
  }, [theme]);

  const paperTheme = React.useMemo(
    () =>
      theme === 'system'
        ? systemScheme !== 'dark'
          ? MD3DarkTheme
          : MD3LightTheme
        : theme === 'dark'
          ? MD3DarkTheme
          : MD3LightTheme,
    [theme, systemScheme],
  );

  return (
    <StorageContext.Provider value={{ globalStore, userStore }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PaperProvider theme={paperTheme}>{children}</PaperProvider>
      </ThemeContext.Provider>
    </StorageContext.Provider>
  );
}

export { GlobalProvider, StorageContext, ThemeContext };
