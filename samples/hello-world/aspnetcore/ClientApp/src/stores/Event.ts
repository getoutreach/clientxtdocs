import { AddonMessageType, EventType, EventOrigin, LogLevel } from '@outreach/client-addon-sdk';
export class Event {
  public origin!: EventOrigin;
  public timestamp!: Date;
  public type!: EventType;
  public logLevel!: string;
  public message!: string;
  public messageType?: AddonMessageType;
  public context!: unknown[];
}
