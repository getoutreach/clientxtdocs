import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { useStyles } from '../styles/styles';

const AppHeader = (props: { onInfoClick: any }) => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h1" className={classes.heading}>
          Hello World (opportunity addon) <InfoIcon onClick={props.onInfoClick} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
