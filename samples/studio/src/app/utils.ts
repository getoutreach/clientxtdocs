import {
    Scopes,
    AllContextKeys,
    ProspectContextKeys,
    OpportunityContextKeys,
    AccountContextKeys,
    UserContextKeys,
} from '@outreach/client-addon-sdk';

export const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

interface ContextInfo {
    text: string;
    type: 'usr' | 'acc' | 'pro' | 'opp' | null;
}

interface ScopeInfo {
    text: string;
}

export const getScopeInfo = (scope: Scopes): ScopeInfo => {
    switch (scope) {
        case Scopes.ACCOUNTS_ALL:
            return { text: 'Accounts full access' };
        case Scopes.ACCOUNTS_DELETE:
            return { text: 'Accounts delete access' };
        case Scopes.ACCOUNTS_WRITE:
            return { text: 'Accounts write access' };
        case Scopes.ACCOUNTS_READ:
            return { text: 'Accounts read/only access' };
        case Scopes.CALLS_ALL:
            return { text: 'Calls full access' };
        case Scopes.CALLS_DELETE:
            return { text: 'Calls delete access' };
        case Scopes.CALLS_WRITE:
            return { text: 'Calls write access' };
        case Scopes.CALLS_READ:
            return { text: 'Calls read/only access' };
        case Scopes.CALL_DISPOSITIONS_ALL:
            return { text: 'Call dispositions full access' };
        case Scopes.CALL_DISPOSITIONS_DELETE:
            return { text: 'Call dispositions delete access' };
        case Scopes.CALL_DISPOSITIONS_WRITE:
            return { text: 'Call dispositions write access' };
        case Scopes.CALL_DISPOSITIONS_READ:
            return { text: 'Call dispositions read/only access' };
        case Scopes.CALL_PURPOSES_ALL:
            return { text: 'Call purposes full access' };
        case Scopes.CALL_PURPOSES_DELETE:
            return { text: 'Call purposes delete access' };
        case Scopes.CALL_PURPOSES_WRITE:
            return { text: 'Call purposes write access' };
        case Scopes.CALL_PURPOSES_READ:
            return { text: 'Call purposes read/only access' };
        case Scopes.CONTENT_CATEGORIES_ALL:
            return { text: 'Content categories full access' };
        case Scopes.CONTENT_CATEGORIES_DELETE:
            return { text: 'Content categories delete access' };
        case Scopes.CONTENT_CATEGORIES_WRITE:
            return { text: 'Content categories write access' };
        case Scopes.CONTENT_CATEGORIES_READ:
            return { text: 'Content categories read-only access' };
        case Scopes.CONTENT_CATEGORY_MEMBERSHIPS_ALL:
            return { text: 'Content category memberships full access' };
        case Scopes.CONTENT_CATEGORY_MEMBERSHIPS_DELETE:
            return { text: 'Content category memberships delete access' };
        case Scopes.CONTENT_CATEGORY_MEMBERSHIPS_WRITE:
            return { text: 'Content category memberships write access' };
        case Scopes.CONTENT_CATEGORY_MEMBERSHIPS_READ:
            return { text: 'Content category memberships read-only access' };
        case Scopes.CUSTOM_DUTIES_ALL:
            return { text: 'Custom duties full access' };
        case Scopes.CUSTOM_DUTIES_DELETE:
            return { text: 'Custom duties delete access' };
        case Scopes.CUSTOM_DUTIES_WRITE:
            return { text: 'Custom duties write access' };
        case Scopes.CUSTOM_DUTIES_READ:
            return { text: 'Custom duties read-only access' };
        case Scopes.DUTIES_ALL:
            return { text: 'Duties full access' };
        case Scopes.DUTIES_DELETE:
            return { text: 'Duties delete access' };
        case Scopes.DUTIES_WRITE:
            return { text: 'Duties write access' };
        case Scopes.DUTIES_READ:
            return { text: 'Duties read-only access' };
        case Scopes.EMAIL_ADDRESSES_ALL:
            return { text: 'Email addresses full access' };
        case Scopes.EMAIL_ADDRESSES_DELETE:
            return { text: 'Email addresses delete access' };
        case Scopes.EMAIL_ADDRESSES_WRITE:
            return { text: 'Email addresses write access' };
        case Scopes.EMAIL_ADDRESSES_READ:
            return { text: 'Email addresses read-only access' };
        case Scopes.EVENTS_ALL:
            return { text: 'Events full access' };
        case Scopes.EVENTS_DELETE:
            return { text: 'Events delete access' };
        case Scopes.EVENTS_WRITE:
            return { text: 'Events write access' };
        case Scopes.EVENTS_READ:
            return { text: 'Events read-only access' };
        case Scopes.FAVORITES_ALL:
            return { text: 'Favorites full access' };
        case Scopes.FAVORITES_DELETE:
            return { text: 'Favorites delete access' };
        case Scopes.FAVORITES_WRITE:
            return { text: 'Favorites write access' };
        case Scopes.FAVORITES_READ:
            return { text: 'Favorites read-only access' };
        case Scopes.MAILBOXES_ALL:
            return { text: 'Mailboxes full access' };
        case Scopes.MAILBOXES_DELETE:
            return { text: 'Mailboxes delete access' };
        case Scopes.MAILBOXES_WRITE:
            return { text: 'Mailboxes write access' };
        case Scopes.MAILBOXES_READ:
            return { text: 'Mailboxes read-only access' };
        case Scopes.MAILINGS_DELETE:
            return { text: 'Mailings delete access' };
        case Scopes.MAILINGS_WRITE:
            return { text: 'Mailings write access' };
        case Scopes.MAILINGS_READ:
            return { text: 'Mailings read-only access' };
        case Scopes.MAIL_ALIASES_ALL:
            return { text: 'Mail aliases full access' };
        case Scopes.MAIL_ALIASES_READ:
            return { text: 'Mail aliases read-only access' };
        case Scopes.OPPORTUNITIES_ALL:
            return { text: 'Opportunities full access' };
        case Scopes.OPPORTUNITIES_DELETE:
            return { text: 'Opportunities delete access' };
        case Scopes.OPPORTUNITIES_WRITE:
            return { text: 'Opportunities write access' };
        case Scopes.OPPORTUNITIES_READ:
            return { text: 'Opportunities read-only access' };
        case Scopes.OPPORTUNITY_PROSPECT_ROLES_ALL:
            return { text: 'Opportunity prospect roles full access' };
        case Scopes.OPPORTUNITY_PROSPECT_ROLES_DELETE:
            return { text: 'Opportunity prospect roles delete access' };
        case Scopes.OPPORTUNITY_PROSPECT_ROLES_WRITE:
            return { text: 'Opportunity prospect roles write access' };
        case Scopes.OPPORTUNITY_PROSPECT_ROLES_READ:
            return { text: 'Opportunity prospect roles read-only access' };
        case Scopes.OPPORTUNITY_STAGES_ALL:
            return { text: 'Opportunity stages full access' };
        case Scopes.OPPORTUNITY_STAGES_DELETE:
            return { text: 'Opportunity stages delete access' };
        case Scopes.OPPORTUNITY_STAGES_WRITE:
            return { text: 'Opportunity stages write access' };
        case Scopes.OPPORTUNITY_STAGES_READ:
            return { text: 'Opportunity stages read-only access' };
        case Scopes.PERSONAS_ALL:
            return { text: 'Personas full access' };
        case Scopes.PERSONAS_DELETE:
            return { text: 'Personas delete access' };
        case Scopes.PERSONAS_WRITE:
            return { text: 'Personas write access' };
        case Scopes.PERSONAS_READ:
            return { text: 'Personas read-only access' };
        case Scopes.PHONE_NUMBERS_ALL:
            return { text: 'Phone numbers full access' };
        case Scopes.PHONE_NUMBERS_DELETE:
            return { text: 'Phone numbers delete access' };
        case Scopes.PHONE_NUMBERS_WRITE:
            return { text: 'Phone numbers write access' };
        case Scopes.PHONE_NUMBERS_READ:
            return { text: 'Phone numbers read-only access' };
        case Scopes.PROFILES_ALL:
            return { text: 'Profiles full access' };
        case Scopes.PROFILES_DELETE:
            return { text: 'Profiles delete access' };
        case Scopes.PROFILES_WRITE:
            return { text: 'Profiles write access' };
        case Scopes.PROFILES_READ:
            return { text: 'Profiles read-only access' };
        case Scopes.PROSPECTS_ALL:
            return { text: 'Prospects full access' };
        case Scopes.PROSPECTS_DELETE:
            return { text: 'Prospects delete access' };
        case Scopes.PROSPECTS_WRITE:
            return { text: 'Prospects write access' };
        case Scopes.PROSPECTS_READ:
            return { text: 'Prospects read-only access' };
        case Scopes.ROLES_ALL:
            return { text: 'Roles full access' };
        case Scopes.ROLES_DELETE:
            return { text: 'Roles delete access' };
        case Scopes.ROLES_WRITE:
            return { text: 'Roles write access' };
        case Scopes.ROLES_READ:
            return { text: 'Roles read-only access' };
        case Scopes.RULESETS_ALL:
            return { text: 'Rulesets full access' };
        case Scopes.RULESETS_DELETE:
            return { text: 'Rulesets delete access' };
        case Scopes.RULESETS_WRITE:
            return { text: 'Rulesets write access' };
        case Scopes.RULESETS_READ:
            return { text: 'Rulesets read-only access' };
        case Scopes.SEQUENCES_ALL:
            return { text: 'Sequences full access' };
        case Scopes.SEQUENCES_DELETE:
            return { text: 'Sequences delete access' };
        case Scopes.SEQUENCES_WRITE:
            return { text: 'Sequences write access' };
        case Scopes.SEQUENCES_READ:
            return { text: 'Sequences read-only access' };
        case Scopes.SEQUENCE_STATES_ALL:
            return { text: 'Sequence states full access' };
        case Scopes.SEQUENCE_STATES_DELETE:
            return { text: 'Sequence states delete access' };
        case Scopes.SEQUENCE_STATES_WRITE:
            return { text: 'Sequence states write access' };
        case Scopes.SEQUENCE_STATES_READ:
            return { text: 'Sequence states read-only access' };
        case Scopes.SEQUENCE_STEPS_ALL:
            return { text: 'Sequence steps full access' };
        case Scopes.SEQUENCE_STEPS_DELETE:
            return { text: 'Sequence steps delete access' };
        case Scopes.SEQUENCE_STEPS_WRITE:
            return { text: 'Sequence steps write access' };
        case Scopes.SEQUENCE_STEPS_READ:
            return { text: 'Sequence steps read-only access' };
        case Scopes.SEQUENCE_TEMPLATES_ALL:
            return { text: 'Sequence templates full access' };
        case Scopes.SEQUENCE_TEMPLATES_DELETE:
            return { text: 'Sequence templates delete access' };
        case Scopes.SEQUENCE_TEMPLATES_WRITE:
            return { text: 'Sequence templates write access' };
        case Scopes.SEQUENCE_TEMPLATES_READ:
            return { text: 'Sequence templates read-only access' };
        case Scopes.SNIPPETS_ALL:
            return { text: 'Snippets full access' };
        case Scopes.SNIPPETS_DELETE:
            return { text: 'Snippets delete access' };
        case Scopes.SNIPPETS_WRITE:
            return { text: 'Snippets write access' };
        case Scopes.SNIPPETS_READ:
            return { text: 'Snippets read-only access' };
        case Scopes.STAGES_ALL:
            return { text: 'Stages full access' };
        case Scopes.STAGES_DELETE:
            return { text: 'Stages delete access' };
        case Scopes.STAGES_WRITE:
            return { text: 'Stages write access' };
        case Scopes.STAGES_READ:
            return { text: 'Stages read-only access' };
        case Scopes.TASKS_ALL:
            return { text: 'Tasks full access' };
        case Scopes.TASKS_DELETE:
            return { text: 'Tasks delete access' };
        case Scopes.TASKS_WRITE:
            return { text: 'Tasks write access' };
        case Scopes.TASKS_READ:
            return { text: 'Tasks read-only access' };
        case Scopes.TASK_PRIORITIES_ALL:
            return { text: 'Task priorities full access' };
        case Scopes.TASK_PRIORITIES_DELETE:
            return { text: 'Task priorities delete access' };
        case Scopes.TASK_PRIORITIES_WRITE:
            return { text: 'Task priorities write access' };
        case Scopes.TASK_PRIORITIES_READ:
            return { text: 'Task priorities read-only access' };
        case Scopes.TEAMS_ALL:
            return { text: 'Teams full access' };
        case Scopes.TEAMS_DELETE:
            return { text: 'Teams delete access' };
        case Scopes.TEAMS_WRITE:
            return { text: 'Teams write access' };
        case Scopes.TEAMS_READ:
            return { text: 'Teams read-only access' };
        case Scopes.TEMPLATES_ALL:
            return { text: 'Templates full access' };
        case Scopes.TEMPLATES_DELETE:
            return { text: 'Templates delete access' };
        case Scopes.TEMPLATES_WRITE:
            return { text: 'Templates write access' };
        case Scopes.TEMPLATES_READ:
            return { text: 'Templates read-only access' };
        case Scopes.USERS_ALL:
            return { text: 'Users full access' };
        case Scopes.USERS_DELETE:
            return { text: 'Users delete access' };
        case Scopes.USERS_WRITE:
            return { text: 'Users write access' };
        case Scopes.USERS_READ:
            return { text: 'Users read-only access' };
        case Scopes.WEBHOOKS_ALL:
            return { text: 'Webhooks full access' };
        case Scopes.WEBHOOKS_DELETE:
            return { text: 'Webhooks delete access' };
        case Scopes.WEBHOOKS_WRITE:
            return { text: 'Webhooks write access' };
        case Scopes.WEBHOOKS_READ:
            return { text: 'Webhooks read-only access' };
        default:
            return { text: scope };
    }
};

