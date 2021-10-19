import eventStore from './stores/EventStore';
import extensibilitySdk, { LogLevel, ILogger, Event } from '@outreach/extensibility-sdk';

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
    if (e.level <= extensibilitySdk.logLevel) {
      // message is with to low level priority - ignore.
      return;
    }

    switch (this.level) {
      case LogLevel.Debug:
      case LogLevel.Trace:
        console.debug('[CXT][HelloWorldAddonLogger]::log', e);
        break;
      case LogLevel.Info:
        console.info('[CXT][HelloWorldAddonLogger]::log', e);
        break;
      case LogLevel.Warning:
        console.warn('[CXT][HelloWorldAddonLogger]::log', e);
        break;
      case LogLevel.Error:
        console.error('[CXT][HelloWorldAddonLogger]::log', e);
        break;
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
