import { action, observable } from 'mobx';
import React from 'react';
import { AddonMessageType } from '@outreach/client-addon-sdk/dist/messages/AddonMessageType';

export class Event {
    
    public timestamp!: Date;
    
    public sender!: 'host' | 'addon';
    
    public type!: AddonMessageType;

    public payload!: string;
}

class EventStore {

    @observable
    public events: Event[] = [
        {timestamp: new Date(), sender: 'host', type: AddonMessageType.INIT, payload: 'blah blah'},
        {timestamp: new Date(), sender: 'addon', type: AddonMessageType.READY, payload: 'POH POH'},
    ];

    @action
    public addEvent = (event: Event) => {
        this.events.push(event);
    } 

}

const eventStore = new EventStore();
export const EventStoreContext = React.createContext(eventStore);
export default eventStore;