export const getContextInfo = (key: AllContextKeys): ContextInfo => {
    let result =
        getUserContextInfo(key) ||
        getAccountContextInfo(key) ||
        getOpportunityContextInfo(key) ||
        getProspectContextInfo(key);

    if (!result) {
        result = {
            text: key,
            type: null,
        };
    }

    return result;
};

const getProspectContextInfo = (key: AllContextKeys): ContextInfo | null => {
    switch (key) {
        case ProspectContextKeys.AVAILABLE_AT:
            return {
                text: 'Prospect available at',
                type: 'pro',
            };
        case ProspectContextKeys.COMPANY:
            return {
                text: 'Prospect company',
                type: 'pro',
            };
        case ProspectContextKeys.COMPANY_LOCALITY:
            return {
                text: 'Prospect company locality',
                type: 'pro',
            };
        case ProspectContextKeys.EMAILS:
            return {
                text: 'Prospect emails',
                type: 'pro',
            };
        case ProspectContextKeys.EXTERNAL:
            return {
                text: 'Prospect external info',
                type: 'pro',
            };
        case ProspectContextKeys.ID:
            return {
                text: 'Prospect identifier',
                type: 'pro',
            };
        case ProspectContextKeys.TAGS:
            return {
                text: 'Prospect tags',
                type: 'pro',
            };
        case ProspectContextKeys.TIMEZONE:
            return {
                text: 'Prospect timezone',
                type: 'pro',
            };
        case ProspectContextKeys.TITLE:
            return {
                text: 'Prospect title',
                type: 'pro',
            };
    }

    var match = /pro\.csf\d{1,3}/.exec(key);
    if (match) {
        return {
            text: `Prospect custom field ${match[1]}`,
            type: 'pro',
        };
    }

    return null;
};

