import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      color: 'white',
      fontSize: 44,
      fontWeight: 700,
      background: theme.palette.primary.main,
      padding: 15,
    },
  })
);

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
