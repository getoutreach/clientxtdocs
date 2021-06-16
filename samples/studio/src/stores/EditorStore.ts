import React from "react";
import { makeAutoObservable } from "mobx";
import { ConfigurationItem } from "@outreach/client-addon-sdk/store/configuration/ConfigurationItem";
import { Manifest, urlValidation } from "@outreach/client-addon-sdk";
import { v4 as uuidv4 } from "uuid";

interface EditorCacheData {
  manifests: Manifest[];
}

export class EditorStore {
  private MANIFEST_CACHING_KEY = "cxt-studio-manifests-v1";
  private SELECTED_MANIFEST_CACHING_KEY = "cxt-studio-selected-manifest-v1";

  public manifests: Manifest[] = [];

  public selectedManifestId?: string | null;

  private initialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get selectedManifest(): Manifest | undefined {
    const manifest = this.manifests?.find(
      (p) => p.identifier === this.selectedManifestId
    );

    return manifest;
  }

  public get generalInfoValid(): boolean {
    return (
      !!this.selectedManifest &&
      !!this.selectedManifest.version &&
      !!this.selectedManifest.identifier &&
      !!this.selectedManifest.title.en &&
      !!this.selectedManifest.description.en &&
      !!this.selectedManifest.author.company &&
      urlValidation(this.selectedManifest.author.privacyUrl) &&
      urlValidation(this.selectedManifest.author.termsOfUseUrl) &&
      urlValidation(this.selectedManifest.author.websiteUrl)
    );
  }

  public get hostInfoValid(): boolean {
    return (
      !!this.selectedManifest &&
      !!this.selectedManifest.host &&
      !!this.selectedManifest?.host.icon &&
      !!this.selectedManifest?.host.type &&
      urlValidation(this.selectedManifest?.host.url)
    );
  }

  public get contextInfoValid(): boolean {
    return !!this.selectedManifest && this.selectedManifest.context.length > 0;
  }

  public get apiInfoValid(): boolean {
    if (!!this.selectedManifest && !this.selectedManifest.api) {
      return true;
    }

    return (
      !!this.selectedManifest &&
      !!this.selectedManifest.api &&
      !!this.selectedManifest?.api.applicationId &&
      urlValidation(this.selectedManifest?.api.connect) &&
      urlValidation(this.selectedManifest?.api.redirectUri) &&
      urlValidation(this.selectedManifest?.api.token) &&
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
      version: "",
      author: {
        company: "",
        privacyUrl: "",
        termsOfUseUrl: "",
        websiteUrl: "",
      },
      host: {
        type: "left-side-menu",
        url: "",
        icon: "",
        environment: {
          fullWidth: false,
          decoration: "none",
        },
      },
      title: {
        en: "",
      },
      description: {
        en: "",
      },
      context: [],
      store: "personal",
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

  public setSelectedManifestId = (manifestId: string | null) => {
    this.selectedManifestId = manifestId;
    this.cacheSelectedManifestIdToLocalStorage();
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
    if (!editorStore.selectedManifest) {
      return;
    }

    let configItems: ConfigurationItem[] = [];

    if (editorStore.selectedManifest?.configuration) {
      configItems = [...editorStore.selectedManifest.configuration];
    }

    const configurationItem = {
      id: Date.now(),
      key: "",
      text: {
        en: "",
      },
      required: true,
      type: "string",
      urlInclude: true,
      defaultValue: "",
      validator: "",
      options: [{ text: { en: "" }, value: "" }],
    } as ConfigurationItem;

    configItems.push(configurationItem);

    const manifest: Manifest = {
      ...editorStore.selectedManifest,
      configuration: configItems,
    };

    this.addOrUpdateManifest(manifest);
  };

  public addNewConfigurationOption = (index: number) => {
    console.log("[EditorStore.tsx]::addNewConfigurationOption", index);

    const configurations = this.selectedManifest?.configuration || [];

    if (configurations.length < index) {
      return;
    }

    const configuration = configurations[index];
    const options = configuration.options || [];
    options?.push({
      text: {
        en: "",
      },
      value: "",
    });

    const manifest = {
      ...this.selectedManifest,
      configuration: configurations,
    } as Manifest;

    this.addOrUpdateManifest(manifest);
  };

  public updateConfigurationItem = (item: ConfigurationItem, index: number) => {
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

  public deleteConfigurationItem = (index: number) => {
    const configurations = this.selectedManifest?.configuration || [];

    if (configurations.length < index) {
      return;
    }

    configurations.splice(index, 1);

    const manifest = {
      ...this.selectedManifest,
      configuration: configurations,
    } as Manifest;

    this.addOrUpdateManifest(manifest);
  };

  public init = () => {
    this.initialized = false;
    const cachedManifests = localStorage.getItem(this.MANIFEST_CACHING_KEY);
    if (cachedManifests) {
      const data = JSON.parse(cachedManifests) as EditorCacheData;

      this.manifests = data.manifests;
    } else {
      this.manifests = [];
    }

    this.selectedManifestId =
      localStorage.getItem(this.SELECTED_MANIFEST_CACHING_KEY) || null;

    this.initialized = true;
  };

  private newManifestApi = () => {
    return {
      scopes: [],
      applicationId: "",
      connect: "",
      redirectUri: "",
      token: "",
    };
  };

  private cacheContextToLocalStorage = () => {
    if (!this.initialized) {
      return;
    }

    const context = JSON.stringify({
      manifests: this.manifests,
      selectedManifestId: this.setSelectedManifestId,
    });
    localStorage.setItem(this.MANIFEST_CACHING_KEY, context);
  };

  private cacheSelectedManifestIdToLocalStorage = () => {
    if (!this.initialized) {
      return;
    }

    localStorage.setItem(
      this.SELECTED_MANIFEST_CACHING_KEY,
      this.selectedManifestId || ""
    );
  };
}

const editorStore = new EditorStore();
export const EditorStoreContext = React.createContext(editorStore);
export default editorStore;
