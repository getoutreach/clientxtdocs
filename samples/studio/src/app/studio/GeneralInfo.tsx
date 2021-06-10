import {
    createStyles,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { EditorStoreContext } from '../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        basic: {
            flexGrow: 1,
        },
        icon: {
            height: theme.spacing(6),
            width: theme.spacing(6),
        },
        input: {
            '&:invalid': {
                // border: 'red solid 2px',
            },
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        textField: {
            marginBottom: theme.spacing(),
        },
    })
);

const BasicInfo: React.FC = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    return (
        <div className={classes.basic}>
            <Typography variant="h6">Basic info</Typography>
            <div className={classes.row}>
                <TextField
                    className={classes.textField}
                    fullWidth={true}
                    required={true}
                    type="text"
                    label="App ID"
                    variant="outlined"
                    value={editorStore.selectedManifest?.identifier || ''}
                    onChange={(e) => {
                        const manifest = {
                            ...editorStore.selectedManifest!,
                            identifier: e.target.value,
                        };

                        editorStore.setSelectedManifestId(manifest.identifier);
                    }}
                ></TextField>
                <TextField
                    className={classes.textField}
                    fullWidth={true}
                    required={true}
                    type="text"
                    label="App version"
                    variant="outlined"
                    style={{
                        marginLeft: 8,
                    }}
                    value={editorStore.selectedManifest?.version || ''}
                    placeholder="ex. 0.10"
                    onChange={(e) =>
                        editorStore.addOrUpdateManifest({
                            ...editorStore.selectedManifest!,
                            version: e.target.value,
                        })
                    }
                ></TextField>
            </div>
            <TextField
                className={classes.textField}
                fullWidth={true}
                required={true}
                type="text"
                label="App name"
                variant="outlined"
                value={editorStore.selectedManifest?.title.en || ''}
                onChange={(e) => {
                    const manifest = {
                        ...editorStore.selectedManifest!,
                        title: {
                            en: e.target.value,
                        },
                    };
                    editorStore.addOrUpdateManifest(manifest);
                }}
            ></TextField>
            <TextField
                className={classes.textField}
                fullWidth={true}
                required={true}
                multiline={true}
                rows={3}
                type="text"
                label="App description"
                variant="outlined"
                value={editorStore.selectedManifest?.description.en || ''}
                onChange={(e) =>
                    editorStore.addOrUpdateManifest({
                        ...editorStore.selectedManifest!,
                        description: {
                            en: e.target.value,
                        },
                    })
                }
            ></TextField>
        </div>
    );
});

const AuthorInfo: React.FC = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    return (
        <div className={classes.basic}>
            <Typography variant="h6">Author info</Typography>
            <div className={classes.row}>
                <TextField
                    className={classes.textField}
                    fullWidth={true}
                    required={true}
                    type="text"
                    label="Developer/Company Name"
                    placeholder="ex: Contoso Ltd"
                    variant="outlined"
                    value={editorStore.selectedManifest?.author.company || ''}
                    onChange={(e) =>
                        editorStore.setAuthorCompany(e.target.value)
                    }
                    inputProps={{
                        className: classes.input,
                    }}
                ></TextField>
                <TextField
                    className={classes.textField}
                    fullWidth={true}
                    required={true}
                    type="url"
                    label="Website"
                    variant="outlined"
                    placeholder="ex: https://www.contoso.com"
                    style={{
                        marginLeft: 8,
                    }}
                    value={
                        editorStore.selectedManifest?.author.websiteUrl || ''
                    }
                    onChange={(e) =>
                        editorStore.setAuthorWebsite(e.target.value)
                    }
                    inputProps={{
                        className: classes.input,
                    }}
                ></TextField>
            </div>
            <div className={classes.row}>
                <TextField
                    className={classes.textField}
                    fullWidth={true}
                    required={true}
                    type="url"
                    label="Privacy statement"
                    placeholder="ex: https://www.contoso.com/privacy"
                    variant="outlined"
                    value={
                        editorStore.selectedManifest?.author.privacyUrl || ''
                    }
                    onChange={(e) =>
                        editorStore.setAuthorPrivacyUrl(e.target.value)
                    }
                    inputProps={{
                        className: classes.input,
                    }}
                ></TextField>
                <TextField
                    className={classes.textField}
                    fullWidth={true}
                    required={true}
                    type="url"
                    label="Terms of use"
                    variant="outlined"
                    placeholder="ex: https://www.contoso.com/tos"
                    style={{
                        marginLeft: 8,
                    }}
                    value={
                        editorStore.selectedManifest?.author.termsOfUseUrl || ''
                    }
                    onChange={(e) =>
                        editorStore.setAuthorTermsOfUseUrl(e.target.value)
                    }
                    inputProps={{
                        className: classes.input,
                    }}
                ></TextField>
            </div>
        </div>
    );
});

const GeneralInfo: React.FC = observer(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BasicInfo />
            <AuthorInfo />
        </div>
    );
});

export default GeneralInfo;
