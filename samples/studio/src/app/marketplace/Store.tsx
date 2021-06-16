import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Sidebar from './Sidebar';
import StoreItems from './StoreItems';
import Info from './Info';
import { useContext } from 'react';
import { Manifest } from '@outreach/client-addon-sdk';
import { ExtensionStoreContext } from '../../stores/ExtensionsStore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    },
  })
);

const Store: React.FC = observer(() => {
  const classes = useStyles();
  const extensionsStore = useContext(ExtensionStoreContext);

  const handleSelect = (manifest: Manifest) => {
    extensionsStore.setSelectedManifest(manifest);
  };

  return (
    <div id="store-container" className={classes.root}>
      <Sidebar />
      <StoreItems onSelected={handleSelect} />

      <Info
        manifest={extensionsStore.selectedManifest!}
        onClose={() => extensionsStore.setSelectedManifest(null)}
      />
    </div>
  );
});

export default Store;
