import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { getBinId } from "../utils";

type AppContext = {
  binId: string | undefined;
  setBinId: Dispatch<SetStateAction<string | undefined>>;
  registerId: (id: string) => Promise<void>;
  removeId: () => Promise<void>;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [binId, setBinId] = useState<string | undefined>(undefined);
  const { getItem, setItem, removeItem } = useAsyncStorage("@bin-id");

  const registerId = async (id: string) => {
    console.log(`Registering provided id: ${id}`);
    await setItem(id);
    setBinId(id);
  };

  const removeId = async () => {
    console.log(`Removing known id`);
    await removeItem();
    setBinId(undefined);
  };

  useEffect(() => {
    (async () => {
      const item = await getItem();

      if (!item) {
        console.log("Trying to get bin id from deep link");
        setBinId(await getBinId());
        if (binId) await setItem(binId);
      } else {
        console.log("Using the bin id from the storage");
        setBinId(item);
      }
    })();
  }, []);

  return (
    <AppContext.Provider value={{ binId, setBinId, registerId, removeId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a BinIdProvider");
  }
  return context;
};
