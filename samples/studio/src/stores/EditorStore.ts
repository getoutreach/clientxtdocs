import React from 'react';
import { makeAutoObservable } from 'mobx';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { Manifest } from '@outreach/client-addon-sdk';
import { v4 as uuidv4 } from 'uuid';
import { isUrl } from '../app/utils';

interface EditorCacheData {
    manifests: Manifest[];
    selectedManifestId: string;
    useApi: boolean;
}

export class EditorStore {
    private MANIFEST_CACHING_KEY = 'cxt-studio-manifests-v1';

    public manifests: Manifest[] = [];

    public selectedManifestId?: string | null;

    public useApi: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public get selectedManifest(): Manifest | undefined {
        return this.manifests?.find(
            (p) => p.identifier === this.selectedManifestId
        );
    }

    public get generalInfoValid(): boolean {
        return (
            !!this.selectedManifest &&
            !!this.selectedManifest.version &&
            !!this.selectedManifest.identifier &&
            !!this.selectedManifest.title.en &&
            !!this.selectedManifest.description.en &&
            !!this.selectedManifest.author.company &&
            isUrl(this.selectedManifest.author.privacyUrl) &&
            isUrl(this.selectedManifest.author.termsOfUseUrl) &&
            isUrl(this.selectedManifest.author.websiteUrl)
        );
    }

    public get hostInfoValid(): boolean {
        return (
            !!this.selectedManifest &&
            !!this.selectedManifest.host &&
            !!this.selectedManifest?.host.icon &&
            !!this.selectedManifest?.host.type &&
            isUrl(this.selectedManifest?.host.url)
        );
    }

    public get contextInfoValid(): boolean {
        return (
            !!this.selectedManifest && this.selectedManifest.context.length > 0
        );
    }

    public get apiInfoValid(): boolean {
        if (!this.useApi) {
            return true;
        }

        return (
            !!this.selectedManifest &&
            !!this.selectedManifest.api &&
            !!this.selectedManifest?.api.applicationId &&
            isUrl(this.selectedManifest?.api.connect) &&
            isUrl(this.selectedManifest?.api.redirectUri) &&
            isUrl(this.selectedManifest?.api.token) &&
            !!this.selectedManifest?.api.scopes
        );
    }

    public get configInfoValid(): boolean {
        if (!this.selectedManifest) {
            return false;
        }

        if (
            !this.selectedManifest!.configuration ||
            this.selectedManifest!.configuration.length === 0
        ) {
            return true;
        }

        let valid = true;
        this.selectedManifest!.configuration.forEach((config) => {
            valid = valid && !!config.key && !!config.text && !!config.type;
        });

        return valid;
    }

    public createNewManifest = (): Manifest => {
        const manifest = {
            identifier: uuidv4(),
            version: '',
            author: {
                company: '',
                privacyUrl: '',
                termsOfUseUrl: '',
                websiteUrl: '',
            },
            host: {
                type: 'left-side-menu',
                url: '',
                icon: '',
                environment: {
                    fullWidth: false,
                    decoration: 'none',
                },
            },
            title: {
                en: '',
            },
            description: {
                en: '',
            },
            context: [],
            store: 'personal',
            configuration: [],
        } as Manifest;

        this.addOrUpdateManifest(manifest, true);

        return manifest;
    };

    public deleteManifest = (manifestId: string) => {
        const existingManifestIndex = this.manifests.findIndex(
            (p) => p.identifier === manifestId
        );

        if (existingManifestIndex > -1) {
            this.manifests.splice(existingManifestIndex, 1);
            this.cacheContextToLocalStorage();
        }
    };

    public addOrUpdateManifest = (
        manifest: Manifest,
        selected: boolean = false
    ) => {
        manifest = { ...manifest };

        const existingManifestIndex = this.manifests.findIndex(
            (p) => p.identifier === manifest.identifier
        );

        if (existingManifestIndex === -1) {
            this.manifests.push(manifest);
        } else {
            this.manifests.splice(existingManifestIndex, 1, manifest);
        }

        if (selected) {
            this.selectedManifestId = manifest.identifier;
        }
        this.cacheContextToLocalStorage();
    };

    public setManifests = (manifests: Manifest[]) => {
        this.manifests = manifests;

        this.cacheContextToLocalStorage();
    };

    public setSelectedManifestId = (manifestId: string) => {
        this.selectedManifestId = manifestId;
        this.cacheContextToLocalStorage();
    };

