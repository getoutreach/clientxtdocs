import { observer } from 'mobx-react-lite';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import React, { useContext } from 'react';
import { ConfigStoreContext } from '../stores/ConfigStore';
import Shell from './Shell';

const App: React.FC = observer(() => {
    const configStore = useContext(ConfigStoreContext);

    const appTheme = createMuiTheme({
        palette: {
            primary: {
                main: 'rgb(98, 100, 167)',
            },
            secondary: {
                main: '#00a152',
            },
            type: configStore.theme,
        },
    });

    return (
        <ThemeProvider theme={appTheme}>
            <Shell />
        </ThemeProvider>
    );
});

export default App;
