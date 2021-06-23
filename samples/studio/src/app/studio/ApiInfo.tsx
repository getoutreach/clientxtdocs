import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Manifest, Scopes } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { EditorStoreContext } from '../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
    },
    formControlLabel: {
      width: 400,
    },
    formLabel: {
      marginBottom: theme.spacing(),
      fontWeight: 'bolder',
    },

    info: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    invalid: {
      borderLeft: 'red solid 4px',
      paddingLeft: theme.spacing(0.5),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    scopes: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(2),
    },
    textField: {
      marginBottom: theme.spacing(),
    },
  })
);

const ApiInfoEditor: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const [appId, setAppId] = useState<string>(
    editorStore.selectedManifest?.api?.applicationId || ''
  );

  const [redirectUri, setRedirectUri] = useState<string>(
    editorStore.selectedManifest?.api?.redirectUri || ''
  );

  const [tokenUrl, setTokenUrl] = useState<string>(
    editorStore.selectedManifest?.api?.token || ''
  );

  const [connectUrl, setConnectUrl] = useState<string>(
    editorStore.selectedManifest?.api?.connect || ''
  );

  return (
    <div className={classes.info}>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="text"
          label="Outreach Application ID"
          variant="outlined"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          onBlur={() => editorStore.setApiApplicationId(appId)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Outreach Redirect Uri"
          variant="outlined"
          style={{
            marginLeft: 16,
          }}
          value={redirectUri}
          onChange={(e) => setRedirectUri(e.target.value)}
          onBlur={() => editorStore.setApiRedirectUrl(redirectUri)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Token endpoint"
          placeholder="ex: https://www.contoso.com/token"
          variant="outlined"
          value={tokenUrl}
          onChange={(e) => setTokenUrl(e.target.value)}
          onBlur={() => editorStore.setApiTokenEndpoint(tokenUrl)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Connect endpoint"
          variant="outlined"
          placeholder="ex: https://www.contoso.com/connect"
          style={{
            marginLeft: 16,
          }}
          value={connectUrl}
          onChange={(e) => setConnectUrl(e.target.value)}
          onBlur={() => editorStore.setApiConnectEndpoint(tokenUrl)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
      </div>
    </div>
  );
});

interface Option {
  group: string;
  title: string;
  value: Scopes;
}

const SCOPES_DATA: Option[] = [
  {
    group: 'Account',
    title: 'Full access (accounts.all)',
    value: Scopes.ACCOUNTS_ALL,
  },
  {
    group: 'Account',
    title: 'Read access (accounts.read)',
    value: Scopes.ACCOUNTS_READ,
  },
  {
    group: 'Account',
    title: 'Write access (accounts.write)',
    value: Scopes.ACCOUNTS_WRITE,
  },
  {
    group: 'Account',
    title: 'Delete access (accounts.delete)',
    value: Scopes.ACCOUNTS_DELETE,
  },

  {
    group: 'Calls',
    title: 'Full access (calls.all)',
    value: Scopes.CALLS_ALL,
  },
  {
    group: 'Calls',
    title: 'Read access (calls.read)',
    value: Scopes.CALLS_READ,
  },
  {
    group: 'Calls',
    title: 'Write access (calls.write)',
    value: Scopes.CALLS_WRITE,
  },
  {
    group: 'Calls',
    title: 'Delete access (calls.delete)',
    value: Scopes.CALLS_DELETE,
  },

  {
    group: 'Custom duties',
    title: 'Full access (customDuties.all)',
    value: Scopes.CUSTOM_DUTIES_ALL,
  },
  {
    group: 'Custom duties',
    title: 'Read access (customDuties.read)',
    value: Scopes.CUSTOM_DUTIES_READ,
  },
  {
    group: 'Custom duties',
    title: 'Write access (customDuties.write)',
    value: Scopes.CUSTOM_DUTIES_WRITE,
  },
  {
    group: 'Custom duties',
    title: 'Delete access (customDuties.delete)',
    value: Scopes.CUSTOM_DUTIES_DELETE,
  },

  {
    group: 'Content categories',
    title: 'Full access (contentCategories.all)',
    value: Scopes.CONTENT_CATEGORIES_ALL,
  },
  {
    group: 'Content categories',
    title: 'Read access (contentCategories.read)',
    value: Scopes.CONTENT_CATEGORIES_READ,
  },
  {
    group: 'Content categories',
    title: 'Write access (contentCategories.write)',
    value: Scopes.CONTENT_CATEGORIES_WRITE,
  },
  {
    group: 'Content categories',
    title: 'Delete access (contentCategories.delete)',
    value: Scopes.CONTENT_CATEGORIES_DELETE,
  },

  {
    group: 'Content category memberships',
    title: 'Full access (contentCategoryMemberships.all)',
    value: Scopes.CONTENT_CATEGORIES_ALL,
  },
  {
    group: 'Content category memberships',
    title: 'Read access (contentCategoryMemberships.read)',
    value: Scopes.CONTENT_CATEGORIES_READ,
  },
  {
    group: 'Content category memberships',
    title: 'Write access (contentCategoryMemberships.write)',
    value: Scopes.CONTENT_CATEGORIES_WRITE,
  },
  {
    group: 'Content category memberships',
    title: 'Delete access (contentCategoryMemberships.delete)',
    value: Scopes.CONTENT_CATEGORIES_DELETE,
  },

  {
    group: 'Duties',
    title: 'Full access (duties.all)',
    value: Scopes.DUTIES_ALL,
  },
  {
    group: 'Duties',
    title: 'Read access (duties.read)',
    value: Scopes.DUTIES_READ,
  },
  {
    group: 'Duties',
    title: 'Write access (duties.write)',
    value: Scopes.DUTIES_WRITE,
  },
  {
    group: 'Duties',
    title: 'Delete access (duties.delete)',
    value: Scopes.DUTIES_DELETE,
  },

  {
    group: 'Email addresses',
    title: 'Full access (emailAddresses.all)',
    value: Scopes.EMAIL_ADDRESSES_ALL,
  },
  {
    group: 'Email addresses',
    title: 'Read access (emailAddresses.read)',
    value: Scopes.EMAIL_ADDRESSES_READ,
  },
  {
    group: 'Email addresses',
    title: 'Write access (emailAddresses.write)',
    value: Scopes.EMAIL_ADDRESSES_WRITE,
  },
  {
    group: 'Email addresses',
    title: 'Delete access (emailAddresses.delete)',
    value: Scopes.EMAIL_ADDRESSES_DELETE,
  },

  {
    group: 'Events',
    title: 'Full access (events.all)',
    value: Scopes.EVENTS_ALL,
  },
  {
    group: 'Events',
    title: 'Read access (events.read)',
    value: Scopes.EVENTS_READ,
  },
  {
    group: 'Events',
    title: 'Write access (events.write)',
    value: Scopes.EVENTS_WRITE,
  },
  {
    group: 'Events',
    title: 'Delete access (events.delete)',
    value: Scopes.EVENTS_DELETE,
  },

  {
    group: 'Favorites',
    title: 'Full access (favorites.all)',
    value: Scopes.FAVORITES_ALL,
  },
  {
    group: 'Favorites',
    title: 'Read access (favorites.read)',
    value: Scopes.FAVORITES_READ,
  },
  {
    group: 'Favorites',
    title: 'Write access (favorites.write)',
    value: Scopes.FAVORITES_WRITE,
  },
  {
    group: 'Favorites',
    title: 'Delete access (favorites.delete)',
    value: Scopes.FAVORITES_DELETE,
  },

  {
    group: 'Mail aliases',
    title: 'Full access (mailAliases.all)',
    value: Scopes.MAIL_ALIASES_ALL,
  },
  {
    group: 'Mail aliases',
    title: 'Read access (mailAliases.read)',
    value: Scopes.MAIL_ALIASES_READ,
  },

  {
    group: 'Mailboxes',
    title: 'Full access (mailboxes.all)',
    value: Scopes.MAILBOXES_ALL,
  },
  {
    group: 'Mailboxes',
    title: 'Read access (mailboxes.read)',
    value: Scopes.MAILBOXES_READ,
  },
  {
    group: 'Mailboxes',
    title: 'Write access (mailboxes.write)',
    value: Scopes.MAILBOXES_WRITE,
  },
  {
    group: 'Mailboxes',
    title: 'Delete access (mailboxes.delete)',
    value: Scopes.MAILBOXES_DELETE,
  },

  {
    group: 'Mailings',
    title: 'Read access (mailings.read)',
    value: Scopes.MAILINGS_READ,
  },
  {
    group: 'Mailings',
    title: 'Write access (mailings.write)',
    value: Scopes.MAILINGS_WRITE,
  },
  {
    group: 'Mailings',
    title: 'Delete access (mailings.delete)',
    value: Scopes.MAILINGS_DELETE,
  },

  {
    group: 'Opportunities',
    title: 'Full access (opportunities.all)',
    value: Scopes.OPPORTUNITIES_ALL,
  },
  {
    group: 'Opportunities',
    title: 'Read access (opportunities.read)',
    value: Scopes.OPPORTUNITIES_READ,
  },
  {
    group: 'Opportunities',
    title: 'Write access (opportunities.write)',
    value: Scopes.OPPORTUNITIES_WRITE,
  },
  {
    group: 'Opportunities',
    title: 'Delete access (opportunities.delete)',
    value: Scopes.OPPORTUNITIES_DELETE,
  },

  {
    group: 'Opportunity prospect roles',
    title: 'Full access (opportunityProspectRoles.all)',
    value: Scopes.OPPORTUNITY_PROSPECT_ROLES_ALL,
  },
  {
    group: 'Opportunity prospect roles',
    title: 'Read access (opportunityProspectRoles.read)',
    value: Scopes.OPPORTUNITY_PROSPECT_ROLES_READ,
  },
  {
    group: 'Opportunity prospect roles',
    title: 'Write access (opportunityProspectRoles.write)',
    value: Scopes.OPPORTUNITY_PROSPECT_ROLES_WRITE,
  },
  {
    group: 'Opportunity prospect roles',
    title: 'Delete access (opportunityProspectRoles.delete)',
    value: Scopes.OPPORTUNITY_PROSPECT_ROLES_DELETE,
  },

  {
    group: 'Opportunity stages',
    title: 'Full access (opportunityStages.all)',
    value: Scopes.OPPORTUNITY_STAGES_ALL,
  },
  {
    group: 'Opportunity stages',
    title: 'Read access (opportunityStages.read)',
    value: Scopes.OPPORTUNITY_STAGES_READ,
  },
  {
    group: 'Opportunity stages',
    title: 'Write access (opportunityStages.write)',
    value: Scopes.OPPORTUNITY_STAGES_WRITE,
  },
  {
    group: 'Opportunity stages',
    title: 'Delete access (opportunityStages.delete)',
    value: Scopes.OPPORTUNITY_STAGES_DELETE,
  },

  {
    group: 'Personas',
    title: 'Full access (personas.all)',
    value: Scopes.PERSONAS_ALL,
  },
  {
    group: 'Personas',
    title: 'Read access (personas.read)',
    value: Scopes.PERSONAS_READ,
  },
  {
    group: 'Personas',
    title: 'Write access (personas.write)',
    value: Scopes.PERSONAS_WRITE,
  },
  {
    group: 'Personas',
    title: 'Delete access (personas.delete)',
    value: Scopes.PERSONAS_DELETE,
  },

  {
    group: 'Phone numbers',
    title: 'Full access (phoneNumbers.all)',
    value: Scopes.PHONE_NUMBERS_ALL,
  },
  {
    group: 'Phone numbers',
    title: 'Read access (phoneNumbers.read)',
    value: Scopes.PHONE_NUMBERS_READ,
  },
  {
    group: 'Phone numbers',
    title: 'Write access (phoneNumbers.write)',
    value: Scopes.PHONE_NUMBERS_WRITE,
  },
  {
    group: 'Phone numbers',
    title: 'Delete access (phoneNumbers.delete)',
    value: Scopes.PHONE_NUMBERS_DELETE,
  },

  {
    group: 'Profiles',
    title: 'Full access (profiles.all)',
    value: Scopes.PHONE_NUMBERS_ALL,
  },
  {
    group: 'Profiles',
    title: 'Read access (profiles.read)',
    value: Scopes.PHONE_NUMBERS_READ,
  },
  {
    group: 'Profiles',
    title: 'Write access (profiles.write)',
    value: Scopes.PHONE_NUMBERS_WRITE,
  },
  {
    group: 'Profiles',
    title: 'Delete access (profiles.delete)',
    value: Scopes.PHONE_NUMBERS_DELETE,
  },

  {
    group: 'Prospects',
    title: 'Full access (prospects.all)',
    value: Scopes.PROSPECTS_ALL,
  },
  {
    group: 'Prospects',
    title: 'Read access (prospects.read)',
    value: Scopes.PROSPECTS_READ,
  },
  {
    group: 'Prospects',
    title: 'Write access (prospects.write)',
    value: Scopes.PROSPECTS_WRITE,
  },
  {
    group: 'Prospects',
    title: 'Delete access (prospects.delete)',
    value: Scopes.PROSPECTS_DELETE,
  },

  {
    group: 'Resources',
    title: 'Full access (resources.all)',
    value: Scopes.PROSPECTS_ALL,
  },

  {
    group: 'Roles',
    title: 'Full access (roles.all)',
    value: Scopes.ROLES_ALL,
  },
  {
    group: 'Roles',
    title: 'Read access (roles.read)',
    value: Scopes.ROLES_READ,
  },
  {
    group: 'Roles',
    title: 'Write access (roles.write)',
    value: Scopes.ROLES_WRITE,
  },
  {
    group: 'Roles',
    title: 'Delete access (roles.delete)',
    value: Scopes.ROLES_DELETE,
  },

  {
    group: 'Rulesets',
    title: 'Full access (rulesets.all)',
    value: Scopes.RULESETS_ALL,
  },
  {
    group: 'Rulesets',
    title: 'Read access (rulesets.read)',
    value: Scopes.RULESETS_READ,
  },
  {
    group: 'Rulesets',
    title: 'Write access (rulesets.write)',
    value: Scopes.RULESETS_WRITE,
  },
  {
    group: 'Rulesets',
    title: 'Delete access (rulesets.delete)',
    value: Scopes.RULESETS_DELETE,
  },

  {
    group: 'Sequence states',
    title: 'Full access (sequenceStates.all)',
    value: Scopes.SEQUENCE_STATES_ALL,
  },
  {
    group: 'Sequence states',
    title: 'Read access (sequenceStates.read)',
    value: Scopes.SEQUENCE_STATES_READ,
  },
  {
    group: 'Sequence states',
    title: 'Write access (sequenceStates.write)',
    value: Scopes.SEQUENCE_STATES_WRITE,
  },
  {
    group: 'Sequence states',
    title: 'Delete access (sequenceStates.delete)',
    value: Scopes.SEQUENCE_STATES_DELETE,
  },

  {
    group: 'Sequence steps',
    title: 'Full access (sequenceSteps.all)',
    value: Scopes.SEQUENCE_STEPS_ALL,
  },
  {
    group: 'Sequence steps',
    title: 'Read access (sequenceSteps.read)',
    value: Scopes.SEQUENCE_STEPS_READ,
  },
  {
    group: 'Sequence steps',
    title: 'Write access (sequenceSteps.write)',
    value: Scopes.SEQUENCE_STEPS_WRITE,
  },
  {
    group: 'Sequence steps',
    title: 'Delete access (sequenceSteps.delete)',
    value: Scopes.SEQUENCE_STEPS_DELETE,
  },

  {
    group: 'Sequence templates',
    title: 'Full access (sequenceTemplates.all)',
    value: Scopes.SEQUENCE_TEMPLATES_ALL,
  },
  {
    group: 'Sequence templates',
    title: 'Read access (sequenceTemplates.read)',
    value: Scopes.SEQUENCE_TEMPLATES_READ,
  },
  {
    group: 'Sequence templates',
    title: 'Write access (sequenceTemplates.write)',
    value: Scopes.SEQUENCE_TEMPLATES_WRITE,
  },
  {
    group: 'Sequence templates',
    title: 'Delete access (sequenceTemplates.delete)',
    value: Scopes.SEQUENCE_TEMPLATES_DELETE,
  },

  {
    group: 'Sequences',
    title: 'Full access (sequences.all)',
    value: Scopes.SEQUENCES_ALL,
  },
  {
    group: 'Sequences',
    title: 'Read access (sequences.read)',
    value: Scopes.SEQUENCES_READ,
  },
  {
    group: 'Sequences',
    title: 'Write access (sequences.write)',
    value: Scopes.SEQUENCES_WRITE,
  },
  {
    group: 'Sequences',
    title: 'Delete access (sequences.delete)',
    value: Scopes.SEQUENCES_DELETE,
  },

  {
    group: 'Snippets',
    title: 'Full access (snippets.all)',
    value: Scopes.SNIPPETS_ALL,
  },
  {
    group: 'Snippets',
    title: 'Read access (snippets.read)',
    value: Scopes.SNIPPETS_READ,
  },
  {
    group: 'Snippets',
    title: 'Write access (snippets.write)',
    value: Scopes.SNIPPETS_WRITE,
  },
  {
    group: 'Snippets',
    title: 'Delete access (snippets.delete)',
    value: Scopes.SNIPPETS_DELETE,
  },

  {
    group: 'Stages',
    title: 'Full access (stages.all)',
    value: Scopes.STAGES_ALL,
  },
  {
    group: 'Stages',
    title: 'Read access (stages.read)',
    value: Scopes.STAGES_READ,
  },
  {
    group: 'Stages',
    title: 'Write access (stages.write)',
    value: Scopes.STAGES_WRITE,
  },
  {
    group: 'Stages',
    title: 'Delete access (stages.delete)',
    value: Scopes.STAGES_DELETE,
  },

  {
    group: 'Task priorities',
    title: 'Full access (taskPriorities.all)',
    value: Scopes.TASK_PRIORITIES_ALL,
  },
  {
    group: 'Task priorities',
    title: 'Read access (taskPriorities.read)',
    value: Scopes.TASK_PRIORITIES_READ,
  },
  {
    group: 'Task priorities',
    title: 'Write access (taskPriorities.write)',
    value: Scopes.TASK_PRIORITIES_WRITE,
  },
  {
    group: 'Task priorities',
    title: 'Delete access (taskPriorities.delete)',
    value: Scopes.TASK_PRIORITIES_DELETE,
  },

  {
    group: 'Tasks',
    title: 'Full access (tasks.all)',
    value: Scopes.TASKS_ALL,
  },
  {
    group: 'Tasks',
    title: 'Read access (tasks.read)',
    value: Scopes.TASKS_READ,
  },
  {
    group: 'Tasks',
    title: 'Write access (tasks.write)',
    value: Scopes.TASKS_WRITE,
  },
  {
    group: 'Tasks',
    title: 'Delete access (tasks.delete)',
    value: Scopes.TASKS_DELETE,
  },

  {
    group: 'Teams',
    title: 'Full access (teams.all)',
    value: Scopes.TEAMS_ALL,
  },
  {
    group: 'Teams',
    title: 'Read access (teams.read)',
    value: Scopes.TEAMS_READ,
  },
  {
    group: 'Teams',
    title: 'Write access (teams.write)',
    value: Scopes.TEAMS_WRITE,
  },
  {
    group: 'Teams',
    title: 'Delete access (teams.delete)',
    value: Scopes.TEAMS_DELETE,
  },

  {
    group: 'Templates',
    title: 'Full access (templates.all)',
    value: Scopes.TEMPLATES_ALL,
  },
  {
    group: 'Templates',
    title: 'Read access (templates.read)',
    value: Scopes.TEMPLATES_READ,
  },
  {
    group: 'Templates',
    title: 'Write access (templates.write)',
    value: Scopes.TEMPLATES_WRITE,
  },
  {
    group: 'Templates',
    title: 'Delete access (templates.delete)',
    value: Scopes.TEMPLATES_DELETE,
  },

  {
    group: 'Users',
    title: 'Full access (users.all)',
    value: Scopes.USERS_ALL,
  },
  {
    group: 'Users',
    title: 'Read access (users.read)',
    value: Scopes.USERS_READ,
  },
  {
    group: 'Users',
    title: 'Write access (users.write)',
    value: Scopes.USERS_WRITE,
  },
  {
    group: 'Users',
    title: 'Delete access (users.delete)',
    value: Scopes.USERS_DELETE,
  },

  {
    group: 'Webhooks',
    title: 'Full access (webhooks.all)',
    value: Scopes.WEBHOOKS_ALL,
  },
  {
    group: 'Webhooks',
    title: 'Read access (webhooks.read)',
    value: Scopes.WEBHOOKS_READ,
  },
  {
    group: 'Webhooks',
    title: 'Write access (webhooks.write)',
    value: Scopes.WEBHOOKS_WRITE,
  },
  {
    group: 'Webhooks',
    title: 'Delete access (webhooks.delete)',
    value: Scopes.WEBHOOKS_DELETE,
  },
];

const getSelectedScopes = (scopes?: Scopes[]): Option[] => {
  if (!scopes) {
    return [];
  }
  return scopes
    .map((scope) => SCOPES_DATA.find((p) => p.value === scope))
    .filter((p) => p) as Option[];
};

const ScopesEditor: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);
  const [scopes, setScopes] = useState<Option[]>([]);

  useEffect(() => {
    const selectedOptions = getSelectedScopes(
      editorStore.selectedManifest?.api?.scopes
    );

    setScopes(selectedOptions);
  }, [editorStore.selectedManifest?.api?.scopes]);

  const handleChange = (scopes: Scopes[]) => {
    scopes = JSON.parse(JSON.stringify(scopes));

    const manifest = JSON.parse(
      JSON.stringify({
        ...editorStore.selectedManifest!,
      })
    );
    manifest.api = manifest.api || {
      scopes: [],
      applicationId: '',
      connect: '',
      redirectUri: '',
      token: '',
    };
    manifest.api!.scopes = scopes;

    editorStore.addOrUpdateManifest(manifest);
  };

  const selectedApiCount = () => {
    return editorStore.selectedManifest!.api?.scopes.length || 0;
  };

  const headingClass = selectedApiCount() === 0 ? classes.invalid : '';

  return (
    <div className={classes.scopes}>
      <Typography variant="h6" className={headingClass}>
        API Scopes ({selectedApiCount()})
      </Typography>
      <Typography variant="caption" style={{ marginBottom: 8 }}>
        Define one or more Outreach API scopes which your application will need.
        To learn more click
        <Link
          href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/scopes.md"
          target="_blank"
        >
          here
        </Link>
      </Typography>

      <Autocomplete
        multiple={true}
        ChipProps={{
          color: 'primary',
        }}
        id="oauth-scopes"
        options={SCOPES_DATA}
        value={scopes}
        groupBy={(opt) => opt.group}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            id="categories-editor"
            variant="outlined"
            className={classes.textField}
            label="Marketplace category"
            placeholder="Please select one or more categories"
          />
        )}
        onChange={(_: any, options: Option[]) => {
          setScopes(options);
          const scopes = options.map((p) => p.value);
          handleChange(scopes);
        }}
      />
    </div>
  );
});

