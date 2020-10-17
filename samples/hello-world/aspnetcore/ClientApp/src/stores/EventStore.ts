import { action, observable, computed } from 'mobx';
import React from 'react';
import { Event } from './Event';
import { EventType, Manifest } from '@outreach/client-addon-sdk';

class EventStore {

  @observable
  public manifest?: Manifest;

  @observable
  public events: Event[] = [];

  @observable
  public filter: EventFilter = { internalLogMessages: false }

  @computed
  public get filteredEvents() {
    let result = this.events;
    if (!this.filter.internalLogMessages) {
      result = result.filter(p => p.type !== EventType.INTERNAL);
    }

    return result;
  }
  
  @action
  public setManifest = (manifest: Manifest) => {
    this.manifest = manifest;
  }

  @action 
  public setFilter = (filter: EventFilter) => {
    this.filter = filter;
  }

  @action
  public addEvent = (event: Event) => {
    this.events.push(event);
  };
}

const eventStore = new EventStore();
export const EventStoreContext = React.createContext(eventStore);
export default eventStore;


export declare type EventFilter = {
  internalLogMessages: boolean;
}