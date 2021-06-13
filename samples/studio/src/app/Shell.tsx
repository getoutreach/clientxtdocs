import * as React from 'react';

import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { PredefinedRoute } from './enums/PredefinedRoute';
import Studio from './studio/Studio';
import Editor from './studio/Editor';
import Toast from './shared/Toast';
import Store from './marketplace/Store';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
        },
    })
);

const Shell: React.FC = observer(() => {
    const classes = useStyles();
    return (
        <HashRouter>
            <div className={classes.root}>
                <Switch>
                    <Route
                        path={`/${PredefinedRoute.EDITOR}/:id`}
                        component={Editor}
                        key="editor"
                        exact={true}
                    />
                    <Route
                        path={`/${PredefinedRoute.STUDIO}`}
                        component={Studio}
                        key="studio"
                        exact={true}
                    />
                    <Route
                        path={`/${PredefinedRoute.STORE}`}
                        component={Store}
                        key="store"
                        exact={true}
                    />
                    <Route path="/" component={Studio} key="home" />
                </Switch>

                <Toast />
            </div>
        </HashRouter>
    );
});

export default Shell;
