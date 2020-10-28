import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import addonSdk from '@outreach/client-addon-sdk';
import { EventStoreContext } from '../../stores/EventStore';
import { useStyles } from './DialogStyle';
import CodeSample from '../components/CodeSample';

interface ITokenActionProps {
    onClose: () => void;
    open: boolean;
  }

const TokenAction: React.FC<ITokenActionProps> = observer((props: ITokenActionProps) =>   {
  const classes = useStyles();
  const [forced, setForced] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const eventStore = useContext(EventStoreContext);

  const onTokenGetClick = async () => {
    const token = await addonSdk.getToken(forced);
    if (token) {
        eventStore.setToken(token);
        setToken(token);
    }
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>Refresh a token</DialogTitle>
        <DialogContent className={classes.container}>
            <FormControlLabel
                className={classes.options}
                control={<Checkbox  checked={forced} onChange={(e) => setForced(e.target.checked)} />}
                label="Ignore locally cached credentials"
            />
            <Button
                variant="contained" 
                className={classes.actionButton}
                color="primary" 
                onClick={onTokenGetClick}
            >
                Fetch token
            </Button>
            <Divider className={classes.divider} />
            <CodeSample>
                <>
                  {`const token = await addonSdk.getToken(${forced});`}
                </>      
            </CodeSample>
            {token && <CodeSample title="TOKEN"><>{token}</></CodeSample>}
        </DialogContent>
    </Dialog>
  );
});

export default TokenAction;
