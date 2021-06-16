import {
  Typography,
  IconButton,
  TextField,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { ConfigurationItemType } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItemType';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfigItemOptions from './ConfigItemOptions';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    configItem: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(2),
    },
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    optionHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    select: {
      width: 250,
      marginBottom: theme.spacing(1.5),
    },
    textField: {
      width: 250,
      marginBottom: theme.spacing(1.5),
    },
  })
);

interface IConfigItemInfoProps {
  item: ConfigurationItem;
  index: number;
  onChange: (item: ConfigurationItem, index: number) => void;
  onDelete: (index: number) => void;
}

const ConfigItemInfo: React.FC<IConfigItemInfoProps> = (
  props: IConfigItemInfoProps
) => {
  const classes = useStyles();

  return (
    <div className={classes.configItem}>
      <div className={classes.optionHeading}>
        <Typography variant="subtitle1">
          Configuration item # {props.index + 1}
        </Typography>
        <IconButton
          style={{ marginLeft: 4 }}
          onClick={() => props.onDelete(props.index)}
          title="Delete configuration item option"
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <TextField
        id="key"
        className={classes.textField}
        variant="outlined"
        label="Key"
        required={true}
        placeholder="ex. api-key"
        value={props.item.key}
        title="This is the key which Outreach will use when sending you the current user configuration value"
        onChange={(e) =>
          props.onChange({ ...props.item, key: e.target.value }, props.index)
        }
        inputProps={{
          className: classes.input,
        }}
      />

      <TextField
        id="label"
        className={classes.textField}
        variant="outlined"
        label="Label"
        required={true}
        placeholder="ex. Your Contoso API key"
        value={props.item.text.en}
        title="This is the key which Outreach will use when sending you the current user configuration value"
        style={{
          width: 250,
        }}
        onChange={(e) =>
          props.onChange(
            {
              ...props.item,
              text: {
                en: e.target.value,
              },
            },
            props.index
          )
        }
        inputProps={{
          className: classes.input,
        }}
      />

      <TextField
        id="data-type"
        className={classes.select}
        select={true}
        required={true}
        variant="outlined"
        label="Data type"
        value={props.item.type}
        onChange={(e) => {
          const configurationItem = {
            ...props.item,
            type: e.target.value as ConfigurationItemType,
          } as ConfigurationItem;
          if (
            configurationItem.type !== 'options' &&
            configurationItem.type !== 'select'
          ) {
            delete configurationItem.options;
          }
          props.onChange(configurationItem, props.index);
        }}
        inputProps={{
          className: classes.input,
        }}
      >
        <MenuItem key="string" value="string">
          Text
        </MenuItem>
        <MenuItem key="number" value="number">
          Number
        </MenuItem>
        <MenuItem key="date" value="date">
          Date
        </MenuItem>
        <MenuItem key="uri" value="uri">
          Uri
        </MenuItem>
        <MenuItem key="options" value="options">
          Options
        </MenuItem>
        <MenuItem key="select" value="select">
          Select
        </MenuItem>
      </TextField>

      <TextField
        id="required"
        className={classes.select}
        select={true}
        variant="outlined"
        required={true}
        label="Is mandatory?"
        value={props.item.required}
        onChange={(e) =>
          props.onChange(
            {
              ...props.item,
              required: e.target.value === 'true',
            },
            props.index
          )
        }
        inputProps={{
          className: classes.input,
        }}
      >
        <MenuItem key="required-yes" value="true">
          Yes
        </MenuItem>
        <MenuItem key="required-no" value="false">
          No
        </MenuItem>
      </TextField>
      <TextField
        id="urlIncluded"
        className={classes.select}
        select={true}
        variant="outlined"
        required={true}
        label="Visible in url"
        value={props.item.urlInclude}
        onChange={(e) =>
          props.onChange(
            {
              ...props.item,
              urlInclude: e.target.value === 'true',
            },
            props.index
          )
        }
        inputProps={{
          className: classes.input,
        }}
      >
        <MenuItem key="included-yes" value="true">
          Yes
        </MenuItem>
        <MenuItem key="included-no" value="false">
          No
        </MenuItem>
      </TextField>
      <TextField
        id="default-value"
        className={classes.textField}
        variant="outlined"
        label="Default value"
        required={false}
        value={props.item.defaultValue}
        onChange={(e) =>
          props.onChange(
            {
              ...props.item,
              defaultValue: e.target.value,
            },
            props.index
          )
        }
        inputProps={{
          className: classes.input,
        }}
      />
      <TextField
        id="regex-validation"
        className={classes.textField}
        variant="outlined"
        label="Regex validator"
        required={false}
        value={props.item.validator}
        onChange={(e) =>
          props.onChange(
            {
              ...props.item,
              validator: e.target.value,
            },
            props.index
          )
        }
        inputProps={{
          className: classes.input,
        }}
      />

      {(props.item.type === 'options' || props.item.type === 'select') && (
        <ConfigItemOptions item={props.item} index={props.index} />
      )}
    </div>
  );
};

export default ConfigItemInfo;
