import { createStyles, makeStyles, Theme } from '@material-ui/core';
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

const StoreItems: React.FC = observer(() => {
    const classes = useStyles();
    const extensionStore = useContext(ExtensionStoreContext);

    console.log('[StoreItems.tsx]::render');

    return (
        <div className={classes.root}>
            {extensionStore.manifests.map((m, idx) => (
                <Tile
                    key={`tile-${idx}`}
                    manifest={m}
                    onSelected={() => console.log('Tile selected')}
                />
            ))}
        </div>
    );
});

export default StoreItems;
