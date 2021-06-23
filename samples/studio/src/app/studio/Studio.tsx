import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import { Manifest } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Tile from '../marketplace/Tile';
import { EditorStoreContext } from '../../stores/EditorStore';
import { NotificationStoreContext } from '../../stores/NotificationStore';
import { PredefinedRoute } from '../enums/PredefinedRoute';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
      maxWidth: 300,
    },
    bold: {
      fontWeight: 600,
    },
    bottom: {
      alignItems: 'center',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      marginRight: theme.spacing(4),
      width: '95%',
    },
    dashboard: {
      display: 'flex',
      flexDirection: 'column',
    },
    dashboardTiles: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    emptyCTA: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      height: '100%',
      marginTop: theme.spacing(2),
    },
    top: {
      flexGrow: 1,
      marginRight: theme.spacing(3),
    },
  })
);

const Actions: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);
  const notificationStore = useContext(NotificationStoreContext);

  const handleCreateNewApp = () => {
    const manifest = editorStore.createNewManifest();
    window.location.hash = `/editor/${manifest.identifier}`;
  };

  const handleImportManifest = () => {
    var input = document.createElement('input') as HTMLInputElement;
    input.type = 'file';

    input.onchange = (e: Event) => {
      let fileInput = e.target as HTMLInputElement;

      if (!e.target || !fileInput.files) {
        return;
      }

      // getting a hold of the file reference
      var file = fileInput.files[0];

      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        const content = readerEvent.target!.result as string;
        try {
          const manifest = JSON.parse(content) as Manifest;

          if (!manifest.identifier) {
            throw new Error('Invalid manifest file:\n' + content);
          }

          editorStore.addOrUpdateManifest(manifest, false);
        } catch (e) {
          console.error(e);
          notificationStore.showToast('Invalid manifest file', 'error');
        }
      };
    };

    input.click();
  };

  return (
    <div className={classes.actions}>
      <div className={classes.top}>
        <Typography variant="h4" style={{ marginLeft: 16 }}>
          Outreach App Studio
        </Typography>

        <Typography variant="body1" style={{ margin: 16, marginBottom: 32 }}>
          Use the app configuration to develop or import your own apps for use
          in Outreach. Choose an option below to get started.
        </Typography>

        <Button
          variant="outlined"
          fullWidth={true}
          className={classes.action}
          onClick={handleCreateNewApp}
        >
          Create a new app
        </Button>
        <Button
          variant="outlined"
          fullWidth={true}
          className={classes.action}
          onClick={handleImportManifest}
        >
          Import an existing app
        </Button>
      </div>
      <div className={classes.bottom}>
        <Button
          href={`/#/${PredefinedRoute.STORE}`}
          variant="contained"
          color="secondary"
          fullWidth={true}
          startIcon={<ArrowBackIcon />}
        >
          Outreach Extension Store
        </Button>
      </div>
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
          You don't have any Outreach apps. Please create one by Clicking on a
          "Create A New App" button.
        </Typography>
      </div>
    );
  }

  const handleTileSelected = (manifest: Manifest) => {
    window.location.hash = `/editor/${manifest.identifier}`;
  };

  return (
    <div className={classes.dashboard}>
      <Typography
        variant="subtitle1"
        className={classes.bold}
        style={{
          marginLeft: 16,
        }}
      >
        PERSONAL STORE | Outreach apps you are developing
      </Typography>

      <div className={classes.dashboardTiles}>
        {editorStore.manifests.map((m, idx) => (
          <Tile
            key={`tile-${idx}`}
            manifest={m}
            onSelected={handleTileSelected}
          />
        ))}
      </div>
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
