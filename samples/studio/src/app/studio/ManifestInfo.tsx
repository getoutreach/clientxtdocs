import {
    Button,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import ReactJson from 'react-json-view';
import { EditorStoreContext } from '../../stores/EditorStore';
import GetAppIcon from '@material-ui/icons/GetApp';
import { downloadFile } from '../utils';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            alignSelf: 'flex-start',
            marginLeft: theme.spacing(0),
            marginTop: theme.spacing(),
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

const ManifestInfo: React.FC = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);
    return (
        <div className={classes.root}>
            <Typography variant="h6">Extension manifest</Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<GetAppIcon />}
                onClick={() =>
                    downloadFile(
                        `manifest-${editorStore.selectedManifest?.identifier}`,
                        JSON.stringify(editorStore.selectedManifest, null, 2)
                    )
                }
            >
                Download manifest file
            </Button>
            <ReactJson src={editorStore.selectedManifest!} />;
        </div>
    );
});

export default ManifestInfo;
