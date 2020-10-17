import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Button, TextField, makeStyles, createStyles, Theme, DialogContent, Dialog, DialogTitle, Divider, Typography } from '@material-ui/core';
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
    code: {
      padding: theme.spacing(0.5),
      fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
      fontWeight: "lighter"
    },
    divider: {
      marginBottom: theme.spacing(0.5),
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

  const codeSample = () => {
    return <div>
      <Divider className={classes.divider}  />
      <Typography variant="overline">
          Code sample
      </Typography>
      <Typography variant="body2" className={classes.code}>
          addonSdk.decorate('{text}')
      </Typography>
    </div>
  }

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
          placeholder="Addon entry point decoration"
          label="Decoration text"
          variant="outlined"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
        />
        <Button variant="contained" className={classes.actionButton} disabled={!text} color="primary" onClick={decorate}>
          Update decoration
        </Button>
        { codeSample() }
      </DialogContent>
    </Dialog>
  );
});

export default DecorateAction;
