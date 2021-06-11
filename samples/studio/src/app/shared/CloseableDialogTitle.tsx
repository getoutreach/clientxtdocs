import * as React from 'react';

import {
    createStyles,
    IconButton,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import MuiDialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme: Theme) =>
    createStyles({
        closeButton: {
            color: theme.palette.grey[500],
            position: 'absolute',
            right: theme.spacing(),
            top: theme.spacing(),
        },
        root: {
            margin: 0,
            padding: theme.spacing(2),
            paddingBottom: 0,
        },
    });

export interface ICloseableDialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;

    classes: {
        closeButton: string;
        root: string;
    };
}

export const CloseableDialogTitle = withStyles(styles)(
    (props: ICloseableDialogTitleProps) => {
        const { children, classes, onClose } = props;
        return (
            <MuiDialogTitle disableTypography={true} className={classes.root}>
                <Typography variant="subtitle2">{children}</Typography>
                {onClose ? (
                    <IconButton
                        aria-label="Close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    }
);
