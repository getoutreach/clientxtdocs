import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Manifest } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(1),
        },
        focused: {
            backgroundColor: theme.palette.grey[300],
            cursor: 'pointer',
        },
        icon: {
            height: theme.spacing(4),
            padding: theme.spacing(1),
            width: theme.spacing(4),
        },
        heading: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        root: {
            borderColor: theme.palette.divider,
            borderStyle: 'solid',
            borderWidth: 1,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 150,
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            width: 300,
        },
        title: {
            display: 'flex',
            flexDirection: 'column',
        },
    })
);

interface ITitleProps {
    manifest?: Manifest;
    onSelected: (manifest: Manifest) => void;
}

const Tile: React.FC<ITitleProps> = observer((props: ITitleProps) => {
    const classes = useStyles();
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <div
            className={
                !focused ? classes.root : `${classes.root} ${classes.focused}`
            }
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            onClick={() => props.manifest && props.onSelected(props.manifest)}
        >
            <div className={classes.heading}>
                <img
                    alt={props.manifest?.identifier}
                    className={classes.icon}
                    src={props.manifest?.host.icon}
                />
                <div className={classes.title}>
                    <Typography variant="subtitle1">
                        {props.manifest?.title.en || 'App extension title'}
                    </Typography>
                    <Typography variant="caption">
                        {props.manifest?.author.company || 'Contoso Ltd'}
                    </Typography>
                </div>
            </div>

            <div className={classes.description}>
                <Typography variant="caption">
                    {props.manifest?.description.en ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore....'}
                </Typography>
            </div>
        </div>
    );
});

export default Tile;
