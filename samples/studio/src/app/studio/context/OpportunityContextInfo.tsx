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
  OpportunityContextKeys,
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
                checked={isChecked(OpportunityContextKeys.AMOUNT)}
                value={OpportunityContextKeys.AMOUNT}
                onChange={handleChange}
              />
            }
            label={`Opportunity amount at (${OpportunityContextKeys.AMOUNT})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.DESCRIPTION)}
                value={OpportunityContextKeys.DESCRIPTION}
                onChange={handleChange}
              />
            }
            label={`Opportunity description (${OpportunityContextKeys.DESCRIPTION})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.EXTERNAL)}
                value={OpportunityContextKeys.EXTERNAL}
                onChange={handleChange}
              />
            }
            label={`Opportunity external info (${OpportunityContextKeys.EXTERNAL})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.EXTERNAL_CREATED_AT)}
                value={OpportunityContextKeys.EXTERNAL_CREATED_AT}
                onChange={handleChange}
              />
            }
            label={`Opportunity external created at (${OpportunityContextKeys.EXTERNAL_CREATED_AT})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.ID)}
                value={OpportunityContextKeys.ID}
                onChange={handleChange}
              />
            }
            label={`Opportunity identifier (${OpportunityContextKeys.ID})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.NAME)}
                value={OpportunityContextKeys.NAME}
                onChange={handleChange}
              />
            }
            label={`Opportunity name (${OpportunityContextKeys.NAME})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.NEXT_STEP)}
                value={OpportunityContextKeys.NEXT_STEP}
                onChange={handleChange}
              />
            }
            label={`Opportunity next step (${OpportunityContextKeys.NEXT_STEP})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.PROBABILITY)}
                value={OpportunityContextKeys.PROBABILITY}
                onChange={handleChange}
              />
            }
            label={`Opportunity probability (${OpportunityContextKeys.PROBABILITY})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.TAGS)}
                value={OpportunityContextKeys.TAGS}
                onChange={handleChange}
              />
            }
            label={`Opportunity tags (${OpportunityContextKeys.TAGS})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.TYPE)}
                value={OpportunityContextKeys.TYPE}
                onChange={handleChange}
              />
            }
            label={`Opportunity type (${OpportunityContextKeys.TYPE})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_1)}
                value={OpportunityContextKeys.CUSTOM_FIELD_1}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 1 (${OpportunityContextKeys.CUSTOM_FIELD_1})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_2)}
                value={OpportunityContextKeys.CUSTOM_FIELD_2}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 2 (${OpportunityContextKeys.CUSTOM_FIELD_2})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_3)}
                value={OpportunityContextKeys.CUSTOM_FIELD_3}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 3 (${OpportunityContextKeys.CUSTOM_FIELD_3})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_4)}
                value={OpportunityContextKeys.CUSTOM_FIELD_4}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 4 (${OpportunityContextKeys.CUSTOM_FIELD_4})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_5)}
                value={OpportunityContextKeys.CUSTOM_FIELD_5}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 5 (${OpportunityContextKeys.CUSTOM_FIELD_5})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_6)}
                value={OpportunityContextKeys.CUSTOM_FIELD_6}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 6 (${OpportunityContextKeys.CUSTOM_FIELD_6})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_7)}
                value={OpportunityContextKeys.CUSTOM_FIELD_7}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 7 (${OpportunityContextKeys.CUSTOM_FIELD_7})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_8)}
                value={OpportunityContextKeys.CUSTOM_FIELD_8}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 8 (${OpportunityContextKeys.CUSTOM_FIELD_8})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_9)}
                value={OpportunityContextKeys.CUSTOM_FIELD_9}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 9 (${OpportunityContextKeys.CUSTOM_FIELD_9})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_10)}
                value={OpportunityContextKeys.CUSTOM_FIELD_10}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 10 (${OpportunityContextKeys.CUSTOM_FIELD_10})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_11)}
                value={OpportunityContextKeys.CUSTOM_FIELD_11}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 11 (${OpportunityContextKeys.CUSTOM_FIELD_11})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_12)}
                value={OpportunityContextKeys.CUSTOM_FIELD_12}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 12 (${OpportunityContextKeys.CUSTOM_FIELD_12})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_13)}
                value={OpportunityContextKeys.CUSTOM_FIELD_13}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 13 (${OpportunityContextKeys.CUSTOM_FIELD_13})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_14)}
                value={OpportunityContextKeys.CUSTOM_FIELD_14}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 14 (${OpportunityContextKeys.CUSTOM_FIELD_14})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_15)}
                value={OpportunityContextKeys.CUSTOM_FIELD_15}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 15 (${OpportunityContextKeys.CUSTOM_FIELD_15})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_16)}
                value={OpportunityContextKeys.CUSTOM_FIELD_16}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 16 (${OpportunityContextKeys.CUSTOM_FIELD_16})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_17)}
                value={OpportunityContextKeys.CUSTOM_FIELD_17}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 17 (${OpportunityContextKeys.CUSTOM_FIELD_17})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_18)}
                value={OpportunityContextKeys.CUSTOM_FIELD_18}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 18 (${OpportunityContextKeys.CUSTOM_FIELD_18})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_19)}
                value={OpportunityContextKeys.CUSTOM_FIELD_19}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 19 (${OpportunityContextKeys.CUSTOM_FIELD_19})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_20)}
                value={OpportunityContextKeys.CUSTOM_FIELD_20}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 20 (${OpportunityContextKeys.CUSTOM_FIELD_20})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_21)}
                value={OpportunityContextKeys.CUSTOM_FIELD_21}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 21 (${OpportunityContextKeys.CUSTOM_FIELD_21})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_22)}
                value={OpportunityContextKeys.CUSTOM_FIELD_22}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 22 (${OpportunityContextKeys.CUSTOM_FIELD_22})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_23)}
                value={OpportunityContextKeys.CUSTOM_FIELD_23}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 23 (${OpportunityContextKeys.CUSTOM_FIELD_23})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_24)}
                value={OpportunityContextKeys.CUSTOM_FIELD_24}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 24 (${OpportunityContextKeys.CUSTOM_FIELD_24})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_25)}
                value={OpportunityContextKeys.CUSTOM_FIELD_25}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 25 (${OpportunityContextKeys.CUSTOM_FIELD_25})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_26)}
                value={OpportunityContextKeys.CUSTOM_FIELD_26}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 26 (${OpportunityContextKeys.CUSTOM_FIELD_26})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_27)}
                value={OpportunityContextKeys.CUSTOM_FIELD_27}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 27 (${OpportunityContextKeys.CUSTOM_FIELD_27})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_28)}
                value={OpportunityContextKeys.CUSTOM_FIELD_28}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 28 (${OpportunityContextKeys.CUSTOM_FIELD_28})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_29)}
                value={OpportunityContextKeys.CUSTOM_FIELD_29}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 29 (${OpportunityContextKeys.CUSTOM_FIELD_29})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_30)}
                value={OpportunityContextKeys.CUSTOM_FIELD_30}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 30 (${OpportunityContextKeys.CUSTOM_FIELD_30})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_31)}
                value={OpportunityContextKeys.CUSTOM_FIELD_31}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 31 (${OpportunityContextKeys.CUSTOM_FIELD_31})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_32)}
                value={OpportunityContextKeys.CUSTOM_FIELD_32}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 32 (${OpportunityContextKeys.CUSTOM_FIELD_32})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_33)}
                value={OpportunityContextKeys.CUSTOM_FIELD_33}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 33 (${OpportunityContextKeys.CUSTOM_FIELD_33})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_34)}
                value={OpportunityContextKeys.CUSTOM_FIELD_34}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 34 (${OpportunityContextKeys.CUSTOM_FIELD_34})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_35)}
                value={OpportunityContextKeys.CUSTOM_FIELD_35}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 35 (${OpportunityContextKeys.CUSTOM_FIELD_35})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_36)}
                value={OpportunityContextKeys.CUSTOM_FIELD_36}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 36 (${OpportunityContextKeys.CUSTOM_FIELD_36})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_37)}
                value={OpportunityContextKeys.CUSTOM_FIELD_37}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 37 (${OpportunityContextKeys.CUSTOM_FIELD_37})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_38)}
                value={OpportunityContextKeys.CUSTOM_FIELD_38}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 38 (${OpportunityContextKeys.CUSTOM_FIELD_38})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_39)}
                value={OpportunityContextKeys.CUSTOM_FIELD_39}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 39 (${OpportunityContextKeys.CUSTOM_FIELD_39})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_40)}
                value={OpportunityContextKeys.CUSTOM_FIELD_40}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 40 (${OpportunityContextKeys.CUSTOM_FIELD_40})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_41)}
                value={OpportunityContextKeys.CUSTOM_FIELD_41}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 41 (${OpportunityContextKeys.CUSTOM_FIELD_41})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_42)}
                value={OpportunityContextKeys.CUSTOM_FIELD_42}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 42 (${OpportunityContextKeys.CUSTOM_FIELD_42})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_43)}
                value={OpportunityContextKeys.CUSTOM_FIELD_43}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 43 (${OpportunityContextKeys.CUSTOM_FIELD_43})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_44)}
                value={OpportunityContextKeys.CUSTOM_FIELD_44}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 44 (${OpportunityContextKeys.CUSTOM_FIELD_44})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_45)}
                value={OpportunityContextKeys.CUSTOM_FIELD_45}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 45 (${OpportunityContextKeys.CUSTOM_FIELD_45})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_46)}
                value={OpportunityContextKeys.CUSTOM_FIELD_46}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 46 (${OpportunityContextKeys.CUSTOM_FIELD_46})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_47)}
                value={OpportunityContextKeys.CUSTOM_FIELD_47}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 47 (${OpportunityContextKeys.CUSTOM_FIELD_47})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_48)}
                value={OpportunityContextKeys.CUSTOM_FIELD_48}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 48 (${OpportunityContextKeys.CUSTOM_FIELD_48})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_49)}
                value={OpportunityContextKeys.CUSTOM_FIELD_49}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 49 (${OpportunityContextKeys.CUSTOM_FIELD_49})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_50)}
                value={OpportunityContextKeys.CUSTOM_FIELD_50}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 50 (${OpportunityContextKeys.CUSTOM_FIELD_50})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_51)}
                value={OpportunityContextKeys.CUSTOM_FIELD_51}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 51 (${OpportunityContextKeys.CUSTOM_FIELD_51})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_52)}
                value={OpportunityContextKeys.CUSTOM_FIELD_52}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 52 (${OpportunityContextKeys.CUSTOM_FIELD_52})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_53)}
                value={OpportunityContextKeys.CUSTOM_FIELD_53}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 53 (${OpportunityContextKeys.CUSTOM_FIELD_53})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_54)}
                value={OpportunityContextKeys.CUSTOM_FIELD_54}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 54 (${OpportunityContextKeys.CUSTOM_FIELD_54})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_55)}
                value={OpportunityContextKeys.CUSTOM_FIELD_55}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 55 (${OpportunityContextKeys.CUSTOM_FIELD_55})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_56)}
                value={OpportunityContextKeys.CUSTOM_FIELD_56}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 56 (${OpportunityContextKeys.CUSTOM_FIELD_56})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_57)}
                value={OpportunityContextKeys.CUSTOM_FIELD_57}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 57 (${OpportunityContextKeys.CUSTOM_FIELD_57})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_58)}
                value={OpportunityContextKeys.CUSTOM_FIELD_58}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 58 (${OpportunityContextKeys.CUSTOM_FIELD_58})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_59)}
                value={OpportunityContextKeys.CUSTOM_FIELD_59}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 59 (${OpportunityContextKeys.CUSTOM_FIELD_59})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_60)}
                value={OpportunityContextKeys.CUSTOM_FIELD_60}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 60 (${OpportunityContextKeys.CUSTOM_FIELD_60})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_61)}
                value={OpportunityContextKeys.CUSTOM_FIELD_61}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 61 (${OpportunityContextKeys.CUSTOM_FIELD_61})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_62)}
                value={OpportunityContextKeys.CUSTOM_FIELD_62}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 62 (${OpportunityContextKeys.CUSTOM_FIELD_62})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_63)}
                value={OpportunityContextKeys.CUSTOM_FIELD_63}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 63 (${OpportunityContextKeys.CUSTOM_FIELD_63})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_64)}
                value={OpportunityContextKeys.CUSTOM_FIELD_64}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 64 (${OpportunityContextKeys.CUSTOM_FIELD_64})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_65)}
                value={OpportunityContextKeys.CUSTOM_FIELD_65}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 65 (${OpportunityContextKeys.CUSTOM_FIELD_65})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_66)}
                value={OpportunityContextKeys.CUSTOM_FIELD_66}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 66 (${OpportunityContextKeys.CUSTOM_FIELD_66})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_67)}
                value={OpportunityContextKeys.CUSTOM_FIELD_67}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 67 (${OpportunityContextKeys.CUSTOM_FIELD_67})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_68)}
                value={OpportunityContextKeys.CUSTOM_FIELD_68}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 68 (${OpportunityContextKeys.CUSTOM_FIELD_68})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_69)}
                value={OpportunityContextKeys.CUSTOM_FIELD_69}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 69 (${OpportunityContextKeys.CUSTOM_FIELD_69})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_70)}
                value={OpportunityContextKeys.CUSTOM_FIELD_70}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 70 (${OpportunityContextKeys.CUSTOM_FIELD_70})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_71)}
                value={OpportunityContextKeys.CUSTOM_FIELD_71}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 71 (${OpportunityContextKeys.CUSTOM_FIELD_71})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_72)}
                value={OpportunityContextKeys.CUSTOM_FIELD_72}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 72 (${OpportunityContextKeys.CUSTOM_FIELD_72})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_73)}
                value={OpportunityContextKeys.CUSTOM_FIELD_73}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 73 (${OpportunityContextKeys.CUSTOM_FIELD_73})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_74)}
                value={OpportunityContextKeys.CUSTOM_FIELD_74}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 74 (${OpportunityContextKeys.CUSTOM_FIELD_74})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_75)}
                value={OpportunityContextKeys.CUSTOM_FIELD_75}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 75 (${OpportunityContextKeys.CUSTOM_FIELD_75})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_76)}
                value={OpportunityContextKeys.CUSTOM_FIELD_76}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 76 (${OpportunityContextKeys.CUSTOM_FIELD_76})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_77)}
                value={OpportunityContextKeys.CUSTOM_FIELD_77}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 77 (${OpportunityContextKeys.CUSTOM_FIELD_77})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_78)}
                value={OpportunityContextKeys.CUSTOM_FIELD_78}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 78 (${OpportunityContextKeys.CUSTOM_FIELD_78})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_79)}
                value={OpportunityContextKeys.CUSTOM_FIELD_79}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 79 (${OpportunityContextKeys.CUSTOM_FIELD_79})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_80)}
                value={OpportunityContextKeys.CUSTOM_FIELD_80}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 80 (${OpportunityContextKeys.CUSTOM_FIELD_80})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_81)}
                value={OpportunityContextKeys.CUSTOM_FIELD_81}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 81 (${OpportunityContextKeys.CUSTOM_FIELD_81})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_82)}
                value={OpportunityContextKeys.CUSTOM_FIELD_82}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 82 (${OpportunityContextKeys.CUSTOM_FIELD_82})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_83)}
                value={OpportunityContextKeys.CUSTOM_FIELD_83}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 83 (${OpportunityContextKeys.CUSTOM_FIELD_83})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_84)}
                value={OpportunityContextKeys.CUSTOM_FIELD_84}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 84 (${OpportunityContextKeys.CUSTOM_FIELD_84})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_85)}
                value={OpportunityContextKeys.CUSTOM_FIELD_85}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 85 (${OpportunityContextKeys.CUSTOM_FIELD_85})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_86)}
                value={OpportunityContextKeys.CUSTOM_FIELD_86}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 86 (${OpportunityContextKeys.CUSTOM_FIELD_86})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_87)}
                value={OpportunityContextKeys.CUSTOM_FIELD_87}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 87 (${OpportunityContextKeys.CUSTOM_FIELD_87})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_88)}
                value={OpportunityContextKeys.CUSTOM_FIELD_88}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 88 (${OpportunityContextKeys.CUSTOM_FIELD_88})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_89)}
                value={OpportunityContextKeys.CUSTOM_FIELD_89}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 89 (${OpportunityContextKeys.CUSTOM_FIELD_89})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_90)}
                value={OpportunityContextKeys.CUSTOM_FIELD_90}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 90 (${OpportunityContextKeys.CUSTOM_FIELD_90})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_91)}
                value={OpportunityContextKeys.CUSTOM_FIELD_91}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 91 (${OpportunityContextKeys.CUSTOM_FIELD_91})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_92)}
                value={OpportunityContextKeys.CUSTOM_FIELD_92}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 92 (${OpportunityContextKeys.CUSTOM_FIELD_92})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_93)}
                value={OpportunityContextKeys.CUSTOM_FIELD_93}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 93 (${OpportunityContextKeys.CUSTOM_FIELD_93})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_94)}
                value={OpportunityContextKeys.CUSTOM_FIELD_94}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 94 (${OpportunityContextKeys.CUSTOM_FIELD_94})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_95)}
                value={OpportunityContextKeys.CUSTOM_FIELD_95}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 95 (${OpportunityContextKeys.CUSTOM_FIELD_95})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_96)}
                value={OpportunityContextKeys.CUSTOM_FIELD_96}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 96 (${OpportunityContextKeys.CUSTOM_FIELD_96})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_97)}
                value={OpportunityContextKeys.CUSTOM_FIELD_97}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 97 (${OpportunityContextKeys.CUSTOM_FIELD_97})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_98)}
                value={OpportunityContextKeys.CUSTOM_FIELD_98}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 98 (${OpportunityContextKeys.CUSTOM_FIELD_98})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_99)}
                value={OpportunityContextKeys.CUSTOM_FIELD_99}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 99 (${OpportunityContextKeys.CUSTOM_FIELD_99})`}
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                checked={isChecked(OpportunityContextKeys.CUSTOM_FIELD_100)}
                value={OpportunityContextKeys.CUSTOM_FIELD_100}
                onChange={handleChange}
              />
            }
            label={`Opportunity custom field 100 (${OpportunityContextKeys.CUSTOM_FIELD_100})`}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
});

export default ProspectContextInfo;
