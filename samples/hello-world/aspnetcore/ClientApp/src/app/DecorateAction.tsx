import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Button, TextField, makeStyles, createStyles, Theme, DialogContent, Dialog, DialogTitle } from '@material-ui/core';
import addonSdk  from '@outreach/client-addon-sdk';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    actionHeading: {
      paddingBottom: theme.spacing(),
    },
    actionOptions: {
      marginTop: theme.spacing(),
    },
    actionRoot: {
      alignSelf: 'flex-start',
      borderColor: theme.palette.divider,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.spacing(),
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    }
  })
);


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
      <DialogContent className={classes.root}>
        <TextField
          placeholder="Enter the text to decorate addon entry point"
          label="Decoration text"
          variant="outlined"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
        />
        <Button variant="contained" className={classes.actionButton} disabled={!text} color="primary" onClick={decorate}>
          Update decoration
        </Button>
      </DialogContent>
    </Dialog>
  );
});

export default DecorateAction;
