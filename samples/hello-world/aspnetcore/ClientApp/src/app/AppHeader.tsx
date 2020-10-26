import React, { MouseEventHandler, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { EventStoreContext } from '../stores/EventStore';


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      color: 'white',
      fontSize: 40,
      fontWeight: 700,
      background: theme.palette.primary.main,
      padding: 15,
    },
  })
);

interface IAppHeaderProps {
  onInfoClick: MouseEventHandler<SVGSVGElement>;
}

const AppHeader: React.FC<IAppHeaderProps> = observer((props: IAppHeaderProps) => {
  const classes = useStyles();
  const eventStore = useContext(EventStoreContext);

  const title = () => {
    if (!eventStore.manifest) {
      return '...';
    } else {
      return eventStore.manifest.title.en;
    }
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h1" className={classes.heading}>
        { title() } <InfoIcon onClick={props.onInfoClick} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
