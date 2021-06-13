import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    Link,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ExtensionStoreContext } from '../../stores/ExtensionsStore';
import { CloseableDialogTitle } from '../shared/CloseableDialogTitle';
import { getContextInfo, getScopeInfo } from '../utils';
import Configuration from './Configuration';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 600,
        },
        context: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(2),
        },
        company: {
            display: 'flex',
            flexDirection: 'row',
        },
        description: {},
        header: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        icon: {
            height: theme.spacing(6),
            padding: theme.spacing(1),
            width: theme.spacing(6),
        },
        infoRoot: {},
        link: {
            paddingLeft: theme.spacing(),
            paddingRight: theme.spacing(),
        },
        title: {},
    })
);

interface IInfoProps {}

const Info: React.FC<IInfoProps> = observer((props: IInfoProps) => {
    const classes = useStyles();
    const extensionStore = useContext(ExtensionStoreContext);

    const manifest = extensionStore.selectedManifest;

    const Header: React.FC = () => {
        const classes = useStyles();

        return (
            <div className={classes.header}>
                <img
                    alt={manifest?.identifier}
                    className={classes.icon}
                    src={manifest?.host.icon}
                />
                <div className={classes.title}>
                    <Typography variant="subtitle1">
                        {manifest?.title.en}
                    </Typography>
                    <div className={classes.company}>
                        <Link
                            style={{ paddingLeft: 0 }}
                            href={manifest?.author.websiteUrl}
                            className={classes.link}
                        >
                            <Typography variant="caption">
                                Conotoso Ltd
                            </Typography>
                        </Link>
                        |
                        <Link
                            href={manifest?.author.privacyUrl}
                            className={classes.link}
                        >
                            <Typography variant="caption">Privacy</Typography>
                        </Link>
                        |
                        <Link
                            href={manifest?.author.termsOfUseUrl}
                            className={classes.link}
                        >
                            <Typography variant="caption">
                                Terms of use
                            </Typography>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const Description: React.FC = () => {
        const classes = useStyles();

        return (
            <Typography variant="body1" className={classes.description}>
                {manifest?.description.en}
            </Typography>
        );
    };

    const ContextInfo: React.FC = () => {
        const classes = useStyles();

        return (
            <div id="context-info-container" className={classes.context}>
                <div className={classes.title}>
                    <Typography variant="subtitle1" className={classes.bold}>
                        Outreach information which will be shared with extension
                    </Typography>
                </div>
                <ul>
                    {manifest?.context.map((ctx, idx) => (
                        <Typography
                            variant="body1"
                            component="li"
                            key={`ctx-${idx}`}
                        >
                            {`${getContextInfo(ctx).text} (${ctx})`}
                        </Typography>
                    ))}
                </ul>
            </div>
        );
    };

    const ApiInfo: React.FC = () => {
        const classes = useStyles();

        return (
            <div id="api-info-container" className={classes.context}>
                <div className={classes.title}>
                    <Typography variant="subtitle1" className={classes.bold}>
                        Outreach API scopes extension needs
                    </Typography>
                </div>
                <ul>
                    {manifest?.api?.scopes.map((ctx, idx) => (
                        <Typography
                            variant="body1"
                            component="li"
                            key={`ctx-${idx}`}
                        >
                            {`${getScopeInfo(ctx).text} (${ctx})`}
                        </Typography>
                    ))}
                </ul>
            </div>
        );
    };

    const onClose = () => {
        extensionStore.selectManifest(null);
    };

    console.log('[Info.tsx]::render');

    return (
        <Dialog
            id="info-dialog"
            className={classes.infoRoot}
            disableBackdropClick={true}
            open={!!manifest}
            onClose={onClose}
            maxWidth="sm"
        >
            <CloseableDialogTitle id="form-dialog-title" onClose={onClose}>
                Add Outreach extension
            </CloseableDialogTitle>

            <DialogContent>
                <Header />
                <Description />
                <ContextInfo />
                <ApiInfo />
                <Configuration configuration={manifest?.configuration} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus={true} color="primary" variant="contained">
                    Add to Outreach
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default Info;
