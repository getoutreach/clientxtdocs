import React, { useState } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { Button, createStyles, TextField, Theme, Typography } from '@material-ui/core';

import addonSdk from '@outreach/client-addon-sdk'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(),
            marginBottom: theme.spacing(),
        },
        heading: {
            paddingBottom: theme.spacing(),
        },
        root: {
            alignSelf: "flex-start",
            borderColor: theme.palette.divider,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: theme.spacing(),
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(2),
            padding: theme.spacing()
        },
        options: {
            marginTop: theme.spacing()
        }
    })
);

const DecorateAction: React.FC = observer(() =>   {

    const [ text, setText ] = useState<string>("")
    const classes = useStyles();

    const decorate = () => {

        if (!text) { 
            return;
        }

        addonSdk.decorate(text);
    }
  return (<div className={classes.root}>

            <Typography variant="h6" className={classes.heading}>
                Decorate action
            </Typography>    
            <TextField
                placeholder="Enter the text to decorate addon entry point"
                label="Decoration text"
                variant="outlined"
                onChange={(e) => setText(e.currentTarget.value)}
                value={text}
            />
            <Button variant="contained" 
                    className={classes.button}
                    disabled={!text}
                    color="primary"
                    onClick={decorate}>
                Update decoration
            </Button>
      </div>);
});

export default DecorateAction;
