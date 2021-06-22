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
  AccountContextKeys,
  AllContextKeys,
  Manifest,
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

const AccountContextInfo: React.FC = observer(() => {
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
        Select the account contextual information your application needs from
        Outreach
      </Typography>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row={true}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_ID)}
                value={AccountContextKeys.CUSTOM_ID}
                onChange={handleChange}
              />
            }
            label={`Account custom id (${AccountContextKeys.CUSTOM_ID})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.DESCRIPTION)}
                value={AccountContextKeys.DESCRIPTION}
                onChange={handleChange}
              />
            }
            label={`Account description (${AccountContextKeys.DESCRIPTION})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.EXTERNAL)}
                value={AccountContextKeys.EXTERNAL}
                onChange={handleChange}
              />
            }
            label={`Account external info (${AccountContextKeys.EXTERNAL})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.ID)}
                value={AccountContextKeys.ID}
                onChange={handleChange}
              />
            }
            label={`Account identifier (${AccountContextKeys.ID})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.LOCALITY)}
                value={AccountContextKeys.LOCALITY}
                onChange={handleChange}
              />
            }
            label={`Account locality (${AccountContextKeys.LOCALITY})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.NAME)}
                value={AccountContextKeys.NAME}
                onChange={handleChange}
              />
            }
            label={`Account name (${AccountContextKeys.NAME})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.TAGS)}
                value={AccountContextKeys.TAGS}
                onChange={handleChange}
              />
            }
            label={`Account tags (${AccountContextKeys.TAGS})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_1)}
                value={AccountContextKeys.CUSTOM_FIELD_1}
                onChange={handleChange}
              />
            }
            label={`Account custom field 1 (${AccountContextKeys.CUSTOM_FIELD_1})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_2)}
                value={AccountContextKeys.CUSTOM_FIELD_2}
                onChange={handleChange}
              />
            }
            label={`Account custom field 2 (${AccountContextKeys.CUSTOM_FIELD_2})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_3)}
                value={AccountContextKeys.CUSTOM_FIELD_3}
                onChange={handleChange}
              />
            }
            label={`Account custom field 3 (${AccountContextKeys.CUSTOM_FIELD_3})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_4)}
                value={AccountContextKeys.CUSTOM_FIELD_4}
                onChange={handleChange}
              />
            }
            label={`Account custom field 4 (${AccountContextKeys.CUSTOM_FIELD_4})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_5)}
                value={AccountContextKeys.CUSTOM_FIELD_5}
                onChange={handleChange}
              />
            }
            label={`Account custom field 5 (${AccountContextKeys.CUSTOM_FIELD_5})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_6)}
                value={AccountContextKeys.CUSTOM_FIELD_6}
                onChange={handleChange}
              />
            }
            label={`Account custom field 6 (${AccountContextKeys.CUSTOM_FIELD_6})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_7)}
                value={AccountContextKeys.CUSTOM_FIELD_7}
                onChange={handleChange}
              />
            }
            label={`Account custom field 7 (${AccountContextKeys.CUSTOM_FIELD_7})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_8)}
                value={AccountContextKeys.CUSTOM_FIELD_8}
                onChange={handleChange}
              />
            }
            label={`Account custom field 8 (${AccountContextKeys.CUSTOM_FIELD_8})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_9)}
                value={AccountContextKeys.CUSTOM_FIELD_9}
                onChange={handleChange}
              />
            }
            label={`Account custom field 9 (${AccountContextKeys.CUSTOM_FIELD_9})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_10)}
                value={AccountContextKeys.CUSTOM_FIELD_10}
                onChange={handleChange}
              />
            }
            label={`Account custom field 10 (${AccountContextKeys.CUSTOM_FIELD_10})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_11)}
                value={AccountContextKeys.CUSTOM_FIELD_11}
                onChange={handleChange}
              />
            }
            label={`Account custom field 11 (${AccountContextKeys.CUSTOM_FIELD_11})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_12)}
                value={AccountContextKeys.CUSTOM_FIELD_12}
                onChange={handleChange}
              />
            }
            label={`Account custom field 12 (${AccountContextKeys.CUSTOM_FIELD_12})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_13)}
                value={AccountContextKeys.CUSTOM_FIELD_13}
                onChange={handleChange}
              />
            }
            label={`Account custom field 13 (${AccountContextKeys.CUSTOM_FIELD_13})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_14)}
                value={AccountContextKeys.CUSTOM_FIELD_14}
                onChange={handleChange}
              />
            }
            label={`Account custom field 14 (${AccountContextKeys.CUSTOM_FIELD_14})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_15)}
                value={AccountContextKeys.CUSTOM_FIELD_15}
                onChange={handleChange}
              />
            }
            label={`Account custom field 15 (${AccountContextKeys.CUSTOM_FIELD_15})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_16)}
                value={AccountContextKeys.CUSTOM_FIELD_16}
                onChange={handleChange}
              />
            }
            label={`Account custom field 16 (${AccountContextKeys.CUSTOM_FIELD_16})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_17)}
                value={AccountContextKeys.CUSTOM_FIELD_17}
                onChange={handleChange}
              />
            }
            label={`Account custom field 17 (${AccountContextKeys.CUSTOM_FIELD_17})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_18)}
                value={AccountContextKeys.CUSTOM_FIELD_18}
                onChange={handleChange}
              />
            }
            label={`Account custom field 18 (${AccountContextKeys.CUSTOM_FIELD_18})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_19)}
                value={AccountContextKeys.CUSTOM_FIELD_19}
                onChange={handleChange}
              />
            }
            label={`Account custom field 19 (${AccountContextKeys.CUSTOM_FIELD_19})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_20)}
                value={AccountContextKeys.CUSTOM_FIELD_20}
                onChange={handleChange}
              />
            }
            label={`Account custom field 20 (${AccountContextKeys.CUSTOM_FIELD_20})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_21)}
                value={AccountContextKeys.CUSTOM_FIELD_21}
                onChange={handleChange}
              />
            }
            label={`Account custom field 21 (${AccountContextKeys.CUSTOM_FIELD_21})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_22)}
                value={AccountContextKeys.CUSTOM_FIELD_22}
                onChange={handleChange}
              />
            }
            label={`Account custom field 22 (${AccountContextKeys.CUSTOM_FIELD_22})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_23)}
                value={AccountContextKeys.CUSTOM_FIELD_23}
                onChange={handleChange}
              />
            }
            label={`Account custom field 23 (${AccountContextKeys.CUSTOM_FIELD_23})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_24)}
                value={AccountContextKeys.CUSTOM_FIELD_24}
                onChange={handleChange}
              />
            }
            label={`Account custom field 24 (${AccountContextKeys.CUSTOM_FIELD_24})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_25)}
                value={AccountContextKeys.CUSTOM_FIELD_25}
                onChange={handleChange}
              />
            }
            label={`Account custom field 25 (${AccountContextKeys.CUSTOM_FIELD_25})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_26)}
                value={AccountContextKeys.CUSTOM_FIELD_26}
                onChange={handleChange}
              />
            }
            label={`Account custom field 26 (${AccountContextKeys.CUSTOM_FIELD_26})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_27)}
                value={AccountContextKeys.CUSTOM_FIELD_27}
                onChange={handleChange}
              />
            }
            label={`Account custom field 27 (${AccountContextKeys.CUSTOM_FIELD_27})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_28)}
                value={AccountContextKeys.CUSTOM_FIELD_28}
                onChange={handleChange}
              />
            }
            label={`Account custom field 28 (${AccountContextKeys.CUSTOM_FIELD_28})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_29)}
                value={AccountContextKeys.CUSTOM_FIELD_29}
                onChange={handleChange}
              />
            }
            label={`Account custom field 29 (${AccountContextKeys.CUSTOM_FIELD_29})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_30)}
                value={AccountContextKeys.CUSTOM_FIELD_30}
                onChange={handleChange}
              />
            }
            label={`Account custom field 30 (${AccountContextKeys.CUSTOM_FIELD_30})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_31)}
                value={AccountContextKeys.CUSTOM_FIELD_31}
                onChange={handleChange}
              />
            }
            label={`Account custom field 31 (${AccountContextKeys.CUSTOM_FIELD_31})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_32)}
                value={AccountContextKeys.CUSTOM_FIELD_32}
                onChange={handleChange}
              />
            }
            label={`Account custom field 32 (${AccountContextKeys.CUSTOM_FIELD_32})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_33)}
                value={AccountContextKeys.CUSTOM_FIELD_33}
                onChange={handleChange}
              />
            }
            label={`Account custom field 33 (${AccountContextKeys.CUSTOM_FIELD_33})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_34)}
                value={AccountContextKeys.CUSTOM_FIELD_34}
                onChange={handleChange}
              />
            }
            label={`Account custom field 34 (${AccountContextKeys.CUSTOM_FIELD_34})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_35)}
                value={AccountContextKeys.CUSTOM_FIELD_35}
                onChange={handleChange}
              />
            }
            label={`Account custom field 35 (${AccountContextKeys.CUSTOM_FIELD_35})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_36)}
                value={AccountContextKeys.CUSTOM_FIELD_36}
                onChange={handleChange}
              />
            }
            label={`Account custom field 36 (${AccountContextKeys.CUSTOM_FIELD_36})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_37)}
                value={AccountContextKeys.CUSTOM_FIELD_37}
                onChange={handleChange}
              />
            }
            label={`Account custom field 37 (${AccountContextKeys.CUSTOM_FIELD_37})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_38)}
                value={AccountContextKeys.CUSTOM_FIELD_38}
                onChange={handleChange}
              />
            }
            label={`Account custom field 38 (${AccountContextKeys.CUSTOM_FIELD_38})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_39)}
                value={AccountContextKeys.CUSTOM_FIELD_39}
                onChange={handleChange}
              />
            }
            label={`Account custom field 39 (${AccountContextKeys.CUSTOM_FIELD_39})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_40)}
                value={AccountContextKeys.CUSTOM_FIELD_40}
                onChange={handleChange}
              />
            }
            label={`Account custom field 40 (${AccountContextKeys.CUSTOM_FIELD_40})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_41)}
                value={AccountContextKeys.CUSTOM_FIELD_41}
                onChange={handleChange}
              />
            }
            label={`Account custom field 41 (${AccountContextKeys.CUSTOM_FIELD_41})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_42)}
                value={AccountContextKeys.CUSTOM_FIELD_42}
                onChange={handleChange}
              />
            }
            label={`Account custom field 42 (${AccountContextKeys.CUSTOM_FIELD_42})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_43)}
                value={AccountContextKeys.CUSTOM_FIELD_43}
                onChange={handleChange}
              />
            }
            label={`Account custom field 43 (${AccountContextKeys.CUSTOM_FIELD_43})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_44)}
                value={AccountContextKeys.CUSTOM_FIELD_44}
                onChange={handleChange}
              />
            }
            label={`Account custom field 44 (${AccountContextKeys.CUSTOM_FIELD_44})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_45)}
                value={AccountContextKeys.CUSTOM_FIELD_45}
                onChange={handleChange}
              />
            }
            label={`Account custom field 45 (${AccountContextKeys.CUSTOM_FIELD_45})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_46)}
                value={AccountContextKeys.CUSTOM_FIELD_46}
                onChange={handleChange}
              />
            }
            label={`Account custom field 46 (${AccountContextKeys.CUSTOM_FIELD_46})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_47)}
                value={AccountContextKeys.CUSTOM_FIELD_47}
                onChange={handleChange}
              />
            }
            label={`Account custom field 47 (${AccountContextKeys.CUSTOM_FIELD_47})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_48)}
                value={AccountContextKeys.CUSTOM_FIELD_48}
                onChange={handleChange}
              />
            }
            label={`Account custom field 48 (${AccountContextKeys.CUSTOM_FIELD_48})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_49)}
                value={AccountContextKeys.CUSTOM_FIELD_49}
                onChange={handleChange}
              />
            }
            label={`Account custom field 49 (${AccountContextKeys.CUSTOM_FIELD_49})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_50)}
                value={AccountContextKeys.CUSTOM_FIELD_50}
                onChange={handleChange}
              />
            }
            label={`Account custom field 50 (${AccountContextKeys.CUSTOM_FIELD_50})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_51)}
                value={AccountContextKeys.CUSTOM_FIELD_51}
                onChange={handleChange}
              />
            }
            label={`Account custom field 51 (${AccountContextKeys.CUSTOM_FIELD_51})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_52)}
                value={AccountContextKeys.CUSTOM_FIELD_52}
                onChange={handleChange}
              />
            }
            label={`Account custom field 52 (${AccountContextKeys.CUSTOM_FIELD_52})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_53)}
                value={AccountContextKeys.CUSTOM_FIELD_53}
                onChange={handleChange}
              />
            }
            label={`Account custom field 53 (${AccountContextKeys.CUSTOM_FIELD_53})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_54)}
                value={AccountContextKeys.CUSTOM_FIELD_54}
                onChange={handleChange}
              />
            }
            label={`Account custom field 54 (${AccountContextKeys.CUSTOM_FIELD_54})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_55)}
                value={AccountContextKeys.CUSTOM_FIELD_55}
                onChange={handleChange}
              />
            }
            label={`Account custom field 55 (${AccountContextKeys.CUSTOM_FIELD_55})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_56)}
                value={AccountContextKeys.CUSTOM_FIELD_56}
                onChange={handleChange}
              />
            }
            label={`Account custom field 56 (${AccountContextKeys.CUSTOM_FIELD_56})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_57)}
                value={AccountContextKeys.CUSTOM_FIELD_57}
                onChange={handleChange}
              />
            }
            label={`Account custom field 57 (${AccountContextKeys.CUSTOM_FIELD_57})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_58)}
                value={AccountContextKeys.CUSTOM_FIELD_58}
                onChange={handleChange}
              />
            }
            label={`Account custom field 58 (${AccountContextKeys.CUSTOM_FIELD_58})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_59)}
                value={AccountContextKeys.CUSTOM_FIELD_59}
                onChange={handleChange}
              />
            }
            label={`Account custom field 59 (${AccountContextKeys.CUSTOM_FIELD_59})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_60)}
                value={AccountContextKeys.CUSTOM_FIELD_60}
                onChange={handleChange}
              />
            }
            label={`Account custom field 60 (${AccountContextKeys.CUSTOM_FIELD_60})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_61)}
                value={AccountContextKeys.CUSTOM_FIELD_61}
                onChange={handleChange}
              />
            }
            label={`Account custom field 61 (${AccountContextKeys.CUSTOM_FIELD_61})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_62)}
                value={AccountContextKeys.CUSTOM_FIELD_62}
                onChange={handleChange}
              />
            }
            label={`Account custom field 62 (${AccountContextKeys.CUSTOM_FIELD_62})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_63)}
                value={AccountContextKeys.CUSTOM_FIELD_63}
                onChange={handleChange}
              />
            }
            label={`Account custom field 63 (${AccountContextKeys.CUSTOM_FIELD_63})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_64)}
                value={AccountContextKeys.CUSTOM_FIELD_64}
                onChange={handleChange}
              />
            }
            label={`Account custom field 64 (${AccountContextKeys.CUSTOM_FIELD_64})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_65)}
                value={AccountContextKeys.CUSTOM_FIELD_65}
                onChange={handleChange}
              />
            }
            label={`Account custom field 65 (${AccountContextKeys.CUSTOM_FIELD_65})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_66)}
                value={AccountContextKeys.CUSTOM_FIELD_66}
                onChange={handleChange}
              />
            }
            label={`Account custom field 66 (${AccountContextKeys.CUSTOM_FIELD_66})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_67)}
                value={AccountContextKeys.CUSTOM_FIELD_67}
                onChange={handleChange}
              />
            }
            label={`Account custom field 67 (${AccountContextKeys.CUSTOM_FIELD_67})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_68)}
                value={AccountContextKeys.CUSTOM_FIELD_68}
                onChange={handleChange}
              />
            }
            label={`Account custom field 68 (${AccountContextKeys.CUSTOM_FIELD_68})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_69)}
                value={AccountContextKeys.CUSTOM_FIELD_69}
                onChange={handleChange}
              />
            }
            label={`Account custom field 69 (${AccountContextKeys.CUSTOM_FIELD_69})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_20)}
                value={AccountContextKeys.CUSTOM_FIELD_20}
                onChange={handleChange}
              />
            }
            label={`Account custom field 70 (${AccountContextKeys.CUSTOM_FIELD_70})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_71)}
                value={AccountContextKeys.CUSTOM_FIELD_71}
                onChange={handleChange}
              />
            }
            label={`Account custom field 71 (${AccountContextKeys.CUSTOM_FIELD_71})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_72)}
                value={AccountContextKeys.CUSTOM_FIELD_72}
                onChange={handleChange}
              />
            }
            label={`Account custom field 72 (${AccountContextKeys.CUSTOM_FIELD_72})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_73)}
                value={AccountContextKeys.CUSTOM_FIELD_73}
                onChange={handleChange}
              />
            }
            label={`Account custom field 73 (${AccountContextKeys.CUSTOM_FIELD_73})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_74)}
                value={AccountContextKeys.CUSTOM_FIELD_74}
                onChange={handleChange}
              />
            }
            label={`Account custom field 74 (${AccountContextKeys.CUSTOM_FIELD_74})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_75)}
                value={AccountContextKeys.CUSTOM_FIELD_75}
                onChange={handleChange}
              />
            }
            label={`Account custom field 75 (${AccountContextKeys.CUSTOM_FIELD_75})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_76)}
                value={AccountContextKeys.CUSTOM_FIELD_76}
                onChange={handleChange}
              />
            }
            label={`Account custom field 76 (${AccountContextKeys.CUSTOM_FIELD_76})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_77)}
                value={AccountContextKeys.CUSTOM_FIELD_77}
                onChange={handleChange}
              />
            }
            label={`Account custom field 77 (${AccountContextKeys.CUSTOM_FIELD_77})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_78)}
                value={AccountContextKeys.CUSTOM_FIELD_78}
                onChange={handleChange}
              />
            }
            label={`Account custom field 78 (${AccountContextKeys.CUSTOM_FIELD_78})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_79)}
                value={AccountContextKeys.CUSTOM_FIELD_79}
                onChange={handleChange}
              />
            }
            label={`Account custom field 79 (${AccountContextKeys.CUSTOM_FIELD_79})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_80)}
                value={AccountContextKeys.CUSTOM_FIELD_80}
                onChange={handleChange}
              />
            }
            label={`Account custom field 80 (${AccountContextKeys.CUSTOM_FIELD_80})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_81)}
                value={AccountContextKeys.CUSTOM_FIELD_81}
                onChange={handleChange}
              />
            }
            label={`Account custom field 81 (${AccountContextKeys.CUSTOM_FIELD_81})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_82)}
                value={AccountContextKeys.CUSTOM_FIELD_82}
                onChange={handleChange}
              />
            }
            label={`Account custom field 82 (${AccountContextKeys.CUSTOM_FIELD_82})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_83)}
                value={AccountContextKeys.CUSTOM_FIELD_83}
                onChange={handleChange}
              />
            }
            label={`Account custom field 83 (${AccountContextKeys.CUSTOM_FIELD_83})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_84)}
                value={AccountContextKeys.CUSTOM_FIELD_84}
                onChange={handleChange}
              />
            }
            label={`Account custom field 84 (${AccountContextKeys.CUSTOM_FIELD_84})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_85)}
                value={AccountContextKeys.CUSTOM_FIELD_85}
                onChange={handleChange}
              />
            }
            label={`Account custom field 85 (${AccountContextKeys.CUSTOM_FIELD_85})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_86)}
                value={AccountContextKeys.CUSTOM_FIELD_86}
                onChange={handleChange}
              />
            }
            label={`Account custom field 86 (${AccountContextKeys.CUSTOM_FIELD_86})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_87)}
                value={AccountContextKeys.CUSTOM_FIELD_87}
                onChange={handleChange}
              />
            }
            label={`Account custom field 87 (${AccountContextKeys.CUSTOM_FIELD_87})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_88)}
                value={AccountContextKeys.CUSTOM_FIELD_88}
                onChange={handleChange}
              />
            }
            label={`Account custom field 88 (${AccountContextKeys.CUSTOM_FIELD_88})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_89)}
                value={AccountContextKeys.CUSTOM_FIELD_89}
                onChange={handleChange}
              />
            }
            label={`Account custom field 89 (${AccountContextKeys.CUSTOM_FIELD_89})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_90)}
                value={AccountContextKeys.CUSTOM_FIELD_90}
                onChange={handleChange}
              />
            }
            label={`Account custom field 90 (${AccountContextKeys.CUSTOM_FIELD_90})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_91)}
                value={AccountContextKeys.CUSTOM_FIELD_91}
                onChange={handleChange}
              />
            }
            label={`Account custom field 91 (${AccountContextKeys.CUSTOM_FIELD_91})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_92)}
                value={AccountContextKeys.CUSTOM_FIELD_92}
                onChange={handleChange}
              />
            }
            label={`Account custom field 92 (${AccountContextKeys.CUSTOM_FIELD_92})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_93)}
                value={AccountContextKeys.CUSTOM_FIELD_93}
                onChange={handleChange}
              />
            }
            label={`Account custom field 93 (${AccountContextKeys.CUSTOM_FIELD_93})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_94)}
                value={AccountContextKeys.CUSTOM_FIELD_94}
                onChange={handleChange}
              />
            }
            label={`Account custom field 94 (${AccountContextKeys.CUSTOM_FIELD_94})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_95)}
                value={AccountContextKeys.CUSTOM_FIELD_95}
                onChange={handleChange}
              />
            }
            label={`Account custom field 95 (${AccountContextKeys.CUSTOM_FIELD_95})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_96)}
                value={AccountContextKeys.CUSTOM_FIELD_96}
                onChange={handleChange}
              />
            }
            label={`Account custom field 96 (${AccountContextKeys.CUSTOM_FIELD_96})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_97)}
                value={AccountContextKeys.CUSTOM_FIELD_97}
                onChange={handleChange}
              />
            }
            label={`Account custom field 97 (${AccountContextKeys.CUSTOM_FIELD_97})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_98)}
                value={AccountContextKeys.CUSTOM_FIELD_98}
                onChange={handleChange}
              />
            }
            label={`Account custom field 98 (${AccountContextKeys.CUSTOM_FIELD_98})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_99)}
                value={AccountContextKeys.CUSTOM_FIELD_99}
                onChange={handleChange}
              />
            }
            label={`Account custom field 99 (${AccountContextKeys.CUSTOM_FIELD_99})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(AccountContextKeys.CUSTOM_FIELD_100)}
                value={AccountContextKeys.CUSTOM_FIELD_100}
                onChange={handleChange}
              />
            }
            label={`Account custom field 100 (${AccountContextKeys.CUSTOM_FIELD_100})`}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
});

export default AccountContextInfo;
