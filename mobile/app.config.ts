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
          apiUrl: "http://172.20.10.2:3000/api",
        },
      };
      break;
    }
  }
  return expoConfig as ExpoConfig;
};
