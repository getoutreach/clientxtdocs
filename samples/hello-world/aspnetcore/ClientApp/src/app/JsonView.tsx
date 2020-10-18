import { Dialog, DialogTitle, DialogContent, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import ReactJson from 'react-json-view'


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    }
  })
);

interface IJsonViewProps {
  json: object;
  onClose: () => void;
}

const JsonView: FC<IJsonViewProps> = (props: IJsonViewProps) => {
  const classes = useStyles();
  return (
    <Dialog onClose={props.onClose} open={true}>
      <DialogTitle>Outreach API response</DialogTitle>
      <DialogContent className={classes.root}>
        <ReactJson src={props.json} />;
      </DialogContent>
    </Dialog>
  );
};

export default JsonView;
