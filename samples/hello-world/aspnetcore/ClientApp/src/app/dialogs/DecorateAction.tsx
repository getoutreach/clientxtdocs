import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  TextField,
  DialogContent,
  Dialog,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import extensibilitySdk, { DecorationUpdateType } from '@outreach/extensibility-sdk';
import { useStyles } from './DialogStyle';
import CodeSample from '../components/CodeSample';

interface IDecorationActionProps {
  onClose: () => void;
  open: boolean;
}

const DecorateAction: React.FC<IDecorationActionProps> = observer((props: IDecorationActionProps) => {
  const classes = useStyles();

  const [text, setText] = useState<string>('');
  const [type, setType] = useState<DecorationUpdateType>(DecorationUpdateType.BADGE);
  const decorationTypes: DecorationUpdateType[] = [
    DecorationUpdateType.TEXT,
    DecorationUpdateType.BADGE,
    DecorationUpdateType.ICON,
  ];

  const decorate = () => {
    if (!text) {
      return;
    }

    extensibilitySdk.decorate(text, type);

    setText('');
    props.onClose();
  };

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host addon decoration</DialogTitle>
      <DialogContent className={classes.container}>
        <TextField
          placeholder="Addon entry point decoration"
          label="Decoration value"
          variant="outlined"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
        />
        <FormControl component="fieldset" className={classes.actionOptions}>
          <Select
            labelId="notification-type-title"
            variant="outlined"
            value={type}
            onChange={e => setType(e.target.value as DecorationUpdateType)}
          >
            {decorationTypes.map(decorationType => (
              <MenuItem key={decorationType} value={decorationType}>
                {decorationType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          className={classes.actionButton}
          disabled={!text}
          color="primary"
          onClick={decorate}
        >
          Update decoration
        </Button>
        <CodeSample>
          <>
            extensibilitySdk.decorate('{text}', '{type}');
          </>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default DecorateAction;
