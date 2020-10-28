import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, TextField, DialogContent, Dialog, DialogTitle } from '@material-ui/core';
import addonSdk  from '@outreach/client-addon-sdk';
import { useStyles } from './DialogStyle';
import CodeSample from '../components/CodeSample';

interface IDecorationActionProps {
  onClose: () => void;
  open: boolean;
}

const DecorateAction: React.FC<IDecorationActionProps> = observer((props: IDecorationActionProps) => {
  const [text, setText] = useState<string>('');
  const classes = useStyles();

  const decorate = () => {
    if (!text) {
      return;
    }

    addonSdk.decorate(text);

    setText('');
    props.onClose();
  };

  return  (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host addon decoration</DialogTitle>
      <DialogContent className={classes.container}>
        <TextField
          placeholder="Addon entry point decoration"
          label="Decoration text"
          variant="outlined"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
        />
        <Button variant="contained" className={classes.actionButton} disabled={!text} color="primary" onClick={decorate}>
          Update decoration
        </Button>
        <CodeSample>
          <>
            addonSdk.decorate('{text}')
          </>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default DecorateAction;
