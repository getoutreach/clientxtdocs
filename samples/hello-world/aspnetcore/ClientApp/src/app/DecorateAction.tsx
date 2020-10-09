import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Button, TextField, Typography } from '@material-ui/core';
import addonSdk from '@outreach/client-addon-sdk';
import { useStyles } from '../styles/styles';

const DecorateAction: React.FC = observer(() => {
  const [text, setText] = useState<string>('');
  const classes = useStyles();

  const decorate = () => {
    if (!text) {
      return;
    }

    addonSdk.decorate(text);

    setText('');
  };

  return (
    <div className={classes.actionRoot}>
      <Typography variant="h6" className={classes.actionHeading}>
        Decorate action
      </Typography>
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
    </div>
  );
});

export default DecorateAction;
