import React from 'react';
import { PaletteType } from '@material-ui/core';
import { makeAutoObservable } from 'mobx';

export class ConfigStore {
    public correlationId = Date.now().toString();

    /**
     * Locale used by Outreach app hosting the addon
     *
     * @type {string}
     * @memberof ConfigStore
     */
    public locale!: string;

    /**
     * Theme used by Outreach app hosting the addon
     *
     * @type {PaletteType}
     * @memberof ConfigStore
     */
    public theme!: PaletteType;

    constructor() {
        makeAutoObservable(this);
    }

    public setLocale = (locale: string) => {
        this.locale = locale;
    };

    public setTheme = (teamsTheme: string) => {
        this.theme = teamsTheme !== 'dark' ? 'light' : 'dark';
    };
}

const configStore = new ConfigStore();
export const ConfigStoreContext = React.createContext(configStore);
export default configStore;