const getOpportunityContextInfo = (key: AllContextKeys): ContextInfo | null => {
    switch (key) {
        case OpportunityContextKeys.AMOUNT:
            return {
                text: 'Opportunity amount',
                type: 'opp',
            };
        case OpportunityContextKeys.DESCRIPTION:
            return {
                text: 'Opportunity description',
                type: 'opp',
            };
        case OpportunityContextKeys.EXTERNAL:
            return {
                text: 'Opportunity external info',
                type: 'opp',
            };
        case OpportunityContextKeys.EXTERNAL_CREATED_AT:
            return {
                text: 'Opportunity created at (external)',
                type: 'opp',
            };
        case OpportunityContextKeys.ID:
            return {
                text: 'Opportunity identifier',
                type: 'opp',
            };
        case OpportunityContextKeys.NAME:
            return {
                text: 'Opportunity name',
                type: 'opp',
            };
        case OpportunityContextKeys.NEXT_STEP:
            return {
                text: 'Opportunity next step',
                type: 'opp',
            };
        case OpportunityContextKeys.PROBABILITY:
            return {
                text: 'Opportunity probability',
                type: 'opp',
            };
        case OpportunityContextKeys.TAGS:
            return {
                text: 'Opportunity tags',
                type: 'opp',
            };
        case OpportunityContextKeys.TYPE:
            return {
                text: 'Opportunity type',
                type: 'opp',
            };
    }

    var match = /opp\.csf\d{1,3}/.exec(key);
    if (match) {
        return {
            text: `Opportunity custom field ${match[1]}`,
            type: 'opp',
        };
    }

    return null;
};

