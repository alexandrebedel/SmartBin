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
          apiUrl: "https://smart-bin-jade.vercel.app/api",
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
          apiUrl: "https://smart-bin-jade.vercel.app/api",
        },
      };
      break;
    }
  }
  return expoConfig as ExpoConfig;
};
