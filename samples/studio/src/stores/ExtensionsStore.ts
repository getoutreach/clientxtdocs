import React from 'react';
import { makeAutoObservable } from 'mobx';
import {
  AccountContextKeys,
  AddonCategory,
  AddonStore,
  AddonType,
  Manifest,
  OpportunityContextKeys,
  ProspectContextKeys,
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

  public setSelectedManifest = (manifest: Manifest | null) => {
    this.selectedManifest = manifest;
  };

  public init() {
    this.buildDummyContext();
  }

  private buildDummyContext = () => {
    // hello world app
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
      categories: [AddonCategory.SALES_PRODUCTIVITY, AddonCategory.MARKETING],
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

    // hello world opportunity
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
      categories: [AddonCategory.SALES_PRODUCTIVITY, AddonCategory.MARKETING],
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

    // hello world account
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
      categories: [AddonCategory.SALES_PRODUCTIVITY, AddonCategory.MARKETING],
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

    // hello world prospect
    this.manifests.push({
      identifier: 'hello-world-prospect',
      version: '1.0.1',
      store: AddonStore.Public,
      author: {
        company: 'Contoso',
        websiteUrl: 'https://contoso.com',
        privacyUrl: 'https://contoso.com/privacy',
        termsOfUseUrl: 'https://contoso.com/tos',
      },
      title: {
        en: 'Hello world (prospect addon)',
      },
      description: {
        en: 'An prospect tab extension demonstrating Outreach extensibility SDK capabilities and providing interactive guidance on how to achieve certain scenarios using SDK',
      },
      categories: [AddonCategory.SALES_PRODUCTIVITY, AddonCategory.MARKETING],
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
        ProspectContextKeys.ID,
        ProspectContextKeys.COMPANY,
        ProspectContextKeys.TITLE,
        ProspectContextKeys.EXTERNAL,
        ProspectContextKeys.EMAILS,
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

    // 6sense account
    this.manifests.push({
      identifier: 'addon-6sense-SalesIntelligenceAccount',
      version: '0.10',
      store: AddonStore.Public,
      author: {
        company: '6sense',
        websiteUrl: 'https://6sense.com/',
        privacyUrl: 'https://6sense.com/privacy-policy/',
        termsOfUseUrl: 'https://6sense.com/terms-of-use/',
      },
      title: {
        en: '6sense Sales Intelligence',
      },
      description: {
        en: 'Addon for 6sense Sales Intelligence UI for Outreach Account Tab',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      host: {
        icon: 'data:image/png;base64,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',
        type: AddonType.AccountTab,
        url: 'https://account-analytics-khuranaji.dev.6si.com/outreach/sales/',
      },
      context: [
        AccountContextKeys.CUSTOM_ID,
        UserContextKeys.ID,
        UserContextKeys.FIRST_NAME,
        UserContextKeys.LAST_NAME,
        ProspectContextKeys.AVAILABLE_AT,
        ProspectContextKeys.COMPANY,
        ProspectContextKeys.COMPANY_LOCALITY,
        ProspectContextKeys.ID,
        ProspectContextKeys.CUSTOM_FIELD_1,
        ProspectContextKeys.CUSTOM_FIELD_2,
        ProspectContextKeys.CUSTOM_FIELD_3,
      ],
      configuration: [
        {
          key: 'apikey',
          required: true,
          text: {
            en: 'Enter 6sense API Key',
          },
          type: 'string',
          urlInclude: true,
        },
      ],
    });

    // 6sense app
    this.manifests.push({
      identifier: 'addon-6sense-SalesDashboard',
      version: '0.10',
      store: AddonStore.Public,
      author: {
        company: '6sense',
        websiteUrl: 'https://6sense.com/',
        privacyUrl: 'https://6sense.com/privacy-policy/',
        termsOfUseUrl: 'https://6sense.com/terms-of-use/',
      },
      title: {
        en: '6sense Sales Intelligence',
      },
      description: {
        en: 'Addon for 6sense Sales Intelligence UI for Outreach Account Tab',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      host: {
        icon: 'data:image/png;base64,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',
        type: AddonType.AccountTab,
        url: 'https://account-analytics-khuranaji.dev.6si.com/outreach/sales/',
      },
      context: [
        AccountContextKeys.CUSTOM_ID,
        UserContextKeys.EMAIL,
        UserContextKeys.FIRST_NAME,
        UserContextKeys.ID,
        UserContextKeys.LAST_NAME,
        UserContextKeys.TITLE,
        UserContextKeys.USERNAME,
        UserContextKeys.CUSTOM_FIELD_1,
        UserContextKeys.CUSTOM_FIELD_2,
        UserContextKeys.CUSTOM_FIELD_3,
        UserContextKeys.CUSTOM_FIELD_4,
        UserContextKeys.CUSTOM_FIELD_5,
      ],
      configuration: [
        {
          key: 'apikey',
          required: true,
          text: {
            en: 'Enter 6sense API Key',
          },
          type: 'string',
          urlInclude: true,
        },
      ],
    });

    // 6sense prospect
    this.manifests.push({
      identifier: 'addon-6sense-SalesIntelligenceProspect',
      version: '0.10',
      store: AddonStore.Public,
      author: {
        company: '6sense',
        websiteUrl: 'https://6sense.com/',
        privacyUrl: 'https://6sense.com/privacy-policy/',
        termsOfUseUrl: 'https://6sense.com/terms-of-use/',
      },
      title: {
        en: '6sense Sales Intelligence',
      },
      description: {
        en: 'Addon for 6sense Sales Intelligence UI for Outreach Prospect Tab',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      host: {
        icon: 'data:image/png;base64,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',
        type: AddonType.AccountTab,
        url: 'https://account-analytics-khuranaji.dev.6si.com/outreach/sales/',
      },
      context: [
        AccountContextKeys.CUSTOM_ID,
        UserContextKeys.ID,
        UserContextKeys.FIRST_NAME,
        UserContextKeys.LAST_NAME,
        ProspectContextKeys.AVAILABLE_AT,
        ProspectContextKeys.COMPANY,
        ProspectContextKeys.COMPANY_LOCALITY,
        ProspectContextKeys.ID,
        ProspectContextKeys.CUSTOM_FIELD_1,
        ProspectContextKeys.CUSTOM_FIELD_2,
        ProspectContextKeys.CUSTOM_FIELD_3,
      ],
      configuration: [
        {
          key: 'apikey',
          required: true,
          text: {
            en: 'Enter 6sense API Key',
          },
          type: 'string',
          urlInclude: true,
        },
      ],
    });

    // Coffee app
    this.manifests.push({
      identifier: 'coffee-opportunity-tab',
      version: '0.10',
      store: AddonStore.Public,
      author: {
        company: '6sense',
        websiteUrl: 'https://outreach.io/',
        privacyUrl: 'https://www.outreach.io/privacy-policy',
        termsOfUseUrl: 'https://www.outreach.io/terms',
      },
      title: {
        en: 'Plan',
      },
      description: {
        en: 'Project Coffee main app',
      },
      host: {
        icon: 'https://cxt-studio.azurewebsites.net/favicon.ico',
        type: AddonType.LeftSideMenu,
        url: 'https://account-analytics-khuranaji.dev.6si.com/outreach/sales/',
      },
      categories: [
        AddonCategory.CHAT,
        AddonCategory.CONVERSATION_INTELLIGENCE,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      api: {
        applicationId: 'Nw6vD8Az5tUb4AXio0lVqQ-OEq6rscAVapOm0rTdvYg',
        connect: 'https://planapi.outreach.io/outreach-oauth/oauth-connect',
        redirectUri: 'https://planapi.outreach.io/outreach-oauth/authorize',
        scopes: [
          Scopes.USERS_READ,
          Scopes.ACCOUNTS_READ,
          Scopes.PROSPECTS_READ,
          Scopes.OPPORTUNITIES_READ,
          Scopes.RESOURCES_ALL,
        ],
        token: 'https://planapi.outreach.io/outreach-oauth/token',
      },
      context: [
        AccountContextKeys.CUSTOM_ID,
        UserContextKeys.EMAIL,
        UserContextKeys.FIRST_NAME,
        UserContextKeys.ID,
        UserContextKeys.LAST_NAME,
        UserContextKeys.TITLE,
        UserContextKeys.USERNAME,
      ],
      configuration: [],
    });

    // Coffee opportunity tab
    this.manifests.push({
      identifier: 'coffee-opportunity-tab',
      version: '0.10',
      store: AddonStore.Public,
      author: {
        company: 'Outreach',
        websiteUrl: 'https://outreach.io/',
        privacyUrl: 'https://www.outreach.io/privacy-policy',
        termsOfUseUrl: 'https://www.outreach.io/terms',
      },
      title: {
        en: 'Plan',
      },
      description: {
        en: 'Project Coffee opportunity app extension',
      },
      host: {
        icon: 'https://cxt-studio.azurewebsites.net/favicon.ico',
        type: AddonType.OpportunityTab,
        url: 'https://account-analytics-khuranaji.dev.6si.com/outreach/sales/',
      },
      categories: [
        AddonCategory.CHAT,
        AddonCategory.CONVERSATION_INTELLIGENCE,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      api: {
        applicationId: 'Nw6vD8Az5tUb4AXio0lVqQ-OEq6rscAVapOm0rTdvYg',
        connect: 'https://planapi.outreach.io/outreach-oauth/oauth-connect',
        redirectUri: 'https://planapi.outreach.io/outreach-oauth/authorize',
        scopes: [
          Scopes.USERS_READ,
          Scopes.ACCOUNTS_READ,
          Scopes.PROSPECTS_READ,
          Scopes.OPPORTUNITIES_READ,
          Scopes.RESOURCES_ALL,
        ],
        token: 'https://planapi.outreach.io/outreach-oauth/token',
      },
      context: [
        AccountContextKeys.CUSTOM_ID,
        UserContextKeys.EMAIL,
        UserContextKeys.FIRST_NAME,
        UserContextKeys.ID,
        UserContextKeys.LAST_NAME,
        UserContextKeys.TITLE,
        UserContextKeys.USERNAME,
        OpportunityContextKeys.ID,
        OpportunityContextKeys.NAME,
      ],
      configuration: [],
    });

    // ON 24 prospect tab
    this.manifests.push({
      identifier: 'ON24-V1',
      version: '0.11',
      store: AddonStore.Public,
      author: {
        company: 'ON24',
        websiteUrl: 'https://www.on24.com/',
        privacyUrl: 'https://www.on24.com/tou/',
        termsOfUseUrl: 'https://www.on24.com/privacy-policy/',
      },
      title: {
        en: 'ON24',
      },
      description: {
        en: 'ON24 - Outrearch Integration',
      },
      host: {
        icon: 'https://11jvfl23vm4l3xirbp1ovizf-wpengine.netdna-ssl.com/wp-content/themes/ON24/images/logos/ON24_Logo_RGB.svg',
        type: AddonType.ProspectTab,
        url: 'https://account-analytics-khuranaji.dev.6si.com/outreach/sales/',
      },
      categories: [AddonCategory.VIDEO, AddonCategory.SALES_INTELLIGENCE_DATA],
      api: {
        applicationId: 'on24rLrl1XEBP3liH1YIzVgrWD2xxVcEdr_zmwLGcQ0',
        connect: 'https://on24-outreach-app-qa.azurewebsites.net/connect',
        redirectUri: 'https://on24-outreach-app-qa.azurewebsites.net/authorize',
        scopes: [
          Scopes.USERS_READ,
          Scopes.OPPORTUNITIES_READ,
          Scopes.PROSPECTS_READ,
          Scopes.PROSPECTS_WRITE,
        ],
        token: 'https://on24-outreach-app-qa.azurewebsites.net/token',
      },

      context: [
        UserContextKeys.FIRST_NAME,
        UserContextKeys.ID,
        UserContextKeys.LAST_NAME,
        OpportunityContextKeys.ID,
        OpportunityContextKeys.NAME,
        ProspectContextKeys.EMAILS,
        ProspectContextKeys.ID,
      ],
      configuration: [
        {
          key: 'clientId',
          required: true,
          text: {
            en: 'Enter ON24 client id',
          },
          type: 'number',
          urlInclude: true,
        },
        {
          key: 'accessTokenKey',
          required: true,
          text: {
            en: 'Enter ON24 API Token Key',
          },
          type: 'string',
          urlInclude: true,
        },
        {
          key: 'accessTokenSecret',
          required: true,
          text: {
            en: 'Enter ON24 API Token Secret',
          },
          type: 'string',
          urlInclude: true,
        },
      ],
    });

    // Sales Intel account tab
    this.manifests.push({
      identifier: 'salesintel-account',
      version: '0.11',
      store: AddonStore.Private,
      author: {
        company: 'SalesIntel',
        websiteUrl: 'https://salesintel.io/',
        privacyUrl: 'https://salesintel.io/privacy-policy/',
        termsOfUseUrl: 'https://salesintel.io/eula/',
      },
      title: {
        en: 'SalesIntel',
      },
      description: {
        en: 'The account-based prospecting solution that gives you the power to connect with one-click.',
      },
      host: {
        icon: 'https://app.salesintel.io/favicon.ico',
        type: AddonType.AccountTab,
        url: 'https://app.stg.salesintel.io/outreach/',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      api: {
        applicationId: 'pmYJMqmCBe2P9Ujedn51qusCo2aFLMa0xqI2W1aprJ0',
        connect: 'https://api.circleback.com/outreach/connect',
        redirectUri: 'https://app.stg.salesintel.io/outreach/',
        scopes: [
          Scopes.ACCOUNTS_ALL,
          Scopes.PROSPECTS_ALL,
          Scopes.SEQUENCES_ALL,
        ],
        token: 'https://api.circleback.com/outreach/token',
      },
      context: [
        UserContextKeys.ID,
        AccountContextKeys.ID,
        AccountContextKeys.NAME,
        AccountContextKeys.CUSTOM_ID,
        AccountContextKeys.DESCRIPTION,

        ProspectContextKeys.ID,
        ProspectContextKeys.COMPANY_LOCALITY,
        ProspectContextKeys.EMAILS,
        ProspectContextKeys.COMPANY,
      ],
      configuration: [
        {
          key: 'project',
          required: true,
          text: {
            en: 'Project name.',
          },
          type: 'string',
          urlInclude: true,
        },
        {
          key: 'startDate',
          required: true,
          text: {
            en: 'Start date',
          },
          type: 'date',
          urlInclude: true,
        },
        {
          key: 'reference',
          required: true,
          text: {
            en: 'Reference documentation',
          },
          type: 'uri',
          urlInclude: true,
        },
      ],
    });

    // Sales Intel app
    this.manifests.push({
      identifier: 'salesintel-left-side-menu',
      version: '0.11',
      store: AddonStore.Private,
      author: {
        company: 'SalesIntel',
        websiteUrl: 'https://salesintel.io/',
        privacyUrl: 'https://salesintel.io/privacy-policy/',
        termsOfUseUrl: 'https://salesintel.io/eula/',
      },
      title: {
        en: 'SalesIntel',
      },
      description: {
        en: 'The account-based prospecting solution that gives you the power to connect with one-click.',
      },
      host: {
        icon: 'https://app.salesintel.io/favicon.ico',
        type: AddonType.AccountTab,
        url: 'https://app.stg.salesintel.io/outreach/',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      api: {
        applicationId: 'pmYJMqmCBe2P9Ujedn51qusCo2aFLMa0xqI2W1aprJ0',
        connect: 'https://api.circleback.com/outreach/connect',
        redirectUri: 'https://app.stg.salesintel.io/outreach/',
        scopes: [
          Scopes.ACCOUNTS_ALL,
          Scopes.PROSPECTS_ALL,
          Scopes.SEQUENCES_ALL,
        ],
        token: 'https://api.circleback.com/outreach/token',
      },
      context: [
        UserContextKeys.ID,
        AccountContextKeys.ID,
        AccountContextKeys.NAME,
        AccountContextKeys.CUSTOM_ID,
        AccountContextKeys.DESCRIPTION,

        ProspectContextKeys.ID,
        ProspectContextKeys.COMPANY_LOCALITY,
        ProspectContextKeys.EMAILS,
        ProspectContextKeys.COMPANY,
      ],
      configuration: [
        {
          key: 'project',
          required: true,
          text: {
            en: 'Project name.',
          },
          type: 'string',
          urlInclude: true,
        },
        {
          key: 'startDate',
          required: true,
          text: {
            en: 'Start date',
          },
          type: 'date',
          urlInclude: true,
        },
        {
          key: 'reference',
          required: true,
          text: {
            en: 'Reference documentation',
          },
          type: 'uri',
          urlInclude: true,
        },
      ],
    });

    // Sales Intel prospect tab
    this.manifests.push({
      identifier: 'salesintel-prospect',
      version: '0.11',
      store: AddonStore.Private,
      author: {
        company: 'SalesIntel',
        websiteUrl: 'https://salesintel.io/',
        privacyUrl: 'https://salesintel.io/privacy-policy/',
        termsOfUseUrl: 'https://salesintel.io/eula/',
      },
      title: {
        en: 'SalesIntel',
      },
      description: {
        en: 'The account-based prospecting solution that gives you the power to connect with one-click.',
      },
      host: {
        icon: 'https://app.salesintel.io/favicon.ico',
        type: AddonType.ProspectTab,
        url: 'https://app.stg.salesintel.io/outreach/',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      api: {
        applicationId: 'pmYJMqmCBe2P9Ujedn51qusCo2aFLMa0xqI2W1aprJ0',
        connect: 'https://api.circleback.com/outreach/connect',
        redirectUri: 'https://app.stg.salesintel.io/outreach/',
        scopes: [
          Scopes.ACCOUNTS_ALL,
          Scopes.PROSPECTS_ALL,
          Scopes.SEQUENCES_ALL,
        ],
        token: 'https://api.circleback.com/outreach/token',
      },
      context: [
        UserContextKeys.ID,
        AccountContextKeys.ID,
        AccountContextKeys.NAME,
        AccountContextKeys.CUSTOM_ID,
        AccountContextKeys.DESCRIPTION,

        ProspectContextKeys.ID,
        ProspectContextKeys.COMPANY_LOCALITY,
        ProspectContextKeys.EMAILS,
        ProspectContextKeys.COMPANY,
      ],
      configuration: [
        {
          key: 'project',
          required: true,
          text: {
            en: 'Project name.',
          },
          type: 'string',
          urlInclude: true,
        },
        {
          key: 'startDate',
          required: true,
          text: {
            en: 'Start date',
          },
          type: 'date',
          urlInclude: true,
        },
        {
          key: 'reference',
          required: true,
          text: {
            en: 'Reference documentation',
          },
          type: 'uri',
          urlInclude: true,
        },
      ],
    });

    // SAP Ruum prospect tab
    this.manifests.push({
      identifier: 'salesintel-prospect',
      version: '0.11',
      store: AddonStore.Private,
      author: {
        company: 'SAP',
        websiteUrl: 'https://www.sap.com/',
        privacyUrl: 'https://www.sap.com/about/legal/privacy.html',
        termsOfUseUrl:
          'https://www.sap.com/corporate/en/legal/terms-of-use.html',
      },
      title: {
        en: 'SAP Ruum',
      },
      description: {
        en: 'This is a sample addon created as a test for rendering an additional tab in Outreach Prospect',
      },
      host: {
        icon: 'https://www.sap.com/content/dam/application/shared/logos/sap-logo-svg.svg',
        type: AddonType.ProspectTab,
        url: 'https://sidekickfrontend-br339jmc4c.dispatcher.int.sap.eu2.hana.ondemand.com/OutreachHostAddon_Example1.html',
      },
      categories: [
        AddonCategory.SALES_INTELLIGENCE_DATA,
        AddonCategory.SALES_PRODUCTIVITY,
      ],
      context: [
        UserContextKeys.ID,
        ProspectContextKeys.ID,
        OpportunityContextKeys.ID,
      ],
      configuration: [],
    });
  };
}

const extensionStore = new ExtensionStore();
export const ExtensionStoreContext = React.createContext(extensionStore);
export default extensionStore;
