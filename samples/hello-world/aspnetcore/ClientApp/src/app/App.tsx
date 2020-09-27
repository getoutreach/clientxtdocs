import React from 'react';

import { observer } from 'mobx-react-lite'

import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Actions from './Actions';
import Events from './Events';
import Heading from './Heading';
import Url from './Url';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      heading: {
        padding: theme.spacing(2),
        paddingBottom: 0,
      },
      subtitle: {
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      root: {
        display: "flex",
        flexDirection: "column"
      },
    })
);

const App: React.FC = observer(() =>   {

  const classes = useStyles();

  return <div className={classes.root}>
      <Heading />
      <Url />
      <Events/>
      <Actions />

  </div>;
});

export default App;
