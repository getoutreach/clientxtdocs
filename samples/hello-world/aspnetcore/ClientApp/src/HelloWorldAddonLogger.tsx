import eventStore from './stores/EventStore';
import addonSdk, { LogLevel, ILogger, Event } from '@outreach/client-addon-sdk';

export const getLevel = (level: LogLevel) => {
  switch (level) {
    case LogLevel.Trace:
      return 'Trace';
    case LogLevel.Debug:
      return 'Debug';
    case LogLevel.Info:
      return 'Info';
    case LogLevel.Warning:
      return 'Warning';
    case LogLevel.Error:
      return 'Error';
    default:
      return level.toString();
  }
};
export class HelloWorldAddonLogger implements ILogger {
  public level: LogLevel = LogLevel.Trace;
  public log = (e: Event) => {
    console.log("[HelloWorldAddonLogger]::log", e);
    if (e.level <= addonSdk.logger.level) {
      // message is with to low level priority - ignore.
      return;
    }
    eventStore.addEvent({
      origin: e.origin,
      type: e.type,
      logLevel: getLevel(e.level),
      timestamp: new Date(),
      message: e.message || '',
      context: e.context,
    });
  };
}
