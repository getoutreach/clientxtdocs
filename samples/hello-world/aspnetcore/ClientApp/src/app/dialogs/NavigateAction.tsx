import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import extensibilitySdk, { NavigationDestination } from '@outreach/extensibility-sdk';
import CodeSample from '../components/CodeSample';
import { useStyles } from './DialogStyle';

interface INavigateActionProps {
  onClose: () => void;
  open: boolean;
}

const NavigateAction: React.FC<INavigateActionProps> = observer((props: INavigateActionProps) => {
  const classes = useStyles();
  const [id, setId] = useState<string>('');
  const [destination, setDestination] = useState<NavigationDestination>(NavigationDestination.ACCOUNT);

  const navigate = () => {
    extensibilitySdk.navigate(destination, id);
    setId('');
    props.onClose();
  };

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host navigation</DialogTitle>
      <DialogContent className={classes.container}>
        <FormControl component="fieldset" className={classes.actionOptions}>
          <Select
            variant="outlined"
            value={destination}
            onChange={e => setDestination(e.target.value as NavigationDestination)}
          >
            <MenuItem key={NavigationDestination.ACCOUNT} value={NavigationDestination.ACCOUNT}>
              Account
            </MenuItem>
            <MenuItem key={NavigationDestination.PROSPECT} value={NavigationDestination.PROSPECT}>
              Prospect
            </MenuItem>
            <MenuItem key={NavigationDestination.OPPORTUNITY} value={NavigationDestination.OPPORTUNITY}>
              Opportunity
            </MenuItem>
            <MenuItem key={NavigationDestination.APP} value={NavigationDestination.APP}>
              App
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus={true}
          placeholder="Enter the route id here"
          label="Navigation  ID"
          onChange={e => setId(e.currentTarget.value)}
          value={id}
          variant="outlined"
        />
        <Button
          variant="contained"
          type="submit"
          className={classes.actionButton}
          color="primary"
          disabled={!id}
          onClick={e => navigate()}
        >
          Send navigation request
        </Button>
        <CodeSample>
          <>
            {!id && <>extensibilitySdk.navigate('{destination}');</>}
            {id && (
              <>
                extensibilitySdk.navigate('{destination}', '{id}');
              </>
            )}
          </>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default NavigateAction;
