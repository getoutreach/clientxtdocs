import { ExtensionType, EventType, EventOrigin, LogLevel } from '@outreach/extensibility-sdk';
export class Event {
  public origin!: EventOrigin;
  public timestamp!: Date;
  public type!: EventType;
  public logLevel!: string;
  public message!: string;
  public messageType?: ExtensionType;
  public context!: string[];
}
