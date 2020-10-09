import { action, observable } from 'mobx';
import React from 'react';

export enum Sender {
  Host = 'host',
  Addon = 'addon',
  Debug = 'debug',
}
export class Event {
  public timestamp!: Date;

  public sender!: Sender;

  public type!: string;

  public message!: string;

  public context!: unknown[];
}

class EventStore {
  @observable
  public events: Event[] = [];

  @action
  public addEvent = (event: Event) => {
    this.events.push(event);
  };
}

const eventStore = new EventStore();
export const EventStoreContext = React.createContext(eventStore);
export default eventStore;
