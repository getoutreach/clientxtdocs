import React, { useContext } from 'react';

import {
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import {
  AllContextKeys,
  Manifest,
  UserContextKeys,
} from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';

import { EditorStoreContext } from '../../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordion: {
      margin: theme.spacing(),
      paddingLeft: theme.spacing(),
    },
    bold: {
      fontWeight: 600,
    },
    formControl: {
      margin: theme.spacing(1),
    },
    formControlLabel: {
      width: 350,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(2),
    },
  })
);

const UserContextInfo: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const contextKey = event.target.value as AllContextKeys;
    const ctx = [...editorStore.selectedManifest!.context];
    const selectedIndex = ctx.findIndex((p) => p === contextKey);
    if (selectedIndex === -1) {
      ctx.push(contextKey);
    } else {
      ctx.splice(selectedIndex, 1);
    }

    const manifest = {
      ...editorStore.selectedManifest!,
      context: ctx,
    } as Manifest;
    editorStore.addOrUpdateManifest(manifest);
  };

  const isChecked = (key: AllContextKeys) => {
    if (!editorStore.selectedManifest) {
      return false;
    }

    return (
      editorStore.selectedManifest.context.findIndex((p) => p === key) > -1
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" style={{ marginBottom: 8 }}>
        Select the user contextual information your application needs from
        Outreach
      </Typography>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.EMAIL)}
                value={UserContextKeys.EMAIL}
                onChange={handleChange}
              />
            }
            label={`User email address (${UserContextKeys.EMAIL})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.FIRST_NAME)}
                value={UserContextKeys.FIRST_NAME}
                onChange={handleChange}
              />
            }
            label={`User first name (${UserContextKeys.FIRST_NAME})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.ID)}
                value={UserContextKeys.ID}
                onChange={handleChange}
              />
            }
            label={`User identifier (${UserContextKeys.ID})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.LAST_NAME)}
                value={UserContextKeys.LAST_NAME}
                onChange={handleChange}
              />
            }
            label={`User last name (${UserContextKeys.LAST_NAME})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.TITLE)}
                value={UserContextKeys.TITLE}
                onChange={handleChange}
              />
            }
            label={`User title (${UserContextKeys.TITLE})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.USERNAME)}
                value={UserContextKeys.USERNAME}
                onChange={handleChange}
              />
            }
            label={`User name (${UserContextKeys.USERNAME})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.CUSTOM_FIELD_1)}
                value={UserContextKeys.CUSTOM_FIELD_1}
                onChange={handleChange}
              />
            }
            label={`User custom field 1 (${UserContextKeys.CUSTOM_FIELD_1})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.CUSTOM_FIELD_2)}
                value={UserContextKeys.CUSTOM_FIELD_2}
                onChange={handleChange}
              />
            }
            label={`User custom field 2 (${UserContextKeys.CUSTOM_FIELD_2})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.CUSTOM_FIELD_3)}
                value={UserContextKeys.CUSTOM_FIELD_3}
                onChange={handleChange}
              />
            }
            label={`User custom field 3 (${UserContextKeys.CUSTOM_FIELD_3})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.CUSTOM_FIELD_4)}
                value={UserContextKeys.CUSTOM_FIELD_4}
                onChange={handleChange}
              />
            }
            label={`User custom field 4 (${UserContextKeys.CUSTOM_FIELD_4})`}
          />
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(UserContextKeys.CUSTOM_FIELD_5)}
                value={UserContextKeys.CUSTOM_FIELD_5}
                onChange={handleChange}
              />
            }
            label={`User custom field 5 (${UserContextKeys.CUSTOM_FIELD_5})`}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
});

export default UserContextInfo;