const getAccountContextInfo = (key: AllContextKeys): ContextInfo | null => {
    switch (key) {
        case AccountContextKeys.CUSTOM_ID:
            return {
                text: 'Account custom id',
                type: 'acc',
            };
        case AccountContextKeys.DESCRIPTION:
            return {
                text: 'Account description',
                type: 'acc',
            };
        case AccountContextKeys.EXTERNAL:
            return {
                text: 'Account external information',
                type: 'acc',
            };
        case AccountContextKeys.ID:
            return {
                text: 'Account identifier',
                type: 'acc',
            };
        case AccountContextKeys.LOCALITY:
            return {
                text: 'Account locality',
                type: 'acc',
            };
        case AccountContextKeys.NAME:
            return {
                text: 'Account name',
                type: 'acc',
            };
        case AccountContextKeys.TAGS:
            return {
                text: 'Account tags',
                type: 'acc',
            };
    }

    var match = /acc\.csf\d{1,3}/.exec(key);
    if (match) {
        return {
            text: `Account custom field ${match[1]}`,
            type: 'acc',
        };
    }

    return null;
};

const getUserContextInfo = (key: AllContextKeys): ContextInfo | null => {
    switch (key) {
        case UserContextKeys.ID:
            return {
                text: 'User identifier',
                type: 'usr',
            };
        case UserContextKeys.CUSTOM_FIELD_1:
            return {
                text: 'User custom field 1',
                type: 'usr',
            };
        case UserContextKeys.CUSTOM_FIELD_2:
            return {
                text: 'User custom field 2',
                type: 'usr',
            };
        case UserContextKeys.CUSTOM_FIELD_3:
            return {
                text: 'User custom field 3',
                type: 'usr',
            };
        case UserContextKeys.CUSTOM_FIELD_4:
            return {
                text: 'User custom field 4',
                type: 'usr',
            };
        case UserContextKeys.CUSTOM_FIELD_5:
            return {
                text: 'User custom field 5',
                type: 'usr',
            };
        case UserContextKeys.EMAIL:
            return {
                text: 'User email',
                type: 'usr',
            };
        case UserContextKeys.FIRST_NAME:
            return {
                text: 'User first name',
                type: 'usr',
            };
        case UserContextKeys.LAST_NAME:
            return {
                text: 'User last name',
                type: 'usr',
            };
        case UserContextKeys.TITLE:
            return {
                text: 'User title',
                type: 'usr',
            };
        case UserContextKeys.USERNAME:
            return {
                text: 'User name',
                type: 'usr',
            };
        default:
            return null;
    }
};
