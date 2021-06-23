import React from 'react';
import { observer } from 'mobx-react-lite';

import {
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { toJS } from 'mobx';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: {
      fontWeight: 600,
    },
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      padding: theme.spacing(),
    },
    title: {
      paddingBottom: theme.spacing(),
    },
  })
);

const TextEditor: React.FC<IEditorProps> = observer((props: IEditorProps) => {
  const classes = useStyles();
  return (
    <TextField
      defaultValue={props.item.defaultValue}
      className={classes.textField}
      required={props.item.required}
      type="text"
      label={props.item.text.en}
      variant="outlined"
      inputProps={{
        className: classes.input,
        pattern: props.item.validator,
      }}
    ></TextField>
  );
});

const NumberEditor: React.FC<IEditorProps> = observer((props: IEditorProps) => {
  const classes = useStyles();
  return (
    <TextField
      defaultValue={props.item.defaultValue}
      className={classes.textField}
      required={props.item.required}
      type="number"
      label={props.item.text.en}
      variant="outlined"
      inputProps={{
        className: classes.input,
        pattern: props.item.validator,
      }}
    ></TextField>
  );
});

const DateEditor: React.FC<IEditorProps> = observer((props: IEditorProps) => {
  const classes = useStyles();
  return (
    <TextField
      defaultValue={props.item.defaultValue}
      className={classes.textField}
      required={props.item.required}
      type="date"
      label={props.item.text.en}
      variant="outlined"
      inputProps={{
        className: classes.input,
        pattern: props.item.validator,
      }}
    ></TextField>
  );
});

const UriEditor: React.FC<IEditorProps> = observer((props: IEditorProps) => {
  const classes = useStyles();
  return (
    <TextField
      defaultValue={props.item.defaultValue}
      className={classes.textField}
      required={props.item.required}
      type="url"
      label={props.item.text.en}
      variant="outlined"
      inputProps={{
        className: classes.input,
        pattern: props.item.validator,
      }}
    ></TextField>
  );
});

const SelectEditor: React.FC<IEditorProps> = observer((props: IEditorProps) => {
  const classes = useStyles();

  return (
    <TextField
      defaultValue={props.item.defaultValue}
      className={classes.textField}
      required={props.item.required}
      type="text"
      label={props.item.text.en}
      variant="outlined"
      select={true}
      inputProps={{
        className: classes.input,
        pattern: props.item.validator,
      }}
    >
      {props.item.options!.map((opt, idx) => (
        <MenuItem key={`slc-${props.item.key}-${idx}`} value={opt.value}>
          {opt.text.en}
        </MenuItem>
      ))}
    </TextField>
  );
});

const OptionsEditor: React.FC<IEditorProps> = observer(
  (props: IEditorProps) => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.item.text.en}</FormLabel>
        <RadioGroup
          aria-label={props.item.text.en}
          value={props.item.defaultValue}
          /*
                    value={props.item.value}
                    onChange={handleChange}
                    */
        >
          {props.item.options!.map((opt, idx) => (
            <FormControlLabel
              key={`slc-${props.item.key}-${idx}`}
              value={opt.value}
              control={<Radio />}
              label={opt.text.en}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
);

interface IConfigurationProps {
  configuration?: ConfigurationItem[];
}

const Configuration: React.FC<IConfigurationProps> = observer(
  (props: IConfigurationProps) => {
    const classes = useStyles();

    console.log('[Configuration.tsx]::ctor', toJS(props.configuration));

    if (!props.configuration) {
      return <></>;
    }

    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="subtitle1" className={classes.bold}>
            Please enter configuration values
          </Typography>
        </div>

        {props.configuration.map((cfg, idx) => {
          switch (cfg.type) {
            case 'string':
              return <TextEditor key={`cfg-item-${idx}`} item={cfg} />;
            case 'number':
              return <NumberEditor key={`cfg-item-${idx}`} item={cfg} />;
            case 'date':
              return <DateEditor key={`cfg-item-${idx}`} item={cfg} />;
            case 'uri':
              return <UriEditor key={`cfg-item-${idx}`} item={cfg} />;
            case 'select':
              return <SelectEditor key={`cfg-item-${idx}`} item={cfg} />;
            case 'options':
              return <OptionsEditor key={`cfg-item-${idx}`} item={cfg} />;
            default:
              console.error(
                'Editor for type:' + cfg.type + ' not implemented, yet'
              );
              return <TextEditor key={`cfg-item-${idx}`} item={cfg} />;
          }
        })}
      </div>
    );
  }
);

interface IEditorProps {
  item: ConfigurationItem;
}

export default Configuration;
