import BackgroundTimer from "react-native-background-timer";

class CustomBackgroundTimer {
  static backgroundTimer = null;
  static clearTimeout = () => {
    if (this.backgroundTimer) {
      BackgroundTimer.clearTimeout(this.backgroundTimer);
    }
    BackgroundTimer.stop();
  };
  static setTimeout = (fn, timeout) => {
    BackgroundTimer.start();
    this.backgroundTimer = BackgroundTimer.setTimeout(fn, timeout);
  };
}
export default CustomBackgroundTimer;
