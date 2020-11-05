import React from 'react';
import { observer } from "mobx-react-lite";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { QueryParam } from '../Url';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    params: {
        display: 'inline',
        fontSize: 14,
        paddingRight: 20,
    },
    key: {
      display: 'inline',
      fontSize: 14,
      paddingRight: 5,
      fontWeight: 300,
    },
    value: {
      display: 'inline',
      fontFamily: 'monospace',
      fontSize: 16,
      paddingRight: 0,
      fontWeight: 700,
    },
  })
);

interface ParameterProps {
    parameter: QueryParam
}

const Parameter: React.FC<ParameterProps> = observer((props: ParameterProps) => {
    const classes = useStyles();

    return (
        <Typography
            variant="caption"
            className={classes.params}
        >
            <Typography variant="caption" className={classes.key}>{props.parameter.key}:</Typography>
            <Typography variant="caption" className={classes.value}>{props.parameter.value} </Typography>
        </Typography>
    );
});

export default Parameter;