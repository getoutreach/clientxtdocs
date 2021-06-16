import {
  makeStyles,
  createStyles,
  Button,
  Typography,
  IconButton,
  TextField,
  Theme,
} from '@material-ui/core';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { useContext } from 'react';
import { EditorStoreContext } from '../../stores/EditorStore';
import DeleteIcon from '@material-ui/icons/Delete';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      alignSelf: 'flex-start',
      marginBottom: theme.spacing(2),
    },
    configItemOptions: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    option: {
      display: 'flex',
      flexDirection: 'column',
      borderColor: theme.palette.divider,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: theme.spacing(),
      margin: theme.spacing(),
    },
    optionHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      width: 250,
      marginBottom: theme.spacing(1.5),
    },
  })
);

interface IConfigItemOptionsProps {
  item: ConfigurationItem;
  index: number;
}

const ConfigItemOptions: React.FC<IConfigItemOptionsProps> = (
  props: IConfigItemOptionsProps
) => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const handleAddConfigItemOption = () => {
    editorStore.addNewConfigurationOption(props.index);
  };

  const handleOptionTextChanged = (value: string, index: number) => {
    const configItem: ConfigurationItem = { ...props.item };

    if (configItem.options) {
      const option = configItem.options[index];
      option.text.en = value;
      editorStore.updateConfigurationItem(configItem, props.index);
    }
  };
  const handleOptionValueChanged = (value: string, index: number) => {
    const configItem: ConfigurationItem = { ...props.item };

    if (configItem.options) {
      const option = configItem.options[index];
      option.value = value;
      editorStore.updateConfigurationItem(configItem, props.index);
    }
  };

  const handleDeleteConfigurationItem = (index: number) => {
    const configItem: ConfigurationItem = { ...props.item };

    if (configItem.options && configItem.options.length > index) {
      configItem.options.splice(index, 1);
      editorStore.updateConfigurationItem(configItem, props.index);
    }
  };

  return (
    <div className={classes.configItemOptions}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleAddConfigItemOption}
      >
        Add config option
      </Button>
      {props.item.options!.map((opt, idx) => (
        <div className={classes.optionGroup}>
          <div className={classes.optionHeading}>
            <Typography variant="subtitle1">Option # {idx + 1}</Typography>
            <IconButton
              style={{ marginLeft: 4 }}
              title="Delete configuration item option"
              onClick={() => handleDeleteConfigurationItem(idx)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={classes.option}>
            <TextField
              key={`opt-${idx}-key`}
              className={classes.textField}
              required={true}
              type="text"
              label={`Option #${idx + 1} text`}
              variant="outlined"
              value={opt.text.en}
              onChange={(e) => handleOptionTextChanged(e.target.value, idx)}
              inputProps={{
                className: classes.input,
              }}
            ></TextField>
            <TextField
              key={`opt-${idx}-value`}
              className={classes.textField}
              required={true}
              type="text"
              label={`Option #${idx + 1} value`}
              variant="outlined"
              value={opt.value}
              onChange={(e) => handleOptionValueChanged(e.target.value, idx)}
              inputProps={{
                className: classes.input,
              }}
            ></TextField>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfigItemOptions;
