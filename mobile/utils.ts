import * as Linking from "expo-linking";

type FetcherArgs = [input: RequestInfo, init?: RequestInit];

/**
 * Gets the bin id from the deep link URL
 */
export const getBinId = async () =>
  (await Linking.getInitialURL())?.split("/--/")[1];

export const fetcher = (...args: FetcherArgs) =>
  fetch(...args).then((res) => res.json());
