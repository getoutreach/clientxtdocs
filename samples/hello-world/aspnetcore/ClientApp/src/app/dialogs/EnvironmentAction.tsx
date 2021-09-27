import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormControlLabel,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import extensibilitySdk from '@outreach/extensibility-sdk';
import CodeSample from '../components/CodeSample';
import { useStyles } from './DialogStyle';
import { DecorationStyle } from '@outreach/extensibility-sdk';

interface IEnvironmentActionProps {
  onClose: () => void;
  open: boolean;
}

const EnvironmentAction: React.FC<IEnvironmentActionProps> = observer((props: IEnvironmentActionProps) => {
  const classes = useStyles();
  const [fullWidth, setFullWidth] = useState<boolean>(true);
  const [badgeType, setBageType] = useState<DecorationStyle>(DecorationStyle.FULL);

  const update = () => {
    extensibilitySdk.environment({
      fullWidth: fullWidth,
      decoration: badgeType,
    });

    props.onClose();
  };

  const payload = `{ 
    fullWidth: ${fullWidth}, 
    decoration:'${badgeType}'
  }`;

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host notifications</DialogTitle>
      <DialogContent className={classes.container}>
        <FormControlLabel
          control={
            <Switch checked={fullWidth} onChange={() => setFullWidth(!fullWidth)} name="fullWidth" color="primary" />
          }
          label="Full width"
        />
        <FormControl component="fieldset" className={classes.actionOptions}>
          <InputLabel id="badge-type-title">Badge type</InputLabel>
          <Select
            label="Badge type"
            labelId="badge-type-title"
            variant="outlined"
            value={badgeType}
            onChange={e => setBageType(e.target.value as DecorationStyle)}
          >
            <MenuItem key="none" value="none">
              None
            </MenuItem>
            <MenuItem key="simple" value="simple">
              Simple
            </MenuItem>
            <MenuItem key="full" value="full">
              Full
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          className={classes.actionButton}
          color="primary"
          onClick={() => update()}
        >
          Send notification
        </Button>
        <CodeSample>
          <>extensibilitySdk.environment({payload})</>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default EnvironmentAction;
