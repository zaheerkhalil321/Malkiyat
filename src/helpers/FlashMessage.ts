import { showMessage } from "react-native-flash-message";
export type MessageType =
  | "none"
  | "default"
  | "info"
  | "success"
  | "danger"
  | "warning";

export interface Message {
  message: string;
  description?: string;
  type?: MessageType;
  backgroundColor?: string;
  color?: string;
  duration?: number;
  animationDuration?: number;
}
/**
 * @param  {} {message
 * @param  {} description
 * @param  {} type
 * @param  {} backgroundColor
 * @param  {} color
 * @param  {} duration
 * @param  {} animationDuration
 * @param  {Message} }
 */
const FlashMessage = ({
  message,
  description,
  type,
  backgroundColor,
  color,
  duration,
  animationDuration,
}: Message) => {
  showMessage({
    message: message,
    description: description,
    type: type,
    backgroundColor: backgroundColor,
    color: color,
    duration: duration,
    animationDuration: animationDuration,
  });
};

export { FlashMessage };
