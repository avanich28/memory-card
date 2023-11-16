import { createContext, useContext } from "react";
import useLocaleStorageState from "../hooks/useLocaleStorageState";

const SettingContext = createContext();

const initialState = {
  music: true,
  sound: true,
};

function SettingProvider({ children }) {
  const [setting, setSetting] = useLocaleStorageState(initialState, "setting");

  return (
    <SettingContext.Provider value={{ setting, onSetting: setSetting }}>
      {children}
    </SettingContext.Provider>
  );
}

function useSetting() {
  const context = useContext(SettingContext);
  if (context === undefined)
    throw new Error("SettingContext is used outside the SettingProvider.");
  return context;
}

export { SettingProvider, useSetting };
