import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

import React from 'react';
import ReactJson from 'react-json-view';
import GetAppIcon from '@material-ui/icons/GetApp';
import { downloadFile } from '../utils';
import { Manifest } from '@outreach/client-addon-sdk';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            alignSelf: 'flex-start',
            marginLeft: theme.spacing(0),
            marginTop: theme.spacing(-2),
            margin: theme.spacing(2),
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(2),
            height: '100%',
        },
    })
);

interface IManifestInfoProps {
    manifest: Manifest;
}

const ManifestInfo: React.FC<IManifestInfoProps> = (
    props: IManifestInfoProps
) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<GetAppIcon />}
                onClick={() =>
                    downloadFile(
                        `manifest-${props.manifest.identifier}`,
                        JSON.stringify(props.manifest, null, 2)
                    )
                }
            >
                Download manifest file
            </Button>
            <ReactJson src={props.manifest} />
        </div>
    );
};

export default ManifestInfo;
