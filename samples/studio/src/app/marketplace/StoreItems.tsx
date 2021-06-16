import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Manifest } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ExtensionStoreContext } from '../../stores/ExtensionsStore';
import Tile from './Tile';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 8,
    },
  })
);

interface IStoreItemsProps {
  onSelected: (manifest: Manifest) => void;
}

const StoreItems: React.FC<IStoreItemsProps> = observer(
  (props: IStoreItemsProps) => {
    const classes = useStyles();
    const extensionStore = useContext(ExtensionStoreContext);

    console.log('[StoreItems.tsx]::render');

    return (
      <div className={classes.root}>
        {extensionStore.manifests.map((m, idx) => (
          <Tile
            key={`tile-${idx}`}
            manifest={m}
            onSelected={props.onSelected}
          />
        ))}
      </div>
    );
  }
);

export default StoreItems;
