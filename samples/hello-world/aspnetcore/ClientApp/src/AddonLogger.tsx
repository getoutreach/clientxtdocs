import eventStore, { Sender } from './stores/EventStore';
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
export class AddonLogger implements ILogger {
  public level: LogLevel = LogLevel.Trace;
  public log = (e: Event) => {
    if (e.level <= addonSdk.logger.level) {
      // message is with to low level priority - ignore.
      return;
    }
    console.debug('[HelloWorld]::addonSdk.onInfo', e);
    eventStore.addEvent({
      timestamp: new Date(),
      sender: Sender.Debug,
      message: e.message || '',
      type: getLevel(e.level),
      context: e.context,
    });
  };
}
