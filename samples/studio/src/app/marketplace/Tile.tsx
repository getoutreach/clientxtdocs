import React, { useState } from 'react';
import { Manifest } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';

import {
    createStyles,
    Divider,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { downloadFile } from '../utils';
import ConsentDialog from '../shared/ConstentDialog';
import editorStore from '../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contextMenu: {},
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
            flexGrow: 1,
        },
        topRow: {
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
        },
    })
);

interface IContextMenuProps extends ITitleProps {
    onDelete: () => void;
}

const ContextMenu: React.FC<IContextMenuProps> = (props: IContextMenuProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenManifest = () => {
        if (!props.manifest) {
            return;
        }

        props.onSelected(props.manifest);
    };

    const handleDownloadClick = () => {
        if (!props.manifest) {
            return;
        }
        downloadFile(
            `manifest-${props.manifest.identifier}`,
            JSON.stringify(props.manifest, null, 2)
        );
    };

    const handleDeleteClick = () => {
        props.onDelete();
        handleClose();
    };

    return (
        <div id="tile-context-container" className={classes.contextMenu}>
            <IconButton onClick={handleButtonClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="tile-context-menu"
                anchorEl={anchorEl}
                keepMounted={true}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenManifest}>Open</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                <Divider />
                <MenuItem onClick={handleDownloadClick}>Download</MenuItem>
            </Menu>
        </div>
    );
};

interface ITitleProps {
    manifest?: Manifest;
    onSelected: (manifest: Manifest) => void;
}

const Tile: React.FC<ITitleProps> = observer((props: ITitleProps) => {
    const classes = useStyles();
    const [focused, setFocused] = useState<boolean>(false);
    const [showConsent, setShowConsent] = useState<boolean>(false);

    const handleDeleteTile = () => {
        if (props.manifest) {
            editorStore.deleteManifest(props.manifest.identifier);
        }
    };

    return (
        <div
            id="tile-root"
            className={
                !focused ? classes.root : `${classes.root} ${classes.focused}`
            }
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
        >
            <div className={classes.heading}>
                <img
                    onClick={() =>
                        props.manifest && props.onSelected(props.manifest)
                    }
                    alt={props.manifest?.identifier}
                    className={classes.icon}
                    src={
                        props.manifest?.host.icon ||
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA/UlEQVRYw+2XMQ6DMAxF/xnYKs4CJ+BaHAKpEqpQOEaOAWLrAkuZYOviTlVRiUiIYzGAvZL/cOLYMXAOy6AxY4ZGJiGfgxaeh/97+vPAUegVQIcFTCvAFBZABj8tIIbCYBS0+QCF2CZ/w8tL/OujDfFgyRMIahvwZAP6bcCbDaALcAGkAXeUKFGhlQL8LEHHisOhd0dMhEPvTgOciCWKhg2w9O6aDZgOBghvkfAhC6ep0EUrpUsFSRe7gwEtKoft8wR0SBwTwAvQIXJOYS9AuuMSegCaXWVk03rjknpHIbQ8HZVxUWH8tvB5/MYYWYDRPiGYBhA3gNMActlR9gF7GV7fOJfTDAAAAABJRU5ErkJggg=='
                    }
                />
                <div className={classes.topRow}>
                    <div
                        className={classes.title}
                        onClick={() =>
                            props.manifest && props.onSelected(props.manifest)
                        }
                    >
                        <Typography variant="subtitle1">
                            {props.manifest?.title.en || 'App extension title'}
                        </Typography>
                        <Typography variant="caption">
                            {props.manifest?.author.company || 'Contoso Ltd'}
                        </Typography>
                    </div>

                    <ContextMenu
                        {...props}
                        onDelete={() => setShowConsent(true)}
                    />
                </div>
            </div>

            <div
                className={classes.description}
                onClick={() =>
                    props.manifest && props.onSelected(props.manifest)
                }
            >
                <Typography variant="caption">
                    {props.manifest?.description.en ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore....'}
                </Typography>
            </div>

            {showConsent && (
                <ConsentDialog
                    title="Deleting app extension"
                    description="Are you sure you want to delete this app extension"
                    onAccept={handleDeleteTile}
                    onCancel={() => setShowConsent(false)}
                    open={true}
                />
            )}
        </div>
    );
});

export default Tile;
