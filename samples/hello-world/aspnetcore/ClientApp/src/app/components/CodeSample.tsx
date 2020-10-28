import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useStyles } from '../dialogs/DialogStyle';

const CodeSample = (props: { children: JSX.Element, title?: string }) => {
    const classes = useStyles();

    return (
        <>
            <Divider className={classes.divider} />
            <Typography variant="overline">
                {props.title || 'Code sample'}
            </Typography>
            <Typography variant="body2" className={classes.code}>
                {props.children}
            </Typography>
        </>
    );
}

export default CodeSample;