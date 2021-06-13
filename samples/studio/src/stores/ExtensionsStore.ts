import React from 'react';
import { makeAutoObservable } from 'mobx';
import {
    AccountContextKeys,
    AddonStore,
    AddonType,
    Manifest,
    OpportunityContextKeys,
    Scopes,
    UserContextKeys,
} from '@outreach/client-addon-sdk';

export class ExtensionStore {
    public correlationId = Date.now().toString();

    public selectedManifest?: Manifest | null;

    public manifests: Manifest[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public addOrUpdateManifest = (manifest: Manifest) => {
        const existingManifestIndex = this.manifests.findIndex(
            (p) => p.identifier === manifest.identifier
        );

        if (existingManifestIndex === -1) {
            this.manifests.push(manifest);
        } else {
            this.manifests.splice(existingManifestIndex, 1, manifest);
        }
    };

    public selectManifest = (manifest: Manifest | null) => {
        this.selectedManifest = manifest;
    };

    public init() {
        this.buildDummyContext();
    }

    private buildDummyContext = () => {
        this.manifests.push({
            identifier: 'hello-world-app',
            version: '1.0.1',
            store: AddonStore.Public,
            author: {
                company: 'Contoso',
                websiteUrl: 'https://contoso.com',
                privacyUrl: 'https://contoso.com/privacy',
                termsOfUseUrl: 'https://contoso.com/tos',
            },
            title: {
                en: 'Hello world app extension',
            },
            description: {
                en: 'An extension demonstrating Outreach extensibility SDK capabilities and providing interactive guidance on how to achieve certain scenarios using SDK',
            },
            host: {
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABeklEQVR4Ae3WgYYCURSH8Z2BDdgHCIAeYZF6gECqZykQUFAJQAsIEpCeoICeISFCWxFoA9H890OAHUbde5Sdjx8X4HDuzH170vLA6zYBXrMcrgDnF+wLAjh7KEQRXcyxws/NCnN0UUSIpOUwwAW6uWCAHB7uHQ0coIQOaOAdceUxwRWKccXkkYtdwwa60wY1mA8QoIUIelCEFgKrFQowhhwbI7C4xG3Ik7bvz2gVEeRJhKqvH1kGG8izDTI+nhJ1yEjd9RspxB4yskeIpE2B+AqQsQKS9IkrwDmmHmSsl2BtpoigmwjTv9ZpBhmbuRxgCRlbulyhE2Ts5PISnyFjZ5ef0TVkbA1nLSBjCzirDxnrw1klyFgJzspYPyWQgdOakJEmnPeBLeTZFh/wUhnyrAyvdSBPOvBeiCHk2BAhTArQhRzpIoB5FeygO+1Qwb8uTQ9xXTpAOkBa2haKscXTN4JijPD0ZXGEAABHZPESZTHC980IWRiVlpb2C0UbQehp5hxwAAAAAElFTkSuQmCC',
                type: AddonType.LeftSideMenu,
                url: 'https://cxt-demo.azurewebsites.net/addon?param1=abc&param2=xyz',
            },
            context: [
                AccountContextKeys.CUSTOM_ID,
                UserContextKeys.ID,
                UserContextKeys.FIRST_NAME,
                UserContextKeys.LAST_NAME,
            ],
            api: {
                applicationId: 'WHnHrLrl1XEBP3liH1YIzVgrWD2xxVcEdr_zmwLGcQ0',
                connect: 'https://cxt-demo.azurewebsites.net/connect',
                redirectUri: 'https://cxt-demo.azurewebsites.net/authorize',
                scopes: [Scopes.USERS_READ],
                token: 'https://cxt-demo.azurewebsites.net/token',
            },
            configuration: [
                {
                    key: 'contoso-api-key',
                    required: true,
                    text: {
                        en: 'Contoso API key',
                    },
                    type: 'string',
                    urlInclude: false,
                },
            ],
        });

        this.manifests.push({
            identifier: 'hello-world-opportunity',
            version: '1.0.1',
            store: AddonStore.Public,
            author: {
                company: 'Contoso',
                websiteUrl: 'https://contoso.com',
                privacyUrl: 'https://contoso.com/privacy',
                termsOfUseUrl: 'https://contoso.com/tos',
            },
            title: {
                en: 'Hello world opportunity extension',
            },
            description: {
                en: 'An tab extension demonstrating Outreach extensibility SDK capabilities and providing interactive guidance on how to achieve certain scenarios using SDK',
            },
            host: {
                icon: 'https://www.seekpng.com/png/detail/215-2157239_impact-business-opportunity-opportunity-icon.png',
                type: AddonType.OpportunityTab,
                url: 'https://cxt-demo.azurewebsites.net/addon',
            },
            context: [
                AccountContextKeys.CUSTOM_ID,
                UserContextKeys.ID,
                UserContextKeys.FIRST_NAME,
                UserContextKeys.LAST_NAME,
                OpportunityContextKeys.ID,
                OpportunityContextKeys.NAME,
            ],
            api: {
                applicationId: 'WHnHrLrl1XEBP3liH1YIzVgrWD2xxVcEdr_zmwLGcQ0',
                connect: 'https://cxt-demo.azurewebsites.net/connect',
                redirectUri: 'https://cxt-demo.azurewebsites.net/authorize',
                scopes: [Scopes.USERS_READ],
                token: 'https://cxt-demo.azurewebsites.net/token',
            },
            configuration: [
                {
                    key: 'contoso-client-id',
                    required: true,
                    text: {
                        en: 'Contoso client id',
                    },
                    type: 'string',
                    urlInclude: false,
                },

                {
                    key: 'contoso-client-secret',
                    required: true,
                    text: {
                        en: 'Contoso client secret',
                    },
                    type: 'string',
                    urlInclude: false,
                },
            ],
        });

        this.manifests.push({
            identifier: 'hello-world-account',
            version: '1.0.1',
            store: AddonStore.Public,
            author: {
                company: 'Contoso',
                websiteUrl: 'https://contoso.com',
                privacyUrl: 'https://contoso.com/privacy',
                termsOfUseUrl: 'https://contoso.com/tos',
            },
            title: {
                en: 'Hello world account extension',
            },
            description: {
                en: 'An account tab extension demonstrating Outreach extensibility SDK capabilities and providing interactive guidance on how to achieve certain scenarios using SDK',
            },
            host: {
                icon: 'https://cdn.iconscout.com/icon/free/png-256/account-185-461747.png',
                type: AddonType.AccountTab,
                url: 'https://cxt-demo.azurewebsites.net/addon',
            },
            context: [
                AccountContextKeys.CUSTOM_ID,
                UserContextKeys.ID,
                UserContextKeys.FIRST_NAME,
                UserContextKeys.LAST_NAME,
                OpportunityContextKeys.ID,
                OpportunityContextKeys.NAME,
            ],
            api: {
                applicationId: 'WHnHrLrl1XEBP3liH1YIzVgrWD2xxVcEdr_zmwLGcQ0',
                connect: 'https://cxt-demo.azurewebsites.net/connect',
                redirectUri: 'https://cxt-demo.azurewebsites.net/authorize',
                scopes: [Scopes.USERS_READ],
                token: 'https://cxt-demo.azurewebsites.net/token',
            },
            configuration: [
                {
                    key: 'contoso-client-id',
                    required: true,
                    text: {
                        en: 'Contoso client id',
                    },
                    type: 'string',
                    urlInclude: false,
                },

                {
                    key: 'contoso-client-secret',
                    required: true,
                    text: {
                        en: 'Contoso client secret',
                    },
                    type: 'string',
                    urlInclude: false,
                },
            ],
        });
    };
}

const extensionStore = new ExtensionStore();
export const ExtensionStoreContext = React.createContext(extensionStore);
export default extensionStore;
