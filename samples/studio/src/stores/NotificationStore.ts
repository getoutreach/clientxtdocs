import { makeAutoObservable, runInAction } from 'mobx';

import React from 'react';

declare type NotificationType = 'success' | 'error' | 'info' | 'warning';

export class NotificationStore {
    /**
     * The action to display. It renders after the message, at the end of the alert.
     */
    action?: React.ReactNode;

    public delay: number = 0;

    public timeout: number | null = 5000;

    public text!: string;

    public visible!: boolean;

    public type!: NotificationType;

    constructor() {
        makeAutoObservable(this);
    }

    public showToast(
        text: string,
        type: NotificationType,
        timeout: number | null = 5000,
        action?: React.ReactNode
    ): number {
        return this.delayToast(text, type, 0, timeout, action);
    }

    public delayToast(
        text: string,
        type: NotificationType,
        delay: number = 0,
        timeout?: number | null,
        action?: React.ReactNode,
        onTostShow?: () => void
    ): number {
        this.text = text;
        this.action = action;
        this.type = type;
        this.delay = 0;
        this.timeout = timeout ? timeout : 5000;

        return window.setTimeout(() => {
            runInAction(() => (this.visible = true));
            if (onTostShow) {
                onTostShow();
            }
        }, delay);
    }

    public cancel = (handler: number) => {
        window.clearTimeout(handler);
    };

    public closeToast() {
        this.visible = false;
    }
}

const notificationStore = new NotificationStore();
export const NotificationStoreContext = React.createContext(notificationStore);
export default notificationStore;
