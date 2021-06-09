import {
    Button,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';

import { v4 as uuidv4 } from 'uuid';

import { Manifest } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Tile from '../marketplace/Tile';
import { EditorStoreContext } from '../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        action: {
            marginLeft: theme.spacing(),
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
        actions: {
            borderRightColor: theme.palette.divider,
            borderRightStyle: 'solid',
            borderRightWidth: 1,
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(),
            width: 400,
        },
        bold: {
            fontWeight: 600,
        },
        dashboard: {},
        emptyCTA: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
        root: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            flexGrow: 1,
        },
    })
);

const Actions: React.FC = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    const handleCreateNewApp = () => {
        const newManifest = {
            identifier: uuidv4(),
            version: '',
            author: {
                company: '',
                privacyUrl: '',
                termsOfUseUrl: '',
                websiteUrl: '',
            },
            host: {
                type: 'left-side-menu',
                url: '',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA/UlEQVRYw+2XMQ6DMAxF/xnYKs4CJ+BaHAKpEqpQOEaOAWLrAkuZYOviTlVRiUiIYzGAvZL/cOLYMXAOy6AxY4ZGJiGfgxaeh/97+vPAUegVQIcFTCvAFBZABj8tIIbCYBS0+QCF2CZ/w8tL/OujDfFgyRMIahvwZAP6bcCbDaALcAGkAXeUKFGhlQL8LEHHisOhd0dMhEPvTgOciCWKhg2w9O6aDZgOBghvkfAhC6ep0EUrpUsFSRe7gwEtKoft8wR0SBwTwAvQIXJOYS9AuuMSegCaXWVk03rjknpHIbQ8HZVxUWH8tvB5/MYYWYDRPiGYBhA3gNMActlR9gF7GV7fOJfTDAAAAABJRU5ErkJggg==',
            },
            title: {
                en: '',
            },
            description: {
                en: '',
            },
        } as Manifest;
        editorStore.addOrUpdateManifest(newManifest, true);

        window.location.hash = '/editor';
    };

    return (
        <div className={classes.actions}>
            <Typography variant="h4" style={{ margin: 16 }}>
                Outreach App Studio
            </Typography>

            <Typography
                variant="body1"
                style={{ margin: 16, marginBottom: 32 }}
            >
                Use the app configuration to develop or import your own apps for
                use in Outreach. Choose an option below to get started.
            </Typography>

            <Button
                variant="outlined"
                className={classes.action}
                onClick={handleCreateNewApp}
            >
                Create a new app
            </Button>
            <Button
                variant="outlined"
                className={classes.action}
                disabled={true}
            >
                Import an existing app
            </Button>
        </div>
    );
});

const Dashboard = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    if (editorStore.manifests.length === 0) {
        return (
            <div className={classes.emptyCTA}>
                <Typography variant="overline" className={classes.bold}>
                    You don't have any Outreach apps. Please create one by
                    Clicking on a "Create A New App" button.
                </Typography>
            </div>
        );
    }

    const handleTileSelected = (manifest: Manifest) => {
        window.location.hash = `/editor/${manifest.identifier}`;
    };

    return (
        <div className={classes.dashboard}>
            {editorStore.manifests.map((m, idx) => (
                <Tile
                    key={`tile-${idx}`}
                    manifest={m}
                    onSelected={handleTileSelected}
                />
            ))}
        </div>
    );
});

const Studio: React.FC = observer(() => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Actions />
            <Dashboard />
        </div>
    );
});

export default Studio;
