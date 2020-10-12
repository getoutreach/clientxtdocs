import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paragraph: {
      fontSize: 16,
      paddingTop: 20,
      paddingBottom: 20,
      fontWeight: 500,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    subtitle: {
      fontSize: 28,
      fontWeight: 500,
    },
  })
);

const Heading: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        Client extensibility demo addon
      </Typography>

      <Typography variant="body1" className={classes.paragraph}>
        This is a demo addon where you can see how the addon gets initialized, what events are sent and received, and
        try out supported actions: authenticate, notify and decorate.
      </Typography>
    </Container>
  );
});

export default Heading;
