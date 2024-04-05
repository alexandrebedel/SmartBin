import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  let expoConfig: Partial<ExpoConfig> = {};

  switch (process.env.NODE_ENV) {
    case "production": {
      expoConfig = {
        ...config,
        extra: {
          env: "production",
          production: true,
          apiUrl: undefined,
        },
      };
      break;
    }
    case "development": {
      expoConfig = {
        ...config,
        extra: {
          env: "development",
          production: false,
          apiUrl: "http://10.68.247.12:3000/api",
        },
      };
      break;
    }
  }
  return expoConfig as ExpoConfig;
};
