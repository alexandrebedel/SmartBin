import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

/**
 * Returns the parsed bin id from the
 * deep link url
 */
export const useBinId = () => {
  const [link, setLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const link = (await Linking.getInitialURL())?.split("/--/")[1];

      if (!link) {
        return;
      }
      setLink(link);
    })();
  }, []);

  return link;
};
