import React from 'react';
import { makeAutoObservable } from 'mobx';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { Manifest } from '@outreach/client-addon-sdk';
import { v4 as uuidv4 } from 'uuid';

export class EditorStore {
    private MANIFEST_CACHING_KEY = 'cxt-studio-manifests';

    public configuration: ConfigurationItem[] = [];

    public manifests: Manifest[] = [];

    public selectedManifestId?: string;

    constructor() {
        makeAutoObservable(this);
    }

    public get selectedManifest(): Manifest | undefined {
        return this.manifests?.find(
            (p) => p.identifier === this.selectedManifestId
        );
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
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA/UlEQVRYw+2XMQ6DMAxF/xnYKs4CJ+BaHAKpEqpQOEaOAWLrAkuZYOviTlVRiUiIYzGAvZL/cOLYMXAOy6AxY4ZGJiGfgxaeh/97+vPAUegVQIcFTCvAFBZABj8tIIbCYBS0+QCF2CZ/w8tL/OujDfFgyRMIahvwZAP6bcCbDaALcAGkAXeUKFGhlQL8LEHHisOhd0dMhEPvTgOciCWKhg2w9O6aDZgOBghvkfAhC6ep0EUrpUsFSRe7gwEtKoft8wR0SBwTwAvQIXJOYS9AuuMSegCaXWVk03rjknpHIbQ8HZVxUWH8tvB5/MYYWYDRPiGYBhA3gNMActlR9gF7GV7fOJfTDAAAAABJRU5ErkJggg==',
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
        } as Manifest;

        this.addOrUpdateManifest(manifest, true);

        return manifest;
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

        localStorage.setItem(
            this.MANIFEST_CACHING_KEY,
            JSON.stringify(this.manifests)
        );

        if (selected) {
            this.selectedManifestId = manifest.identifier;
        }
    };

    public setManifests = (manifests: Manifest[]) => {
        this.manifests = manifests;
    };

    public setSelectedManifestId = (manifestId: string) => {
        this.selectedManifestId = manifestId;
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

    public addConfigurationOption = (
        item: ConfigurationItem,
        index: number
    ) => {
        const options = this.configuration[index].options || [];

        options?.push({
            text: {
                en: '',
            },
            value: '',
        });

        this.configuration[index] = {
            ...this.configuration[index],
            options,
        };
    };

    public updateConfigurationOption = (
        item: ConfigurationItem,
        index: number
    ) => {
        const options = this.configuration[index].options || [];

        this.configuration[index] = {
            ...this.configuration[index],
            options,
        };
    };

    public addOrUpdateConfiguration = (
        item: ConfigurationItem,
        index: number
    ) => {
        this.configuration.splice(index, 1, item);
    };

    public init = () => {
        const cachedManifests = localStorage.getItem(this.MANIFEST_CACHING_KEY);
        if (cachedManifests) {
            this.manifests = JSON.parse(cachedManifests);
        } else {
            this.manifests = [];
        }
    };
}

const editorStore = new EditorStore();
export const EditorStoreContext = React.createContext(editorStore);
export default editorStore;
