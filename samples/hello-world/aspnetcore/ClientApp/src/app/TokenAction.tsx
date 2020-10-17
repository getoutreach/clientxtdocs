import React, { useState } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, createStyles, FormControlLabel, Theme, Dialog, DialogTitle, DialogContent, Divider, Typography } from '@material-ui/core';

import addonSdk from "@outreach/client-addon-sdk";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(),
            marginBottom: theme.spacing(),
        },
        code: {
            padding: theme.spacing(0.5),
            fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
            fontWeight: "lighter"
          },
        divider: {
            marginBottom: theme.spacing(0.5),
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
            marginBottom: theme.spacing(),
            marginTop: theme.spacing(),
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
        }
    })
);


interface ITokenActionProps {
    onClose: () => void;
    open: boolean;
  }

const TokenAction: React.FC<ITokenActionProps> = observer((props: ITokenActionProps) =>   {

  const classes = useStyles();
  const [forced, setForced] = useState<boolean>(false);

  const onTokenGetClick = async () => {
    const token = await addonSdk.getToken(forced);
    if (token) {
        alert("Token received silently:" + token);
    }
    
    props.onClose();
  }
  const codeSample = () => {
    return <div>
      <Divider className={classes.divider}  />
      <Typography variant="overline">
          Code sample
      </Typography>
      <Typography variant="body2" className={classes.code}>
          {`const token = await addonSdk.getToken(${forced});`}
      </Typography>
    </div>
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>Refresh a token</DialogTitle>
        <DialogContent className={classes.container}>
            <FormControlLabel className={classes.options}
                control={<Checkbox  checked={forced} onChange={(e) => setForced(e.target.checked)} />}
                label="Ignore locally cached credentials"
            />
            <Button variant="contained" 
                    className={classes.button}
                    color="primary" 
                    onClick={onTokenGetClick}>
                Fetch token
            </Button>
            <Divider className={classes.divider}  />
            { codeSample() }
        </DialogContent>
    </Dialog>
  );
});

export default TokenAction;
