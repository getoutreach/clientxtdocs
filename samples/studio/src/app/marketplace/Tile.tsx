import React, { SyntheticEvent, useContext, useState } from 'react';
import { Manifest } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';

import {
    createStyles,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ConsentDialog from '../shared/ConstentDialog';
import ManifestInfo from '../studio/ManifestInfo';
import { EditorStoreContext } from '../../stores/EditorStore';
import { CloseableDialogTitle } from '../shared/CloseableDialogTitle';

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
    onManifest: () => void;
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

    const handleOpenExtension = () => {
        if (!props.manifest) {
            return;
        }

        props.onSelected(props.manifest);
    };

    const handleDeleteClick = () => {
        props.onDelete();
        handleClose();
    };

    const handleManifestClick = () => {
        props.onManifest();
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
                <MenuItem onClick={handleOpenExtension}>
                    Edit extension
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    Delete extension
                </MenuItem>
                <Divider />
                <MenuItem disabled={true}>Extension analytics</MenuItem>
                <Divider />
                <MenuItem onClick={handleManifestClick}>View manifest</MenuItem>
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
    const editorStore = useContext(EditorStoreContext);
    const [focused, setFocused] = useState<boolean>(false);
    const [showDeleteConsent, setShowDeleteConsent] = useState<boolean>(false);
    const [showManifest, setShowManifest] = useState<boolean>(false);

    const DEFAULT_ICON =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA/UlEQVRYw+2XMQ6DMAxF/xnYKs4CJ+BaHAKpEqpQOEaOAWLrAkuZYOviTlVRiUiIYzGAvZL/cOLYMXAOy6AxY4ZGJiGfgxaeh/97+vPAUegVQIcFTCvAFBZABj8tIIbCYBS0+QCF2CZ/w8tL/OujDfFgyRMIahvwZAP6bcCbDaALcAGkAXeUKFGhlQL8LEHHisOhd0dMhEPvTgOciCWKhg2w9O6aDZgOBghvkfAhC6ep0EUrpUsFSRe7gwEtKoft8wR0SBwTwAvQIXJOYS9AuuMSegCaXWVk03rjknpHIbQ8HZVxUWH8tvB5/MYYWYDRPiGYBhA3gNMActlR9gF7GV7fOJfTDAAAAABJRU5ErkJggg==';

    const handleDeleteTile = () => {
        if (props.manifest) {
            editorStore.deleteManifest(props.manifest.identifier);
        }
    };

    let iconSource = props.manifest?.host?.icon
        ? props.manifest?.host?.icon
        : DEFAULT_ICON;

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
                    onError={(e: SyntheticEvent<HTMLImageElement>) => {
                        const img = e.target as HTMLImageElement;
                        img.src =
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAACohJREFUeJzt3cmvJVUdwPFvbBSbDTjQ4Ag0yGQjgoiyEhwSAQERAQ0LV+5cCAujiYtKSIx/gzunoAkqQzPYDI1GF0YXRGSLEeLGhRGiMoi2i3on/Xj97qlTVefUOfe+7ye5SQ917/29qvfNvXWHKpAkSZIkSZIkSZIkSW3pgGNeFr/8Djh1ePPsbW+qPYCquRI4gpFEGcjediXwGHBa7UFaZSD6KEaykoEI4AqMZFcGouAK4HHgbbUHaYmBaLuPYCRvcFLtAQY8BdxZe4g19lPg/JHXuZw+ks8Af88+0ZppPZAXgadrD7HGXp54vRDJp9njkfgUS6tcRh/J22sPUpOB7F2HgdcHlrkMeAJ4R/lx2mQge9f9wJcZjuTD7OFIDGRvuxf4EsORXMoejcRA9DPgduA/A8tdCjwJvLP4RA0xEAH8nLRIPkQfyenFJ2qEgSj4BXAbw5Fcwh6KxEC03X3ArQxHcog9EomBaKf7gS8Crw0sdwg4ChwoPlFFBqLdPEBaJB+kfyTZ2EgMRKs8CNxCWiRHgTOKT1SBgSjmMGmRXMyGRmIgGnIY+ALw6sByF9FHcmbxiRZkIErxEHs0EgNRqoeBmxmO5EI2KBID0RiPkB7JU8C7Sg9UmoForEeAzzMcyQX0jyRrHYmBaIpHgZuAVwaWu4D+keTdpQcqxUA01S9Ji+R8+kjeU3qgEgxEcxwhLZIPsKaRGIjmOgLcyPABIs6jj+S9pQfKyUCUw2NsaCQGolweB25gOJJz6SN5X+mBcjAQ5fQEGxaJgSi3J4DPAf8eWO4gfSTvLz3QHAaiEp5kQyIxEJVylLRIzqGP5KzSA01hICrpKHA9axyJgai0p4DrgH8NLHf21rJnF51mJAPREn7FmkZiIFrKr4FrgX8OLHcWfSTnlB4oRevnB1E5+1n+nITP0B8w+17g5MhyIZKrgT8Xn6pxHatPdn9fvbE2wtOsXrfrcOmyr5GRfIolRRiIFGEgUoSBSBEGIkUYiBTh+yCb7Qbi7ze04HvANbWHWMVANtsLtQdIMPRBxqp8iiVFGIgUYSBShIFIEQYiRRiIFGEgUoSBjHcm8B1gX+1BRtgHfJcNPl1zKb5ROM6Z9EfquJD+WE5fAf5bdaJh+4AfA7fTH4bnk8Dfqk60RnwESXcG/QHRLtz6+x3A92n7kWR7HNCf0/xJ4PRqE60ZA0lzBv0jx0U7/r3lSHbGERjJCAYybFUcQYuRrIojOISRJDGQuAP0v0ir4ghaimQojuAQ/YGmjSTCQFY7QP/IcXHi8iGSmus0NY7gEowkqvVA3lzpfsfGEdwB/IA663VsHEHtSN5S6X7XRsfq4yL9D/jqwvMcAJ6NzJRy+RHLRrIP+MnMmf/I8pF8bWCmbuF5mtQRX0lLRpIjjqUjyRFHuDzDcpEMxWEgW77F8IpaIpLUOF4B7klY7hjwQ8pGMiaOe7ZmbyGSlDiOAd8sPMda2E9/ltSakYyJ47qt69ydsHzJSMbEcffWda6nfiSpcRyh/90QdSOZEkdQK5IpcQQ1IzGOGWpEMieOYOlI5sQR1IjEODJYMpIccQRLRZIjjmDJSIwjoyUiyRlHkBrJ1PdJcsYRpEbyJ6ZHYhwF7Acep0wkY+K4duRtl4qkRBxByUiMo6ASkZSMI8gdSck4ghKRGMcCckayRBxBrkiWiCMYE8nQNxONY0E5IlkyjiA1klUfcFwyjiBHJMZRwZxIasQRTI2kRhzBnEiMo6IpkdSMIxgbSc04gimRGEcD9tN/NDslkm+QHsdnC889JpLacQRjIvl24szGsYDUSFIuS8QRpEbSQhxBaiTG0ZgckSwZR5AjkqXiCHJEYhwVzImkRhzBnEiWjiOYE4lxVDQlkppxBFMiqRVHMCUS42jAmEhaiCMYE0ntOIIxkRhHQ05hOJKW4ghSImkljiAlEuNoUCySFuMIYpG0FkcQi8Q4GrZbJCXiyH2U9N0iyR1H7pl3i8Q4CriNvBtveyQl4rgL+Afwscy3uz2S3HFcBbxI/253TtsjyR3HAfrfjT2vI+0TomOcAjxEmTjCL3GpSErE8RLH5y4RyYPkj+NZPOwPcPy4WLkjye1OTnwaVCKSnHbGUSqSnLZ/fq6rO0obOo5vuFYj+Tqrd6RbjWRVHC1HsvPDpV3VaRrR8cYN11okuz1ytB7JUBwtRrLbJ6+7mgO1ouPEDddKJClxhMuLtBFJahwtRbLqawldxZma0bH7hptzJI0cxsTRSiRj42ghkth3drp6Y7WjY/WGqxXJlDhqRzI1jpqRDH2hraswU3M64htu6UjmxFErkrlx1Igk5due3YLzNKtjeMMtFUlqHK8nLLNUJKlxpMy8VCSpX4XuFpileR1pG650JKlxPEx/ptgXEpYtHUlqHH/ZmvlI4s9YMpIx52DpCs6xNjrSnwKUimRMHCdvXec80iP5eIGZx8RxcOs6+6kbydgTFHUFZlg7Hekr7Bj5D8s/JY6gViRT4ghqRTLl7F1dxvtfWx3jVlrOSFLjeIgT4wiWjmROHMHSkUw9tV2X4b7XXsf4FZcjkhxxBOeyTCQ54giWimTOeR+7Gfe7MTqmrbw5kcx5WrVK6UhyxhGUjmTuSVG7Cfe5cTqmr8ApkeR85NhpTCRXjbjdEnEEpSLJccbgbuTPspE6Vq+g54FXI/8fLqnn+C4ZR5A7kpJxBLkjGXPI1+cj/99N/Hk2SsfqFXQfcCN5Iol9ZD1XHMG5xDd8aiRLxBHkimRMHNcDhyPLdDN/po3QEQ8E5kdyV8J1jzFun2PI3EiWjCOYG8nYOMBABnUMBwLTI6kRRzA1khpxBFMjmRIHGMigjrRAYHwkNeMIxkZSM45gbCRT4wADGdSRHgikR/LXhGVKxxGkRvIS9eMIxkSSsq53iwMMZFDHuEAgPZIW4ggOkhZJC3EEYyKZEgc0Hsick9rX9ABwK/DajNt4BLiZPrQlPAdcTf8S8FTPA9ds3dYSXgZuoj9v/VSvArfQvzq4dtY1EJgXydJxBHMiWTqOYE4kax0HrHcgMC2SWnEEUyKpFUcwJZK1j6MVHeP3QXZK3Sd5hOX2OYYcpN+faGmfY0jqPklsn2OnpvdBWtAxPxAYjuRR4K25hs5kKJKW4giGIhkTBxjIoI48gcDqSFqMI1gVSYtxBKsiGRsHGMigjnyBwImRtBxHsDOSluMIdkYyJQ4wkEEdeQOB45GsQxxBiGQd4ghCJFPjgMYDOan2AIU8AHwK+AP9xlsHz9G/UhX+vA7Cq1uXA7+tPEsRmxoIwG9qDzDBuoSx3ctsaByw/u+DSEUZiBRhIFKEgUgRBiJFGIgUYSBShIFIEQYiRRiIFGEgUoSBSBEGIkUYiBRhIFKEgUgRBiJFGIgUYSBShIFIEQYiRRiIFGEgUoSBSBEGIkUYiBRhIFKEgUgRBiJFGIgUYSBShIFIEQYiRRiIFGEgUoSBSBEGIkUYiBRhIFKEgUgRBiJFGIgUYSBShIFIEQYiRRiIFGEgUoSBSBEGIkUYiBRxUu0BBpwGXFF7CBV1au0BYloP5BPA72sPob3Lp1hShIFIEQYiRRiIFGEgUoSBSJIkSZIkSZIkSZIkKdH/ATFRswFMXb3TAAAAAElFTkSuQmCC';
                        img.title = 'Invalid manifest value for host.icon';
                    }}
                    alt={props.manifest?.identifier}
                    className={classes.icon}
                    src={iconSource}
                />
                <div className={classes.topRow}>
                    <div
                        className={classes.title}
                        onClick={() =>
                            props.manifest && props.onSelected(props.manifest)
                        }
                    >
                        <Typography variant="subtitle1">
                            {props.manifest?.title?.en || 'App extension title'}
                        </Typography>
                        <Typography variant="caption">
                            {props.manifest?.author?.company || 'Contoso Ltd'}
                        </Typography>
                    </div>

                    <ContextMenu
                        {...props}
                        onDelete={() => setShowDeleteConsent(true)}
                        onManifest={() => setShowManifest(true)}
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
                    {props.manifest?.description?.en ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore....'}
                </Typography>
            </div>

            {showDeleteConsent && (
                <ConsentDialog
                    title="Deleting app extension"
                    description="Are you sure you want to delete this app extension"
                    onAccept={handleDeleteTile}
                    onCancel={() => setShowDeleteConsent(false)}
                    open={true}
                />
            )}

            <Dialog
                disableBackdropClick={true}
                open={showManifest && !!props.manifest}
                onClose={() => setShowManifest(false)}
                maxWidth="md"
            >
                <CloseableDialogTitle
                    id="manifest-dialog-title"
                    onClose={() => setShowManifest(false)}
                >
                    <Typography>Extension manifest</Typography>
                </CloseableDialogTitle>

                <DialogContent>
                    <ManifestInfo manifest={props.manifest!} />
                </DialogContent>
            </Dialog>
        </div>
    );
});

export default Tile;
