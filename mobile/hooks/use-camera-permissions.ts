import { Camera, PermissionStatus } from "expo-camera/next";
import { useEffect, useState } from "react";

export const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getCameraPermissions();
  }, []);

  return hasPermission;
};
