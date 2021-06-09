import React, { useContext } from 'react';

import {
    createStyles,
    Link,
    makeStyles,
    MenuItem,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';

import { EditorStoreContext } from '../../stores/EditorStore';
import { AddonType } from '@outreach/client-addon-sdk';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            '&:invalid': {
                // border: 'red solid 2px',
            },
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        textField: {
            marginBottom: theme.spacing(),
        },
    })
);

const HostInfo: React.FC = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    return (
        <div className={classes.root}>
            <Typography variant="h6">Host configuration</Typography>
            <Typography variant="caption" style={{ marginBottom: 8 }}>
                Describe the type of extension and where it will be hosted. To
                learn more click
                <Link href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/manifest.md#host">
                    here
                </Link>
            </Typography>

            <TextField
                className={classes.textField}
                fullWidth={true}
                required={true}
                select={true}
                label="Addon type"
                variant="outlined"
                value={editorStore.selectedManifest?.host.type}
                onChange={(e) => {
                    const manifest = {
                        ...editorStore.selectedManifest!,
                        host: {
                            ...editorStore.selectedManifest!.host,
                            type: e.target.value as AddonType,
                        },
                    };
                    editorStore.setSelectedManifest(manifest);
                }}
            >
                <MenuItem
                    key={`type-app-extension`}
                    value={AddonType.LeftSideMenu}
                >
                    Application extension
                </MenuItem>
                <MenuItem
                    key={`type-pro-extension`}
                    value={AddonType.ProspectTab}
                >
                    Prospect tab extension
                </MenuItem>
                <MenuItem
                    key={`type-acc-extension`}
                    value={AddonType.AccountTab}
                >
                    Account tab extension
                </MenuItem>
                <MenuItem
                    key={`type-opp-extension`}
                    value={AddonType.OpportunityTab}
                >
                    Opportunity tab extension
                </MenuItem>
            </TextField>

            <TextField
                className={classes.textField}
                fullWidth={true}
                required={true}
                type="url"
                label="Hosting url"
                title="A publicly accessible web address where addon web page is hosted"
                placeholder="ex. https://www.addon-host.com/addon"
                variant="outlined"
                value={editorStore.selectedManifest?.host.url}
                onChange={(e) => {
                    const manifest = {
                        ...editorStore.selectedManifest!,
                        host: {
                            ...editorStore.selectedManifest!.host,
                            url: e.target.value,
                        },
                    };
                    editorStore.setSelectedManifest(manifest);
                }}
            ></TextField>
        </div>
    );
});

export default HostInfo;
