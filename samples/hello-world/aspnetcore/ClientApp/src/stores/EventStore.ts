import { action, observable, computed } from 'mobx';
import React from 'react';
import { Event } from './Event';
import { EventType, Application, RuntimeContext, Extension } from '@outreach/extensibility-sdk';
import { ConfigurationValue } from '@outreach/extensibility-sdk/configuration/ConfigurationValue';

class EventStore {
  @observable
  public application?: Application;

  @observable
  public extension?: Extension;

  @observable
  public token?: string;

  @observable
  public events: Event[] = [];

  @observable
  public filter: EventFilter = { internalLogMessages: false };

  @observable
  public json: object | null = null;

  @observable
  public configuration?: ConfigurationValue[];

  @computed
  public get filteredEvents() {
    let result = this.events;
    if (!this.filter.internalLogMessages) {
      result = result.filter(p => p.type !== EventType.INTERNAL);
    }

    return result;
  }

  @action
  public setJson = (json: object | null) => {
    this.json = json;
  };

  @action
  public setRuntime = (runtime: RuntimeContext) => {
    this.application = runtime.application;
    this.extension = runtime.extension;
    this.configuration = runtime.configuration;
  };

  @action
  public setToken = (token: string) => {
    this.token = token;
  };

  @action
  public setFilter = (filter: EventFilter) => {
    this.filter = filter;
  };

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
};
