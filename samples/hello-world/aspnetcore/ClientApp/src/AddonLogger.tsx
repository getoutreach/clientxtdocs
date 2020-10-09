import eventStore, { Sender } from "./stores/EventStore";
import addonSdk, { LogLevel, ILogger, Event } from "@outreach/client-addon-sdk";
import { getLevel } from "./index";
export class AddonLogger implements ILogger {
  public level: LogLevel = LogLevel.Trace;
  public log = (e: Event) => {
    if (e.level <= addonSdk.logger.level) {
      // message is with to low level priority - ignore.
      return;
    }
    console.debug("[HelloWorld]::addonSdk.onInfo", e);
    eventStore.addEvent({
      timestamp: new Date(),
      sender: Sender.Addon,
      message: e.message || "",
      type: getLevel(e.level),
      context: e.context,
    });
  };
}
