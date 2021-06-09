import React from 'react';
import { makeAutoObservable } from 'mobx';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { Manifest } from '@outreach/client-addon-sdk';

export class EditorStore {
    public configuration: ConfigurationItem[] = [];

    public manifests: Manifest[] = [];

    public selectedManifest?: Manifest;

    constructor() {
        makeAutoObservable(this);
    }

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
            this.selectedManifest = manifest;
        }
    };

    public setManifests = (manifests: Manifest[]) => {
        this.manifests = manifests;
    };

    public setSelectedManifest = (manifest: Manifest) => {
        this.selectedManifest = manifest;
    };

    public setAuthorCompany = (company: string) => {
        if (!this.selectedManifest) {
            return;
        }

        this.selectedManifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                company,
            },
        };
    };

    public setAuthorWebsite = (websiteUrl: string) => {
        if (!this.selectedManifest) {
            return;
        }

        this.selectedManifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                websiteUrl,
            },
        };
    };

    public setAuthorPrivacyUrl = (privacyUrl: string) => {
        if (!this.selectedManifest) {
            return;
        }

        this.selectedManifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                privacyUrl,
            },
        };
    };

    public setAuthorTermsOfUseUrl = (termsOfUseUrl: string) => {
        if (!this.selectedManifest) {
            return;
        }

        this.selectedManifest = {
            ...this.selectedManifest,
            author: {
                ...this.selectedManifest.author,
                termsOfUseUrl,
            },
        };
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
}

const editorStore = new EditorStore();
export const EditorStoreContext = React.createContext(editorStore);
export default editorStore;
