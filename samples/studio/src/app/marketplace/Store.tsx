import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Sidebar from './Sidebar';
import StoreItems from './StoreItems';
import Info from './Info';

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

    console.log('[Store.tsx]::render');

    return (
        <div id="store-container" className={classes.root}>
            <Sidebar />
            <StoreItems />
            <Info />
        </div>
    );
});

export default Store;
