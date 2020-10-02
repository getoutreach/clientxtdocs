import React, { useState } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { Button, createStyles, FormControl, InputLabel, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core';

import addonSdk from '@outreach/client-addon-sdk'
import { NotificationType } from '@outreach/client-addon-sdk/messages/NotificationType';

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

const NotifyAction: React.FC = observer(() =>   {

    const classes = useStyles();
    const [ text, setText ] = useState<string>("")
    const [ type, setType ] = useState<string>("info")

    const notify = () => {

        if (!text) { 
            return;
        }

        let notificationType: NotificationType;
        switch (type) {
            case "success":
                notificationType = "success";
                break;
            case "info":
                notificationType = "info";
                break;
            case "warning":
                notificationType = "warning";
                break;
            case "error":
                notificationType = "error";
                break;
            default: 
                throw new Error("Unsupported type:" + type);
        }

        addonSdk.notify(text, notificationType);
    }

    return (<div className={classes.root}>

            <Typography variant="h6" className={classes.heading}>
                Notify action
            </Typography>    
            <TextField
                placeholder="Enter the notification text here"
                label="Notification text"
                onChange={(e) => setText(e.currentTarget.value)}
                value={text}
                variant="outlined"
            />

            <Button variant="contained" 
                    className={classes.button}
                    color="primary"
                    disabled={!text}
                    onClick={notify}>
                Send notification
            </Button>
            <FormControl component="fieldset" className={classes.options} >
                <InputLabel  id='notification-type-title'>Notification type</InputLabel>
                <Select
                    labelId="notification-type-title"
                    variant="filled"
                    value={type}
                    onChange={(e) => setType(e.target.value as string)}
                    >
                    <MenuItem value="success">success</MenuItem>
                    <MenuItem value="info">information</MenuItem>
                    <MenuItem value="warning">warning</MenuItem>
                    <MenuItem value="error">error</MenuItem>
                    </Select>

            </FormControl>
      </div>);
});

export default NotifyAction;
