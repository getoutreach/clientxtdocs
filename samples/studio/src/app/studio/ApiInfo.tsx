import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Manifest, Scopes } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
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

const ScopesEditor: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const scope = event.target.value as Scopes;
    let scopes = [...(editorStore.selectedManifest!.api?.scopes || [])];
    scopes = JSON.parse(JSON.stringify(scopes));

    const selectedIndex = scopes.findIndex((p) => p === scope);
    if (selectedIndex === -1) {
      scopes.push(scope);
    } else {
      scopes.splice(selectedIndex, 1);
    }

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

  const isChecked = (scope: Scopes) => {
    if (!editorStore.selectedManifest?.api) {
      return false;
    }

    return (
      editorStore.selectedManifest.api.scopes.findIndex((p) => p === scope) > -1
    );
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

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Account access
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ACCOUNTS_ALL)}
                value={Scopes.ACCOUNTS_ALL}
                onChange={handleChange}
              />
            }
            label={`Accounts full access (${Scopes.ACCOUNTS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ACCOUNTS_DELETE)}
                value={Scopes.ACCOUNTS_DELETE}
                onChange={handleChange}
                name={Scopes.ACCOUNTS_DELETE}
              />
            }
            label={`Accounts delete access (${Scopes.ACCOUNTS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ACCOUNTS_WRITE)}
                value={Scopes.ACCOUNTS_WRITE}
                onChange={handleChange}
                name={Scopes.ACCOUNTS_WRITE}
              />
            }
            label={`Accounts write access (${Scopes.ACCOUNTS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ACCOUNTS_READ)}
                value={Scopes.ACCOUNTS_READ}
                onChange={handleChange}
                name={Scopes.ACCOUNTS_READ}
              />
            }
            label={`Accounts read access (${Scopes.ACCOUNTS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Calls access
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALLS_ALL)}
                value={Scopes.CALLS_ALL}
                onChange={handleChange}
                name={Scopes.CALLS_ALL}
              />
            }
            label={`Calls full access (${Scopes.CALLS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALLS_DELETE)}
                value={Scopes.CALLS_DELETE}
                onChange={handleChange}
                name={Scopes.CALLS_DELETE}
              />
            }
            label={`Calls delete access (${Scopes.CALLS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALLS_WRITE)}
                value={Scopes.CALLS_WRITE}
                onChange={handleChange}
                name={Scopes.CALLS_WRITE}
              />
            }
            label={`Calls write access (${Scopes.CALLS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALLS_READ)}
                value={Scopes.CALLS_READ}
                onChange={handleChange}
                name={Scopes.CALLS_READ}
              />
            }
            label={`Calls read access (${Scopes.CALLS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Call dispositions
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_DISPOSITIONS_ALL)}
                value={Scopes.CALL_DISPOSITIONS_ALL}
                onChange={handleChange}
                name={Scopes.CALL_DISPOSITIONS_ALL}
              />
            }
            label={`Call dispositions full access (${Scopes.CALL_DISPOSITIONS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_DISPOSITIONS_DELETE)}
                value={Scopes.CALL_DISPOSITIONS_DELETE}
                onChange={handleChange}
                name={Scopes.CALL_DISPOSITIONS_DELETE}
              />
            }
            label={`Call dispositions delete access (${Scopes.CALL_DISPOSITIONS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_DISPOSITIONS_WRITE)}
                value={Scopes.CALL_DISPOSITIONS_WRITE}
                onChange={handleChange}
                name={Scopes.CALL_DISPOSITIONS_WRITE}
              />
            }
            label={`Call dispositions write access (${Scopes.CALL_DISPOSITIONS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_DISPOSITIONS_READ)}
                value={Scopes.CALL_DISPOSITIONS_READ}
                onChange={handleChange}
                name={Scopes.CALL_DISPOSITIONS_READ}
              />
            }
            label={`Call dispositions read access (${Scopes.CALL_DISPOSITIONS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Call purposes
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_PURPOSES_ALL)}
                value={Scopes.CALL_PURPOSES_ALL}
                onChange={handleChange}
                name={Scopes.CALL_PURPOSES_ALL}
              />
            }
            label={`Call purposes full access (${Scopes.CALL_PURPOSES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_PURPOSES_DELETE)}
                value={Scopes.CALL_PURPOSES_DELETE}
                onChange={handleChange}
                name={Scopes.CALL_PURPOSES_DELETE}
              />
            }
            label={`Call purposes delete access (${Scopes.CALL_PURPOSES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_PURPOSES_WRITE)}
                value={Scopes.CALL_PURPOSES_WRITE}
                onChange={handleChange}
                name={Scopes.CALL_PURPOSES_WRITE}
              />
            }
            label={`Call purposes write access (${Scopes.CALL_PURPOSES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CALL_PURPOSES_READ)}
                value={Scopes.CALL_PURPOSES_READ}
                onChange={handleChange}
                name={Scopes.CALL_PURPOSES_READ}
              />
            }
            label={`Call purposes read access (${Scopes.CALL_PURPOSES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Content categories
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORIES_ALL)}
                value={Scopes.CONTENT_CATEGORIES_ALL}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORIES_ALL}
              />
            }
            label={`Content categories full access (${Scopes.CONTENT_CATEGORIES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORIES_DELETE)}
                value={Scopes.CONTENT_CATEGORIES_DELETE}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORIES_DELETE}
              />
            }
            label={`Content categories delete access (${Scopes.CONTENT_CATEGORIES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORIES_WRITE)}
                value={Scopes.CONTENT_CATEGORIES_WRITE}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORIES_WRITE}
              />
            }
            label={`Content categories write access (${Scopes.CONTENT_CATEGORIES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORIES_READ)}
                value={Scopes.CONTENT_CATEGORIES_READ}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORIES_READ}
              />
            }
            label={`Content categories read access (${Scopes.CONTENT_CATEGORIES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Content category memberships
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORY_MEMBERSHIPS_ALL)}
                value={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_ALL}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_ALL}
              />
            }
            label={`Content category memberships full access (${Scopes.CONTENT_CATEGORY_MEMBERSHIPS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORY_MEMBERSHIPS_DELETE)}
                value={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_DELETE}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_DELETE}
              />
            }
            label={`Content category memberships delete access (${Scopes.CONTENT_CATEGORY_MEMBERSHIPS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORY_MEMBERSHIPS_WRITE)}
                value={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_WRITE}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_WRITE}
              />
            }
            label={`Content category memberships write access (${Scopes.CONTENT_CATEGORY_MEMBERSHIPS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CONTENT_CATEGORY_MEMBERSHIPS_READ)}
                value={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_READ}
                onChange={handleChange}
                name={Scopes.CONTENT_CATEGORY_MEMBERSHIPS_READ}
              />
            }
            label={`Content category memberships read access (${Scopes.CONTENT_CATEGORY_MEMBERSHIPS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Custom duties
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CUSTOM_DUTIES_ALL)}
                value={Scopes.CUSTOM_DUTIES_ALL}
                onChange={handleChange}
                name={Scopes.CUSTOM_DUTIES_ALL}
              />
            }
            label={`Custom duties full access (${Scopes.CUSTOM_DUTIES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CUSTOM_DUTIES_DELETE)}
                value={Scopes.CUSTOM_DUTIES_DELETE}
                onChange={handleChange}
                name={Scopes.CUSTOM_DUTIES_DELETE}
              />
            }
            label={`Custom duties delete access (${Scopes.CUSTOM_DUTIES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CUSTOM_DUTIES_WRITE)}
                value={Scopes.CUSTOM_DUTIES_WRITE}
                onChange={handleChange}
                name={Scopes.CUSTOM_DUTIES_WRITE}
              />
            }
            label={`Custom duties write access (${Scopes.CUSTOM_DUTIES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.CUSTOM_DUTIES_READ)}
                value={Scopes.CUSTOM_DUTIES_READ}
                onChange={handleChange}
                name={Scopes.CUSTOM_DUTIES_READ}
              />
            }
            label={`Custom duties read access (${Scopes.CUSTOM_DUTIES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Duties
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.DUTIES_ALL)}
                value={Scopes.DUTIES_ALL}
                onChange={handleChange}
                name={Scopes.DUTIES_ALL}
              />
            }
            label={`Duties full access (${Scopes.DUTIES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.DUTIES_DELETE)}
                value={Scopes.DUTIES_DELETE}
                onChange={handleChange}
                name={Scopes.DUTIES_DELETE}
              />
            }
            label={`Duties delete access (${Scopes.DUTIES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.DUTIES_WRITE)}
                value={Scopes.DUTIES_WRITE}
                onChange={handleChange}
                name={Scopes.DUTIES_WRITE}
              />
            }
            label={`Duties write access (${Scopes.DUTIES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.DUTIES_READ)}
                value={Scopes.DUTIES_READ}
                onChange={handleChange}
                name={Scopes.DUTIES_READ}
              />
            }
            label={`Duties read access (${Scopes.DUTIES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Email addresses
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EMAIL_ADDRESSES_ALL)}
                value={Scopes.EMAIL_ADDRESSES_ALL}
                onChange={handleChange}
                name={Scopes.EMAIL_ADDRESSES_ALL}
              />
            }
            label={`Email addresses full access (${Scopes.EMAIL_ADDRESSES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EMAIL_ADDRESSES_DELETE)}
                value={Scopes.EMAIL_ADDRESSES_DELETE}
                onChange={handleChange}
                name={Scopes.EMAIL_ADDRESSES_DELETE}
              />
            }
            label={`Email addresses delete access (${Scopes.EMAIL_ADDRESSES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EMAIL_ADDRESSES_WRITE)}
                value={Scopes.EMAIL_ADDRESSES_WRITE}
                onChange={handleChange}
                name={Scopes.EMAIL_ADDRESSES_WRITE}
              />
            }
            label={`Email addresses write access (${Scopes.EMAIL_ADDRESSES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EMAIL_ADDRESSES_READ)}
                value={Scopes.EMAIL_ADDRESSES_READ}
                onChange={handleChange}
                name={Scopes.EMAIL_ADDRESSES_READ}
              />
            }
            label={`Email addresses read access (${Scopes.EMAIL_ADDRESSES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Events
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EVENTS_ALL)}
                value={Scopes.EVENTS_ALL}
                onChange={handleChange}
                name={Scopes.EVENTS_ALL}
              />
            }
            label={`Events full access (${Scopes.EVENTS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EVENTS_DELETE)}
                value={Scopes.EVENTS_DELETE}
                onChange={handleChange}
                name={Scopes.EVENTS_DELETE}
              />
            }
            label={`Events delete access (${Scopes.EVENTS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EVENTS_WRITE)}
                value={Scopes.EVENTS_WRITE}
                onChange={handleChange}
                name={Scopes.EVENTS_WRITE}
              />
            }
            label={`Events write access (${Scopes.EVENTS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.EVENTS_READ)}
                value={Scopes.EVENTS_READ}
                onChange={handleChange}
                name={Scopes.EVENTS_READ}
              />
            }
            label={`Events read access (${Scopes.EVENTS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Favorites
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.FAVORITES_ALL)}
                value={Scopes.FAVORITES_ALL}
                onChange={handleChange}
                name={Scopes.FAVORITES_ALL}
              />
            }
            label={`Favorites full access (${Scopes.FAVORITES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.FAVORITES_DELETE)}
                value={Scopes.FAVORITES_DELETE}
                onChange={handleChange}
                name={Scopes.FAVORITES_DELETE}
              />
            }
            label={`Favorites delete access (${Scopes.FAVORITES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.FAVORITES_WRITE)}
                value={Scopes.FAVORITES_WRITE}
                onChange={handleChange}
                name={Scopes.FAVORITES_WRITE}
              />
            }
            label={`Favorites write access (${Scopes.FAVORITES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.FAVORITES_READ)}
                value={Scopes.FAVORITES_READ}
                onChange={handleChange}
                name={Scopes.FAVORITES_READ}
              />
            }
            label={`Favorites read access (${Scopes.FAVORITES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Mailboxes
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.FAVORITES_READ)}
                value={Scopes.FAVORITES_READ}
                onChange={handleChange}
                name={Scopes.MAILBOXES_ALL}
              />
            }
            label={`Mailboxes full access (${Scopes.MAILBOXES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.MAILBOXES_DELETE)}
                value={Scopes.MAILBOXES_DELETE}
                onChange={handleChange}
                name={Scopes.MAILBOXES_DELETE}
              />
            }
            label={`Mailboxes delete access (${Scopes.MAILBOXES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.MAILBOXES_WRITE)}
                value={Scopes.MAILBOXES_WRITE}
                onChange={handleChange}
                name={Scopes.MAILBOXES_WRITE}
              />
            }
            label={`Favorites write access (${Scopes.MAILBOXES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.MAILBOXES_READ)}
                value={Scopes.MAILBOXES_READ}
                onChange={handleChange}
                name={Scopes.MAILBOXES_READ}
              />
            }
            label={`Mailboxes read access (${Scopes.MAILBOXES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Mail aliases
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.MAIL_ALIASES_ALL)}
                value={Scopes.MAIL_ALIASES_ALL}
                onChange={handleChange}
                name={Scopes.MAIL_ALIASES_ALL}
              />
            }
            label={`Mail aliases full access (${Scopes.MAIL_ALIASES_ALL})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.MAIL_ALIASES_READ)}
                value={Scopes.MAIL_ALIASES_READ}
                onChange={handleChange}
                name={Scopes.MAIL_ALIASES_READ}
              />
            }
            label={`Mail aliases read access (${Scopes.MAIL_ALIASES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Opportunities
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITIES_ALL)}
                value={Scopes.OPPORTUNITIES_ALL}
                onChange={handleChange}
                name={Scopes.OPPORTUNITIES_ALL}
              />
            }
            label={`Opportunities full access (${Scopes.OPPORTUNITIES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITIES_DELETE)}
                value={Scopes.OPPORTUNITIES_DELETE}
                onChange={handleChange}
                name={Scopes.OPPORTUNITIES_DELETE}
              />
            }
            label={`Opportunities delete access (${Scopes.OPPORTUNITIES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITIES_WRITE)}
                value={Scopes.OPPORTUNITIES_WRITE}
                onChange={handleChange}
                name={Scopes.OPPORTUNITIES_WRITE}
              />
            }
            label={`Opportunities write access (${Scopes.OPPORTUNITIES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITIES_READ)}
                value={Scopes.OPPORTUNITIES_READ}
                onChange={handleChange}
                name={Scopes.OPPORTUNITIES_READ}
              />
            }
            label={`Opportunities read access (${Scopes.OPPORTUNITIES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Opportunity prospect roles
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_PROSPECT_ROLES_ALL)}
                value={Scopes.OPPORTUNITY_PROSPECT_ROLES_ALL}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_PROSPECT_ROLES_ALL}
              />
            }
            label={`Opportunity prospect roles full access (${Scopes.OPPORTUNITY_PROSPECT_ROLES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_PROSPECT_ROLES_DELETE)}
                value={Scopes.OPPORTUNITY_PROSPECT_ROLES_DELETE}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_PROSPECT_ROLES_DELETE}
              />
            }
            label={`Opportunity prospect roles delete access (${Scopes.OPPORTUNITY_PROSPECT_ROLES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_PROSPECT_ROLES_WRITE)}
                value={Scopes.OPPORTUNITY_PROSPECT_ROLES_WRITE}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_PROSPECT_ROLES_WRITE}
              />
            }
            label={`Opportunity prospect roles write access (${Scopes.OPPORTUNITY_PROSPECT_ROLES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_PROSPECT_ROLES_READ)}
                value={Scopes.OPPORTUNITY_PROSPECT_ROLES_READ}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_PROSPECT_ROLES_READ}
              />
            }
            label={`Opportunity prospect roles read access (${Scopes.OPPORTUNITY_PROSPECT_ROLES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Opportunity stages
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_STAGES_ALL)}
                value={Scopes.OPPORTUNITY_STAGES_ALL}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_STAGES_ALL}
              />
            }
            label={`Opportunity stages full access (${Scopes.OPPORTUNITY_STAGES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_STAGES_DELETE)}
                value={Scopes.OPPORTUNITY_STAGES_DELETE}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_STAGES_DELETE}
              />
            }
            label={`Opportunity stages delete access (${Scopes.OPPORTUNITY_STAGES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_STAGES_WRITE)}
                value={Scopes.OPPORTUNITY_STAGES_WRITE}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_STAGES_WRITE}
              />
            }
            label={`Opportunity stages write access (${Scopes.OPPORTUNITY_STAGES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.OPPORTUNITY_STAGES_READ)}
                value={Scopes.OPPORTUNITY_STAGES_READ}
                onChange={handleChange}
                name={Scopes.OPPORTUNITY_STAGES_READ}
              />
            }
            label={`Opportunity stages read access (${Scopes.OPPORTUNITY_STAGES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Personas
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PERSONAS_ALL)}
                value={Scopes.PERSONAS_ALL}
                onChange={handleChange}
                name={Scopes.PERSONAS_ALL}
              />
            }
            label={`Personas full access (${Scopes.PERSONAS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PERSONAS_DELETE)}
                value={Scopes.PERSONAS_DELETE}
                onChange={handleChange}
                name={Scopes.PERSONAS_DELETE}
              />
            }
            label={`Personas delete access (${Scopes.PERSONAS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PERSONAS_WRITE)}
                value={Scopes.PERSONAS_WRITE}
                onChange={handleChange}
                name={Scopes.PERSONAS_WRITE}
              />
            }
            label={`Personas write access (${Scopes.PERSONAS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PERSONAS_READ)}
                value={Scopes.PERSONAS_READ}
                onChange={handleChange}
                name={Scopes.PERSONAS_READ}
              />
            }
            label={`Personas read access (${Scopes.PERSONAS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Phone numbers
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PHONE_NUMBERS_ALL)}
                value={Scopes.PHONE_NUMBERS_ALL}
                onChange={handleChange}
                name={Scopes.PHONE_NUMBERS_ALL}
              />
            }
            label={`Phone numbers full access (${Scopes.PHONE_NUMBERS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PHONE_NUMBERS_DELETE)}
                value={Scopes.PHONE_NUMBERS_DELETE}
                onChange={handleChange}
                name={Scopes.PHONE_NUMBERS_DELETE}
              />
            }
            label={`Phone numbers delete access (${Scopes.PHONE_NUMBERS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PERSONAS_WRITE)}
                value={Scopes.PERSONAS_WRITE}
                onChange={handleChange}
                name={Scopes.PERSONAS_WRITE}
              />
            }
            label={`Phone numbers write access (${Scopes.PERSONAS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PERSONAS_READ)}
                value={Scopes.PERSONAS_READ}
                onChange={handleChange}
                name={Scopes.PERSONAS_READ}
              />
            }
            label={`Phone numbers read access (${Scopes.PERSONAS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Profiles
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROFILES_ALL)}
                value={Scopes.PROFILES_ALL}
                onChange={handleChange}
                name={Scopes.PROFILES_ALL}
              />
            }
            label={`Profiles full access (${Scopes.PROFILES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROFILES_DELETE)}
                value={Scopes.PROFILES_DELETE}
                onChange={handleChange}
                name={Scopes.PROFILES_DELETE}
              />
            }
            label={`Profiles delete access (${Scopes.PROFILES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROFILES_WRITE)}
                value={Scopes.PROFILES_WRITE}
                onChange={handleChange}
                name={Scopes.PROFILES_WRITE}
              />
            }
            label={`Profiles write access (${Scopes.PROFILES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROFILES_READ)}
                value={Scopes.PROFILES_READ}
                onChange={handleChange}
                name={Scopes.PROFILES_READ}
              />
            }
            label={`Profiles read access (${Scopes.PROFILES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Prospects
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROSPECTS_ALL)}
                value={Scopes.PROSPECTS_ALL}
                onChange={handleChange}
                name={Scopes.PROSPECTS_ALL}
              />
            }
            label={`Prospects full access (${Scopes.PROSPECTS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROSPECTS_DELETE)}
                value={Scopes.PROSPECTS_DELETE}
                onChange={handleChange}
                name={Scopes.PROSPECTS_DELETE}
              />
            }
            label={`Prospects delete access (${Scopes.PROSPECTS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROSPECTS_WRITE)}
                value={Scopes.PROSPECTS_WRITE}
                onChange={handleChange}
                name={Scopes.PROSPECTS_WRITE}
              />
            }
            label={`Prospects write access (${Scopes.PROSPECTS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.PROSPECTS_READ)}
                value={Scopes.PROSPECTS_READ}
                onChange={handleChange}
                name={Scopes.PROSPECTS_READ}
              />
            }
            label={`Prospects read access (${Scopes.PROSPECTS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Roles
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ROLES_ALL)}
                value={Scopes.ROLES_ALL}
                onChange={handleChange}
                name={Scopes.ROLES_ALL}
              />
            }
            label={`Roles full access (${Scopes.ROLES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ROLES_DELETE)}
                value={Scopes.ROLES_DELETE}
                onChange={handleChange}
                name={Scopes.ROLES_DELETE}
              />
            }
            label={`Roles delete access (${Scopes.ROLES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ROLES_WRITE)}
                value={Scopes.ROLES_WRITE}
                onChange={handleChange}
                name={Scopes.ROLES_WRITE}
              />
            }
            label={`Roles write access (${Scopes.ROLES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.ROLES_READ)}
                value={Scopes.ROLES_READ}
                onChange={handleChange}
                name={Scopes.ROLES_READ}
              />
            }
            label={`Roles read access (${Scopes.ROLES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Rulesets
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.RULESETS_ALL)}
                value={Scopes.RULESETS_ALL}
                onChange={handleChange}
                name={Scopes.RULESETS_ALL}
              />
            }
            label={`Rulesets full access (${Scopes.RULESETS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.RULESETS_DELETE)}
                value={Scopes.RULESETS_DELETE}
                onChange={handleChange}
                name={Scopes.RULESETS_DELETE}
              />
            }
            label={`Rulesets delete access (${Scopes.RULESETS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.RULESETS_WRITE)}
                value={Scopes.RULESETS_WRITE}
                onChange={handleChange}
                name={Scopes.RULESETS_WRITE}
              />
            }
            label={`Rulesets write access (${Scopes.RULESETS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.RULESETS_READ)}
                value={Scopes.RULESETS_READ}
                onChange={handleChange}
                name={Scopes.RULESETS_READ}
              />
            }
            label={`Rulesets read access (${Scopes.RULESETS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Sequences
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCES_ALL)}
                value={Scopes.SEQUENCES_ALL}
                onChange={handleChange}
                name={Scopes.SEQUENCES_ALL}
              />
            }
            label={`Sequences full access (${Scopes.SEQUENCES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCES_DELETE)}
                value={Scopes.SEQUENCES_DELETE}
                onChange={handleChange}
                name={Scopes.SEQUENCES_DELETE}
              />
            }
            label={`Sequences delete access (${Scopes.SEQUENCES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCES_WRITE)}
                value={Scopes.SEQUENCES_WRITE}
                onChange={handleChange}
                name={Scopes.SEQUENCES_WRITE}
              />
            }
            label={`Sequences write access (${Scopes.SEQUENCES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCES_READ)}
                value={Scopes.SEQUENCES_READ}
                onChange={handleChange}
                name={Scopes.SEQUENCES_READ}
              />
            }
            label={`Sequences read access (${Scopes.SEQUENCES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Sequence states
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STATES_ALL)}
                value={Scopes.SEQUENCE_STATES_ALL}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STATES_ALL}
              />
            }
            label={`Sequence states full access (${Scopes.SEQUENCE_STATES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STATES_DELETE)}
                value={Scopes.SEQUENCE_STATES_DELETE}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STATES_DELETE}
              />
            }
            label={`Sequence states delete access (${Scopes.SEQUENCE_STATES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STATES_WRITE)}
                value={Scopes.SEQUENCE_STATES_WRITE}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STATES_WRITE}
              />
            }
            label={`Sequence states write access (${Scopes.SEQUENCE_STATES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STATES_READ)}
                value={Scopes.SEQUENCE_STATES_READ}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STATES_READ}
              />
            }
            label={`Sequence states read access (${Scopes.SEQUENCE_STATES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Sequence steps
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STEPS_ALL)}
                value={Scopes.SEQUENCE_STEPS_ALL}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STEPS_ALL}
              />
            }
            label={`Sequence steps full access (${Scopes.SEQUENCE_STEPS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STEPS_DELETE)}
                value={Scopes.SEQUENCE_STEPS_DELETE}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STEPS_DELETE}
              />
            }
            label={`Sequence steps delete access (${Scopes.SEQUENCE_STEPS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STEPS_WRITE)}
                value={Scopes.SEQUENCE_STEPS_WRITE}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STEPS_WRITE}
              />
            }
            label={`Sequence steps write access (${Scopes.SEQUENCE_STEPS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_STEPS_READ)}
                value={Scopes.SEQUENCE_STEPS_READ}
                onChange={handleChange}
                name={Scopes.SEQUENCE_STEPS_READ}
              />
            }
            label={`Sequence steps read access (${Scopes.SEQUENCE_STEPS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Sequence templates
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_TEMPLATES_ALL)}
                value={Scopes.SEQUENCE_TEMPLATES_ALL}
                onChange={handleChange}
                name={Scopes.SEQUENCE_TEMPLATES_ALL}
              />
            }
            label={`Sequence templates full access (${Scopes.SEQUENCE_TEMPLATES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_TEMPLATES_DELETE)}
                value={Scopes.SEQUENCE_TEMPLATES_DELETE}
                onChange={handleChange}
                name={Scopes.SEQUENCE_TEMPLATES_DELETE}
              />
            }
            label={`Sequence templates delete access (${Scopes.SEQUENCE_TEMPLATES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_TEMPLATES_WRITE)}
                value={Scopes.SEQUENCE_TEMPLATES_WRITE}
                onChange={handleChange}
                name={Scopes.SEQUENCE_TEMPLATES_WRITE}
              />
            }
            label={`Sequence templates write access (${Scopes.SEQUENCE_TEMPLATES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SEQUENCE_TEMPLATES_READ)}
                value={Scopes.SEQUENCE_TEMPLATES_READ}
                onChange={handleChange}
                name={Scopes.SEQUENCE_TEMPLATES_READ}
              />
            }
            label={`Sequence templates read access (${Scopes.SEQUENCE_TEMPLATES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Snippets
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SNIPPETS_ALL)}
                value={Scopes.SNIPPETS_ALL}
                onChange={handleChange}
                name={Scopes.SNIPPETS_ALL}
              />
            }
            label={`Snippets full access (${Scopes.SNIPPETS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SNIPPETS_DELETE)}
                value={Scopes.SNIPPETS_DELETE}
                onChange={handleChange}
                name={Scopes.SNIPPETS_DELETE}
              />
            }
            label={`Snippets delete access (${Scopes.SNIPPETS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SNIPPETS_WRITE)}
                value={Scopes.SNIPPETS_WRITE}
                onChange={handleChange}
                name={Scopes.SNIPPETS_WRITE}
              />
            }
            label={`Snippets write access (${Scopes.SNIPPETS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.SNIPPETS_READ)}
                value={Scopes.SNIPPETS_READ}
                onChange={handleChange}
                name={Scopes.SNIPPETS_READ}
              />
            }
            label={`Snippets read access (${Scopes.SNIPPETS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Stages
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.STAGES_ALL)}
                value={Scopes.STAGES_ALL}
                onChange={handleChange}
                name={Scopes.STAGES_ALL}
              />
            }
            label={`Stages full access (${Scopes.STAGES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.STAGES_DELETE)}
                value={Scopes.STAGES_DELETE}
                onChange={handleChange}
                name={Scopes.STAGES_DELETE}
              />
            }
            label={`Stages delete access (${Scopes.STAGES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.STAGES_WRITE)}
                value={Scopes.STAGES_WRITE}
                onChange={handleChange}
                name={Scopes.STAGES_WRITE}
              />
            }
            label={`Stages write access (${Scopes.STAGES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.STAGES_READ)}
                value={Scopes.STAGES_READ}
                onChange={handleChange}
                name={Scopes.STAGES_READ}
              />
            }
            label={`Stages read access (${Scopes.STAGES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Tasks
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASKS_ALL)}
                value={Scopes.TASKS_ALL}
                onChange={handleChange}
                name={Scopes.TASKS_ALL}
              />
            }
            label={`Tasks full access (${Scopes.TASKS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASKS_DELETE)}
                value={Scopes.TASKS_DELETE}
                onChange={handleChange}
                name={Scopes.TASKS_DELETE}
              />
            }
            label={`Tasks delete access (${Scopes.TASKS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASKS_WRITE)}
                value={Scopes.TASKS_WRITE}
                onChange={handleChange}
                name={Scopes.TASKS_WRITE}
              />
            }
            label={`Tasks write access (${Scopes.TASKS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASKS_READ)}
                value={Scopes.TASKS_READ}
                onChange={handleChange}
                name={Scopes.TASKS_READ}
              />
            }
            label={`Tasks read access (${Scopes.TASKS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Task priorities
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASK_PRIORITIES_ALL)}
                value={Scopes.TASK_PRIORITIES_ALL}
                onChange={handleChange}
                name={Scopes.TASK_PRIORITIES_ALL}
              />
            }
            label={`Task priorities full access (${Scopes.TASK_PRIORITIES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASK_PRIORITIES_DELETE)}
                value={Scopes.TASK_PRIORITIES_DELETE}
                onChange={handleChange}
                name={Scopes.TASK_PRIORITIES_DELETE}
              />
            }
            label={`Task priorities delete access (${Scopes.TASK_PRIORITIES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASK_PRIORITIES_WRITE)}
                value={Scopes.TASK_PRIORITIES_WRITE}
                onChange={handleChange}
                name={Scopes.TASK_PRIORITIES_WRITE}
              />
            }
            label={`Task priorities write access (${Scopes.TASK_PRIORITIES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TASK_PRIORITIES_READ)}
                value={Scopes.TASK_PRIORITIES_READ}
                onChange={handleChange}
                name={Scopes.TASK_PRIORITIES_READ}
              />
            }
            label={`Task priorities read access (${Scopes.TASK_PRIORITIES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Teams
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEAMS_ALL)}
                value={Scopes.TEAMS_ALL}
                onChange={handleChange}
                name={Scopes.TEAMS_ALL}
              />
            }
            label={`Teams full access (${Scopes.TEAMS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEAMS_DELETE)}
                value={Scopes.TEAMS_DELETE}
                onChange={handleChange}
                name={Scopes.TEAMS_DELETE}
              />
            }
            label={`Teams delete access (${Scopes.TEAMS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEAMS_WRITE)}
                value={Scopes.TEAMS_WRITE}
                onChange={handleChange}
                name={Scopes.TEAMS_WRITE}
              />
            }
            label={`Teams write access (${Scopes.TEAMS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEAMS_READ)}
                value={Scopes.TEAMS_READ}
                onChange={handleChange}
                name={Scopes.TEAMS_READ}
              />
            }
            label={`Teams read access (${Scopes.TEAMS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Templates
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEMPLATES_ALL)}
                value={Scopes.TEMPLATES_ALL}
                onChange={handleChange}
                name={Scopes.TEMPLATES_ALL}
              />
            }
            label={`Templates full access (${Scopes.TEMPLATES_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEMPLATES_DELETE)}
                value={Scopes.TEMPLATES_DELETE}
                onChange={handleChange}
                name={Scopes.TEMPLATES_DELETE}
              />
            }
            label={`Templates delete access (${Scopes.TEMPLATES_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEMPLATES_WRITE)}
                value={Scopes.TEMPLATES_WRITE}
                onChange={handleChange}
                name={Scopes.TEMPLATES_WRITE}
              />
            }
            label={`Templates write access (${Scopes.TEMPLATES_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.TEMPLATES_READ)}
                value={Scopes.TEMPLATES_READ}
                onChange={handleChange}
                name={Scopes.TEMPLATES_READ}
              />
            }
            label={`Templates read access (${Scopes.TEMPLATES_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Users
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.USERS_ALL)}
                value={Scopes.USERS_ALL}
                onChange={handleChange}
                name={Scopes.USERS_ALL}
              />
            }
            label={`Users full access (${Scopes.USERS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.USERS_DELETE)}
                value={Scopes.USERS_DELETE}
                onChange={handleChange}
                name={Scopes.USERS_DELETE}
              />
            }
            label={`Users delete access (${Scopes.USERS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.USERS_WRITE)}
                value={Scopes.USERS_WRITE}
                onChange={handleChange}
                name={Scopes.USERS_WRITE}
              />
            }
            label={`Users write access (${Scopes.USERS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.USERS_READ)}
                value={Scopes.USERS_READ}
                onChange={handleChange}
                name={Scopes.USERS_READ}
              />
            }
            label={`Users read access (${Scopes.USERS_READ})`}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          Webhooks
        </FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.WEBHOOKS_ALL)}
                value={Scopes.WEBHOOKS_ALL}
                onChange={handleChange}
                name={Scopes.WEBHOOKS_ALL}
              />
            }
            label={`Webhooks full access (${Scopes.USERS_ALL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.WEBHOOKS_DELETE)}
                value={Scopes.WEBHOOKS_DELETE}
                onChange={handleChange}
                name={Scopes.WEBHOOKS_DELETE}
              />
            }
            label={`Webhooks delete access (${Scopes.WEBHOOKS_DELETE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.WEBHOOKS_WRITE)}
                value={Scopes.WEBHOOKS_WRITE}
                onChange={handleChange}
                name={Scopes.WEBHOOKS_WRITE}
              />
            }
            label={`Webhooks write access (${Scopes.WEBHOOKS_WRITE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(Scopes.WEBHOOKS_READ)}
                value={Scopes.WEBHOOKS_READ}
                onChange={handleChange}
                name={Scopes.WEBHOOKS_READ}
              />
            }
            label={`Webhooks read access (${Scopes.WEBHOOKS_READ})`}
          />
        </FormGroup>
      </FormControl>
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