    public setAuthorCompany = (company: string) => {
        if (!this.selectedManifest) {
            return;
        }

        const manifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                company,
            },
        };

        this.addOrUpdateManifest(manifest);
    };

    public setAuthorWebsite = (websiteUrl: string) => {
        if (!this.selectedManifest) {
            return;
        }

        const manifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                websiteUrl,
            },
        };

        this.addOrUpdateManifest(manifest);
    };

    public setAuthorPrivacyUrl = (privacyUrl: string) => {
        if (!this.selectedManifest) {
            return;
        }

        const manifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                privacyUrl,
            },
        };

        this.addOrUpdateManifest(manifest);
    };

    public setAuthorTermsOfUseUrl = (termsOfUseUrl: string) => {
        if (!this.selectedManifest) {
            return;
        }

        const manifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                termsOfUseUrl,
            },
        };

        this.addOrUpdateManifest(manifest);
    };

    public setApiApplicationId = (applicationId: string) => {
        const manifest = {
            ...editorStore.selectedManifest!,
        };
        manifest.api = manifest.api || this.newManifestApi();
        manifest.api.applicationId = applicationId;

        this.addOrUpdateManifest(manifest);
    };

    public setApiRedirectUrl = (redirectUrl: string) => {
        const manifest = {
            ...editorStore.selectedManifest!,
        };
        manifest.api = manifest.api || this.newManifestApi();
        manifest.api.redirectUri = redirectUrl;

        this.addOrUpdateManifest(manifest);
    };

    public setApiConnectEndpoint = (connect: string) => {
        const manifest = {
            ...editorStore.selectedManifest!,
        };
        manifest.api = manifest.api || this.newManifestApi();
        manifest.api.connect = connect;

        this.addOrUpdateManifest(manifest);
    };

    public setApiTokenEndpoint = (token: string) => {
        const manifest = {
            ...editorStore.selectedManifest!,
        };
        manifest.api = manifest.api || this.newManifestApi();
        manifest.api.token = token;

        this.addOrUpdateManifest(manifest);
    };

    public createNewConfigurationItem = () => {
        const configurationItem = {
            id: Date.now(),
            key: '',
            text: {
                en: '',
            },
            required: true,
            type: 'string',
            urlInclude: true,
            defaultValue: '',
            validator: '',
            options: [{ text: { en: '' }, value: '' }],
        } as ConfigurationItem;

        editorStore.selectedManifest?.configuration?.push(configurationItem);
    };

    public addNewConfigurationOption = (index: number) => {
        const configurations = this.selectedManifest?.configuration || [];

        if (configurations.length < index) {
            return;
        }

        const configuration = configurations[index];
        const options = configuration.options || [];
        options?.push({
            text: {
                en: '',
            },
            value: '',
        });

        const manifest = {
            ...this.selectedManifest,
            configuration: configurations,
        } as Manifest;

        this.addOrUpdateManifest(manifest);
    };

    public updateConfigurationItem = (
        item: ConfigurationItem,
        index: number
    ) => {
        const configurations = this.selectedManifest?.configuration || [];

        if (configurations.length < index) {
            return;
        }

        configurations.splice(index, 1, item);

        const manifest = {
            ...this.selectedManifest,
            configuration: configurations,
        } as Manifest;

        this.addOrUpdateManifest(manifest);
    };

    public setUseApi = (useApi: boolean) => {
        this.useApi = useApi;

        if (!this.useApi) {
            const manifest = JSON.parse(
                JSON.stringify(this.selectedManifest)
            ) as Manifest;
            delete manifest.api;
            this.addOrUpdateManifest(manifest);
        }

        this.cacheContextToLocalStorage();
    };

    public init = () => {
        const cachedManifests = localStorage.getItem(this.MANIFEST_CACHING_KEY);
        if (cachedManifests) {
            const data = JSON.parse(cachedManifests) as EditorCacheData;
            this.manifests = data.manifests;
            this.useApi = data.useApi;
            this.selectedManifestId = data.selectedManifestId;
        } else {
            this.manifests = [];
            this.useApi = false;
            this.selectedManifestId = null;
        }
    };

    private newManifestApi = () => {
        return {
            scopes: [],
            applicationId: '',
            connect: '',
            redirectUri: '',
            token: '',
        };
    };

    private cacheContextToLocalStorage = () => {
        localStorage.setItem(
            this.MANIFEST_CACHING_KEY,
            JSON.stringify({
                manifests: this.manifests,
                selectedManifestId: this.setSelectedManifestId,
                useApi: this.useApi,
            })
        );
    };
}

const editorStore = new EditorStore();
export const EditorStoreContext = React.createContext(editorStore);
export default editorStore;
