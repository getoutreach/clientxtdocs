import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import extensibilitySdk from '@outreach/extensibility-sdk';
import CodeSample from '../components/CodeSample';
import { useStyles } from './DialogStyle';

interface IConfigurationActionProps {
  onClose: () => void;
  open: boolean;
}

const ConfigureAction: React.FC<IConfigurationActionProps> = observer((props: IConfigurationActionProps) => {
  const classes = useStyles();

  const onConfigureClick = async () => {
    extensibilitySdk.configure();
    props.onClose();
  };

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Addon configuration</DialogTitle>
      <DialogContent className={classes.container}>
        <Button variant="contained" className={classes.button} color="primary" onClick={onConfigureClick}>
          Configure
        </Button>
        <CodeSample>
          <>extensibilitySdk.configure()</>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default ConfigureAction;
