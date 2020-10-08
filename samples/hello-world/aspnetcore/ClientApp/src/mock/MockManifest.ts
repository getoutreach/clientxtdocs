const mock = {
  store: 'personal',
  host: {
    icon: 'https://cxt-demo.azurewebsites.net/favicon.png',
    type: 'tab-opportunity',
    url: 'https://cxt-demo.azurewebsites.net/addon',
  },
  identifier: 'opportunity-tab-hello',
  author: {
    privacyUrl: 'https://someurl.com/privacy',
    termsOfUseUrl: 'https://someurl.com/tos',
    websiteUrl: 'https://someurl.com/',
  },
  context: ['usr.id', 'usr.fname', 'usr.lname', 'opp.id', 'opp.name'],
  version: '0.10',
  title: {
    en: 'Hello world (opportunity addon)',
  },
  api: {
    scopes: ['users.read', 'opportunities.read'],
    token: 'https://cxt-demo.azurewebsites.net/token',
  },
  description: {
    en: 'Hello world addon for Outreach opportunity',
  },
};

export default mock;
