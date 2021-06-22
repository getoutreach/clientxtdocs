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
  ProspectContextKeys,
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

const ProspectContextInfo: React.FC = observer(() => {
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
                checked={isChecked(ProspectContextKeys.AVAILABLE_AT)}
                value={ProspectContextKeys.AVAILABLE_AT}
                onChange={handleChange}
              />
            }
            label={`Prospect available at (${ProspectContextKeys.AVAILABLE_AT})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.COMPANY)}
                value={ProspectContextKeys.COMPANY}
                onChange={handleChange}
              />
            }
            label={`Prospect company (${ProspectContextKeys.COMPANY})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.COMPANY_LOCALITY)}
                value={ProspectContextKeys.COMPANY_LOCALITY}
                onChange={handleChange}
              />
            }
            label={`Prospect company locality (${ProspectContextKeys.COMPANY_LOCALITY})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.EMAILS)}
                value={ProspectContextKeys.EMAILS}
                onChange={handleChange}
              />
            }
            label={`Prospect emails (${ProspectContextKeys.EMAILS})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.EXTERNAL)}
                value={ProspectContextKeys.EXTERNAL}
                onChange={handleChange}
              />
            }
            label={`Prospect external info (${ProspectContextKeys.EXTERNAL})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.ID)}
                value={ProspectContextKeys.ID}
                onChange={handleChange}
              />
            }
            label={`Prospect identifier (${ProspectContextKeys.ID})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.TAGS)}
                value={ProspectContextKeys.TAGS}
                onChange={handleChange}
              />
            }
            label={`Prospect tags (${ProspectContextKeys.TAGS})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.TIMEZONE)}
                value={ProspectContextKeys.TIMEZONE}
                onChange={handleChange}
              />
            }
            label={`Prospect timezone (${ProspectContextKeys.TIMEZONE})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.TITLE)}
                value={ProspectContextKeys.TITLE}
                onChange={handleChange}
              />
            }
            label={`Prospect title (${ProspectContextKeys.TITLE})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_1)}
                value={ProspectContextKeys.CUSTOM_FIELD_1}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 1 (${ProspectContextKeys.CUSTOM_FIELD_1})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_2)}
                value={ProspectContextKeys.CUSTOM_FIELD_2}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 2 (${ProspectContextKeys.CUSTOM_FIELD_2})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_3)}
                value={ProspectContextKeys.CUSTOM_FIELD_3}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 3 (${ProspectContextKeys.CUSTOM_FIELD_3})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_4)}
                value={ProspectContextKeys.CUSTOM_FIELD_4}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 4 (${ProspectContextKeys.CUSTOM_FIELD_4})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_5)}
                value={ProspectContextKeys.CUSTOM_FIELD_5}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 5 (${ProspectContextKeys.CUSTOM_FIELD_5})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_6)}
                value={ProspectContextKeys.CUSTOM_FIELD_6}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 6 (${ProspectContextKeys.CUSTOM_FIELD_6})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_7)}
                value={ProspectContextKeys.CUSTOM_FIELD_7}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 7 (${ProspectContextKeys.CUSTOM_FIELD_7})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_8)}
                value={ProspectContextKeys.CUSTOM_FIELD_8}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 8 (${ProspectContextKeys.CUSTOM_FIELD_8})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_9)}
                value={ProspectContextKeys.CUSTOM_FIELD_9}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 9 (${ProspectContextKeys.CUSTOM_FIELD_9})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_10)}
                value={ProspectContextKeys.CUSTOM_FIELD_10}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 10 (${ProspectContextKeys.CUSTOM_FIELD_10})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_11)}
                value={ProspectContextKeys.CUSTOM_FIELD_11}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 11 (${ProspectContextKeys.CUSTOM_FIELD_11})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_12)}
                value={ProspectContextKeys.CUSTOM_FIELD_12}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 12 (${ProspectContextKeys.CUSTOM_FIELD_12})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_13)}
                value={ProspectContextKeys.CUSTOM_FIELD_13}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 13 (${ProspectContextKeys.CUSTOM_FIELD_13})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_14)}
                value={ProspectContextKeys.CUSTOM_FIELD_14}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 14 (${ProspectContextKeys.CUSTOM_FIELD_14})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_15)}
                value={ProspectContextKeys.CUSTOM_FIELD_15}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 15 (${ProspectContextKeys.CUSTOM_FIELD_15})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_16)}
                value={ProspectContextKeys.CUSTOM_FIELD_16}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 16 (${ProspectContextKeys.CUSTOM_FIELD_16})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_17)}
                value={ProspectContextKeys.CUSTOM_FIELD_17}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 17 (${ProspectContextKeys.CUSTOM_FIELD_17})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_18)}
                value={ProspectContextKeys.CUSTOM_FIELD_18}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 18 (${ProspectContextKeys.CUSTOM_FIELD_18})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_19)}
                value={ProspectContextKeys.CUSTOM_FIELD_19}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 19 (${ProspectContextKeys.CUSTOM_FIELD_19})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_20)}
                value={ProspectContextKeys.CUSTOM_FIELD_20}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 20 (${ProspectContextKeys.CUSTOM_FIELD_20})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_21)}
                value={ProspectContextKeys.CUSTOM_FIELD_21}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 21 (${ProspectContextKeys.CUSTOM_FIELD_21})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_22)}
                value={ProspectContextKeys.CUSTOM_FIELD_22}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 22 (${ProspectContextKeys.CUSTOM_FIELD_22})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_23)}
                value={ProspectContextKeys.CUSTOM_FIELD_23}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 23 (${ProspectContextKeys.CUSTOM_FIELD_23})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_24)}
                value={ProspectContextKeys.CUSTOM_FIELD_24}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 24 (${ProspectContextKeys.CUSTOM_FIELD_24})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_25)}
                value={ProspectContextKeys.CUSTOM_FIELD_25}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 25 (${ProspectContextKeys.CUSTOM_FIELD_25})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_26)}
                value={ProspectContextKeys.CUSTOM_FIELD_26}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 26 (${ProspectContextKeys.CUSTOM_FIELD_26})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_27)}
                value={ProspectContextKeys.CUSTOM_FIELD_27}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 27 (${ProspectContextKeys.CUSTOM_FIELD_27})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_28)}
                value={ProspectContextKeys.CUSTOM_FIELD_28}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 28 (${ProspectContextKeys.CUSTOM_FIELD_28})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_29)}
                value={ProspectContextKeys.CUSTOM_FIELD_29}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 29 (${ProspectContextKeys.CUSTOM_FIELD_29})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_30)}
                value={ProspectContextKeys.CUSTOM_FIELD_30}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 30 (${ProspectContextKeys.CUSTOM_FIELD_30})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_31)}
                value={ProspectContextKeys.CUSTOM_FIELD_31}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 31 (${ProspectContextKeys.CUSTOM_FIELD_31})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_32)}
                value={ProspectContextKeys.CUSTOM_FIELD_32}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 32 (${ProspectContextKeys.CUSTOM_FIELD_32})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_33)}
                value={ProspectContextKeys.CUSTOM_FIELD_33}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 33 (${ProspectContextKeys.CUSTOM_FIELD_33})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_34)}
                value={ProspectContextKeys.CUSTOM_FIELD_34}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 34 (${ProspectContextKeys.CUSTOM_FIELD_34})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_35)}
                value={ProspectContextKeys.CUSTOM_FIELD_35}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 35 (${ProspectContextKeys.CUSTOM_FIELD_35})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_36)}
                value={ProspectContextKeys.CUSTOM_FIELD_36}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 36 (${ProspectContextKeys.CUSTOM_FIELD_36})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_37)}
                value={ProspectContextKeys.CUSTOM_FIELD_37}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 37 (${ProspectContextKeys.CUSTOM_FIELD_37})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_38)}
                value={ProspectContextKeys.CUSTOM_FIELD_38}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 38 (${ProspectContextKeys.CUSTOM_FIELD_38})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_39)}
                value={ProspectContextKeys.CUSTOM_FIELD_39}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 39 (${ProspectContextKeys.CUSTOM_FIELD_39})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_40)}
                value={ProspectContextKeys.CUSTOM_FIELD_40}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 40 (${ProspectContextKeys.CUSTOM_FIELD_40})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_41)}
                value={ProspectContextKeys.CUSTOM_FIELD_41}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 41 (${ProspectContextKeys.CUSTOM_FIELD_41})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_42)}
                value={ProspectContextKeys.CUSTOM_FIELD_42}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 42 (${ProspectContextKeys.CUSTOM_FIELD_42})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_43)}
                value={ProspectContextKeys.CUSTOM_FIELD_43}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 43 (${ProspectContextKeys.CUSTOM_FIELD_43})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_44)}
                value={ProspectContextKeys.CUSTOM_FIELD_44}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 44 (${ProspectContextKeys.CUSTOM_FIELD_44})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_45)}
                value={ProspectContextKeys.CUSTOM_FIELD_45}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 45 (${ProspectContextKeys.CUSTOM_FIELD_45})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_46)}
                value={ProspectContextKeys.CUSTOM_FIELD_46}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 46 (${ProspectContextKeys.CUSTOM_FIELD_46})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_47)}
                value={ProspectContextKeys.CUSTOM_FIELD_47}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 47 (${ProspectContextKeys.CUSTOM_FIELD_47})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_48)}
                value={ProspectContextKeys.CUSTOM_FIELD_48}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 48 (${ProspectContextKeys.CUSTOM_FIELD_48})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_49)}
                value={ProspectContextKeys.CUSTOM_FIELD_49}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 49 (${ProspectContextKeys.CUSTOM_FIELD_49})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_50)}
                value={ProspectContextKeys.CUSTOM_FIELD_50}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 50 (${ProspectContextKeys.CUSTOM_FIELD_50})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_51)}
                value={ProspectContextKeys.CUSTOM_FIELD_51}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 51 (${ProspectContextKeys.CUSTOM_FIELD_51})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_52)}
                value={ProspectContextKeys.CUSTOM_FIELD_52}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 52 (${ProspectContextKeys.CUSTOM_FIELD_52})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_53)}
                value={ProspectContextKeys.CUSTOM_FIELD_53}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 53 (${ProspectContextKeys.CUSTOM_FIELD_53})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_54)}
                value={ProspectContextKeys.CUSTOM_FIELD_54}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 54 (${ProspectContextKeys.CUSTOM_FIELD_54})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_55)}
                value={ProspectContextKeys.CUSTOM_FIELD_55}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 55 (${ProspectContextKeys.CUSTOM_FIELD_55})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_56)}
                value={ProspectContextKeys.CUSTOM_FIELD_56}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 56 (${ProspectContextKeys.CUSTOM_FIELD_56})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_57)}
                value={ProspectContextKeys.CUSTOM_FIELD_57}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 57 (${ProspectContextKeys.CUSTOM_FIELD_57})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_58)}
                value={ProspectContextKeys.CUSTOM_FIELD_58}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 58 (${ProspectContextKeys.CUSTOM_FIELD_58})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_59)}
                value={ProspectContextKeys.CUSTOM_FIELD_59}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 59 (${ProspectContextKeys.CUSTOM_FIELD_59})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_60)}
                value={ProspectContextKeys.CUSTOM_FIELD_60}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 60 (${ProspectContextKeys.CUSTOM_FIELD_60})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_61)}
                value={ProspectContextKeys.CUSTOM_FIELD_61}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 61 (${ProspectContextKeys.CUSTOM_FIELD_61})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_62)}
                value={ProspectContextKeys.CUSTOM_FIELD_62}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 62 (${ProspectContextKeys.CUSTOM_FIELD_62})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_63)}
                value={ProspectContextKeys.CUSTOM_FIELD_63}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 63 (${ProspectContextKeys.CUSTOM_FIELD_63})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_64)}
                value={ProspectContextKeys.CUSTOM_FIELD_64}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 64 (${ProspectContextKeys.CUSTOM_FIELD_64})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_65)}
                value={ProspectContextKeys.CUSTOM_FIELD_65}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 65 (${ProspectContextKeys.CUSTOM_FIELD_65})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_66)}
                value={ProspectContextKeys.CUSTOM_FIELD_66}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 66 (${ProspectContextKeys.CUSTOM_FIELD_66})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_67)}
                value={ProspectContextKeys.CUSTOM_FIELD_67}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 67 (${ProspectContextKeys.CUSTOM_FIELD_67})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_68)}
                value={ProspectContextKeys.CUSTOM_FIELD_68}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 68 (${ProspectContextKeys.CUSTOM_FIELD_68})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_69)}
                value={ProspectContextKeys.CUSTOM_FIELD_69}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 69 (${ProspectContextKeys.CUSTOM_FIELD_69})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_70)}
                value={ProspectContextKeys.CUSTOM_FIELD_70}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 70 (${ProspectContextKeys.CUSTOM_FIELD_70})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_70)}
                value={ProspectContextKeys.CUSTOM_FIELD_71}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 71 (${ProspectContextKeys.CUSTOM_FIELD_71})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_72)}
                value={ProspectContextKeys.CUSTOM_FIELD_72}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 72 (${ProspectContextKeys.CUSTOM_FIELD_72})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_73)}
                value={ProspectContextKeys.CUSTOM_FIELD_73}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 73 (${ProspectContextKeys.CUSTOM_FIELD_73})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_74)}
                value={ProspectContextKeys.CUSTOM_FIELD_74}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 74 (${ProspectContextKeys.CUSTOM_FIELD_74})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_75)}
                value={ProspectContextKeys.CUSTOM_FIELD_75}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 75 (${ProspectContextKeys.CUSTOM_FIELD_75})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_76)}
                value={ProspectContextKeys.CUSTOM_FIELD_76}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 76 (${ProspectContextKeys.CUSTOM_FIELD_76})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_77)}
                value={ProspectContextKeys.CUSTOM_FIELD_77}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 77 (${ProspectContextKeys.CUSTOM_FIELD_77})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_78)}
                value={ProspectContextKeys.CUSTOM_FIELD_78}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 78 (${ProspectContextKeys.CUSTOM_FIELD_78})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_79)}
                value={ProspectContextKeys.CUSTOM_FIELD_79}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 79 (${ProspectContextKeys.CUSTOM_FIELD_79})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_80)}
                value={ProspectContextKeys.CUSTOM_FIELD_80}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 80 (${ProspectContextKeys.CUSTOM_FIELD_80})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_81)}
                value={ProspectContextKeys.CUSTOM_FIELD_81}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 81 (${ProspectContextKeys.CUSTOM_FIELD_81})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_82)}
                value={ProspectContextKeys.CUSTOM_FIELD_82}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 82 (${ProspectContextKeys.CUSTOM_FIELD_82})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_83)}
                value={ProspectContextKeys.CUSTOM_FIELD_83}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 83 (${ProspectContextKeys.CUSTOM_FIELD_83})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_84)}
                value={ProspectContextKeys.CUSTOM_FIELD_84}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 84 (${ProspectContextKeys.CUSTOM_FIELD_84})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_85)}
                value={ProspectContextKeys.CUSTOM_FIELD_85}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 85 (${ProspectContextKeys.CUSTOM_FIELD_85})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_86)}
                value={ProspectContextKeys.CUSTOM_FIELD_86}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 86 (${ProspectContextKeys.CUSTOM_FIELD_86})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_87)}
                value={ProspectContextKeys.CUSTOM_FIELD_87}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 87 (${ProspectContextKeys.CUSTOM_FIELD_87})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_88)}
                value={ProspectContextKeys.CUSTOM_FIELD_88}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 88 (${ProspectContextKeys.CUSTOM_FIELD_88})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_89)}
                value={ProspectContextKeys.CUSTOM_FIELD_89}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 89 (${ProspectContextKeys.CUSTOM_FIELD_89})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_90)}
                value={ProspectContextKeys.CUSTOM_FIELD_90}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 90 (${ProspectContextKeys.CUSTOM_FIELD_90})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_91)}
                value={ProspectContextKeys.CUSTOM_FIELD_91}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 91 (${ProspectContextKeys.CUSTOM_FIELD_91})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_92)}
                value={ProspectContextKeys.CUSTOM_FIELD_92}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 92 (${ProspectContextKeys.CUSTOM_FIELD_92})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_93)}
                value={ProspectContextKeys.CUSTOM_FIELD_93}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 93 (${ProspectContextKeys.CUSTOM_FIELD_93})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_94)}
                value={ProspectContextKeys.CUSTOM_FIELD_94}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 94 (${ProspectContextKeys.CUSTOM_FIELD_94})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_95)}
                value={ProspectContextKeys.CUSTOM_FIELD_95}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 95 (${ProspectContextKeys.CUSTOM_FIELD_95})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_96)}
                value={ProspectContextKeys.CUSTOM_FIELD_96}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 96 (${ProspectContextKeys.CUSTOM_FIELD_96})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_97)}
                value={ProspectContextKeys.CUSTOM_FIELD_97}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 97 (${ProspectContextKeys.CUSTOM_FIELD_97})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_98)}
                value={ProspectContextKeys.CUSTOM_FIELD_98}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 98 (${ProspectContextKeys.CUSTOM_FIELD_98})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_99)}
                value={ProspectContextKeys.CUSTOM_FIELD_99}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 99 (${ProspectContextKeys.CUSTOM_FIELD_99})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(ProspectContextKeys.CUSTOM_FIELD_100)}
                value={ProspectContextKeys.CUSTOM_FIELD_100}
                onChange={handleChange}
              />
            }
            label={`Prospect custom field 100 (${ProspectContextKeys.CUSTOM_FIELD_100})`}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
});

export default ProspectContextInfo;
