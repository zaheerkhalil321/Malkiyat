import { useEffect, useState } from "react";
import DeviceInfo, {
  getDeviceId,
  getDeviceName,
  getDeviceToken,
} from "react-native-device-info";

type returnType = { deviceToken: string; deviceName: string; deviceId: string };

export default (): returnType => {
  const [deviceInfo, setDeviceInfo] = useState<{
    deviceToken: string;
    deviceName: string;
    deviceId: string;
  }>({
    deviceToken: "",
    deviceName: "",
    deviceId: "",
  });

  useEffect(() => {
    (async () => {
      if (!(await DeviceInfo.isEmulator())) {
        const [deviceId, deviceName, deviceToken] = await Promise.all([
          getDeviceId(),
          getDeviceName(),
          getDeviceToken(),
        ]);
        setDeviceInfo({
          deviceToken,
          deviceName,
          deviceId,
        });
      } else {
        console.log("Real Device not found");
      }
    })();
  }, [setDeviceInfo]);
  return deviceInfo;
};
