import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState
} from 'react';
import I18N from '../../i18n/interface';
import { default as locale_en } from '../../i18n/en';

interface IAppDispatch {
  changeLocaleData: (key: string) => void;
}

interface IContextProps {
  localeData: I18N;
}

export const StateContext = createContext<IContextProps | undefined>(undefined);

export const DispatchContext = createContext<IAppDispatch | undefined>(
  undefined
);

interface IProviderProps {
  languageKey: string;
  children: ReactNode;
}

export const I18nProvider: FC<IProviderProps> = ({ languageKey, children }) => {
  const [localeData, setLocaleData] = useState<I18N>(locale_en);

  useEffect(() => {
    changeLocaleData(languageKey);
  }, [languageKey]);

  const changeLocaleData = (key: string) => {
    setTimeout(async () => {
      const { default: locale_es } = await import(`../../i18n/${key}`);
      setLocaleData(locale_es);
    }, 0);

    if (key === 'en') {
      setTimeout(() => {
        setLocaleData(locale_en);
      }, 0);
    }
  };

  const contextDispatchValue = {
    changeLocaleData
  };

  const contextValue = {
    localeData
  };

  return (
    <DispatchContext.Provider value={contextDispatchValue}>
      <StateContext.Provider value={contextValue}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useI18nState = (): IContextProps => {
  const context = React.useContext(StateContext);

  if (!context) {
    throw new Error('use18nState must be used within an AppProvider');
  }

  return context;
};

export const useI18nDispatch = (): IAppDispatch => {
  const context = React.useContext(DispatchContext);

  if (!context) {
    throw new Error('use18nState must be used within an AppProvider');
  }

  return context;
};
