import * as Linking from "expo-linking";

/**
 * Gets the bin id from the deep link URL
 */
export const getBinId = async () =>
  (await Linking.getInitialURL())?.split("/--/")[1];