const ApiInfo: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const [useApi, setUseApi] = useState<boolean>(
    !!editorStore.selectedManifest?.api
  );

  return (
    <div className={classes.root}>
      <Typography variant="h6">API info (optional)</Typography>
      <Typography variant="body2" style={{ marginBottom: 8 }}>
        Outreach Application ID and redirect uri are values created by Outreach.
        To learn more read{' '}
        <Link
          href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/outreach-api.md#setup-outreach-oauth-application"
          target="_blank"
        >
          here
        </Link>
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Does your extension need OAuth access to Outreach API?
        </FormLabel>
        <RadioGroup
          aria-label="Outreach API access"
          name="outreachApiAccess"
          value={useApi}
          onChange={(e) => {
            const apiUsageNeeded = e.target.value === 'true';
            setUseApi(apiUsageNeeded);
            if (!apiUsageNeeded) {
              const manifest = JSON.parse(
                JSON.stringify({
                  ...editorStore.selectedManifest,
                })
              ) as Manifest;

              delete manifest.api;
              editorStore.addOrUpdateManifest(manifest);
            }
          }}
        >
          <FormControlLabel
            value={true}
            control={<Radio />}
            label="Yes, it needs OAuth API Access"
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="No, API access is not needed"
          />
        </RadioGroup>
      </FormControl>
      {useApi && (
        <>
          <ApiInfoEditor />
          <ScopesEditor />
        </>
      )}
    </div>
  );
});

export default ApiInfo;
