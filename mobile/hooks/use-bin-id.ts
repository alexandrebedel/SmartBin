import { useEffect, useState } from "react";
import { getBinId } from "../utils";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

/**
 * Returns the binId either from the storage
 * or the deep link URL
 */
export const useBinId = () => {
  const [link, setLink] = useState<string | undefined>(undefined);
  const { getItem, setItem } = useAsyncStorage("@bin-id");

  useEffect(() => {
    (async () => {
      const item = await getItem();

      if (!item) {
        console.log("Trying to get bin id from deep link");
        setLink(await getBinId());
        if (link) setItem(link);
      } else {
        console.log("Using the bin id from the storage");
        setLink(item);
      }
    })();
  }, []);

  return link;
};
