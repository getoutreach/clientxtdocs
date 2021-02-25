import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from '@material-ui/core';
import addonSdk from '@outreach/client-addon-sdk';
import CodeSample from '../components/CodeSample';
import { useStyles } from './DialogStyle';

interface IEnvironmentActionProps {
  onClose: () => void;
  open: boolean;
}

const EnvironmentAction: React.FC<IEnvironmentActionProps> = observer((props:IEnvironmentActionProps) => {
  const classes = useStyles();
  const [fullWidth, setFullWidth] = useState<boolean>(false);

  const update = () => {
    addonSdk.environment({
      fullWidth
    });

    props.onClose();
  };

  const payload = `{ fullWidth: ${fullWidth}}`;

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host notifications</DialogTitle>
      <DialogContent className={classes.container}>
        <FormControlLabel
          control={
            <Switch
              checked={fullWidth}
              onChange={() => setFullWidth(!fullWidth)}
              name="fullWidth"
              color="primary"
            />
          }
          label="Full width"
        />
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
          <>
            addonSdk.environment({payload})
          </>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default EnvironmentAction;
