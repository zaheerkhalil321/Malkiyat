import EventSource, { EventSourceListener } from "react-native-sse";
import Toast from "react-native-simple-toast";
import EventEmitter from "@src/events/EventEmitter";
import { Events } from "@src/events/Events";
import { BASE_URL } from "@env";
import { store } from "@src/redux";
export default function _handleSSE() {
  if (store.getState()?.registerUser?.registerUserData?.userInfo?.userId) {
    const es = new EventSource(
      `${BASE_URL}sse/subscribe/${
        store.getState()?.registerUser?.registerUserData?.userInfo?.userId
      }`,
      {
        headers: {
          Authorization: {
            toString: function () {
              return (
                "Bearer " + store.getState()?.registerUser?.token?.accessToken
              );
            },
          },
        },
      }
    );

    const listener: EventSourceListener = (event) => {
      if (event.type === "open") {
        Toast.show("Open SSE connection.", Toast.SHORT);
      } else if (event.type === "message") {
        console.log(event.data, "data");

        EventEmitter.emit(Events.ReceivedMessage, event.data);
        EventEmitter.off(Events.ReceivedMessage, () => {});
      } else if (event.type === "error") {
        console.warn("Connection error:", event.type, event);
      } else if (event.type === "exception") {
        console.warn("Error:", event.type, event);
      } else if (event.type == "close") {
        console.warn("Close:", event.type, event);
      } else if (event.type == "timeout") {
        console.warn("timeout", event.type, event);
      }
    };
    es.addEventListener("open", listener);
    es.addEventListener("message", listener);
    es.addEventListener("error", listener);
    es.addEventListener("close", listener);
  }
}
